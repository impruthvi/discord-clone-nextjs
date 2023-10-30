import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "DELETE" && req.method !== "PATCH")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const profile = await currentProfilePages(req);
    const { serverId, channelId, messageId } = req.query;
    const { content } = req.body;

    if (!profile) return res.status(401).json({ message: "Unauthorized" });
    if (!serverId)
      return res.status(400).json({ message: "Server id is required" });
    if (!channelId)
      return res.status(400).json({ message: "Channel id is required" });
    if (!messageId)
      return res.status(400).json({ message: "Message id is required" });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) return res.status(404).json({ message: "Server not found" });

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: server.id,
      },
    });

    if (!channel) return res.status(404).json({ message: "Channel not found" });

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) return res.status(401).json({ message: "Unauthorized" });

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channel.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!message || message.deleted)
      return res.status(404).json({ message: "Message not found" });

    const isMessageOwner = message.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModrator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModrator;

    if (!canModify) return res.status(401).json({ message: "Unauthorized" });

    if (req.method === "DELETE") {
      message = await db.message.update({
        where: {
          id: message.id as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner)
        return res.status(401).json({ message: "Unauthorized" });

      message = await db.message.update({
        where: {
          id: message.id as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    }
    const updateKey = `chat:${channelId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGE_ID] ERROR: ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
