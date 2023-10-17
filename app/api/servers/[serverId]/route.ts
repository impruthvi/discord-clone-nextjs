import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { serverId } = params;

    const server = await db.server.delete({
      where: { id: serverId, profileId: profile.id },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(["SERVER_ID_DELETE_ERROR", error]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { serverId } = params;
    const { name, imageUrl } = await req.json();
    const server = await db.server.update({
      where: { id: serverId, profileId: profile.id },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log(["SERVER_ID_PATCH_ERROR", error]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
