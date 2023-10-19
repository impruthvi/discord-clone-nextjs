import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  const profile = await currentProfile();
  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");

  if (!profile) return new NextResponse("Unauthorized", { status: 401 });
  if (!serverId) return new NextResponse("Server Id missing", { status: 400 });
  if (!params.channelId)
    return new NextResponse("Channel Id missing", { status: 400 });

  try {
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`["CHANNEL_ID_DELETE", ${error}]`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  const profile = await currentProfile();
  const { searchParams } = new URL(req.url);
  const serverId = searchParams.get("serverId");
  const { name, type } = await req.json();

  if (!profile) return new NextResponse("Unauthorized", { status: 401 });
  if (!serverId) return new NextResponse("Server Id missing", { status: 400 });
  if (!params.channelId)
    return new NextResponse("Channel Id missing", { status: 400 });

  if (name === "general")
    return new NextResponse("Cannot rename general channel", { status: 400 });

  try {
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(`["CHANNEL_ID_PATCH", ${error}]`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
