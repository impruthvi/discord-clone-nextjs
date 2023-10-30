import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;

    const { serverId, channelId } = req.query;

    if (!profile) return res.status(401).json({ message: "Unauthorized" });
    if (!serverId)
      return res.status(400).json({ message: "Server id is required" });
    if (!channelId)
      return res.status(400).json({ message: "Channel id is required" });
    if (!content)
      return res.status(400).json({ message: "Content is required" });

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

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        memberId: member.id,
        channelId: channel.id as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io.emit(channelKey, message);

    return res.status(200).json({ message });
  } catch (error) {
    console.log("[MESSAGES_POST_ERROR]", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
