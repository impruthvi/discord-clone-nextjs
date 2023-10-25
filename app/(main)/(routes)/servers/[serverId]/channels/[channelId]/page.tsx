import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelId: React.FC<ChannelIdProps> = async ({
  params: { serverId, channelId },
}) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findFirst({
    where: { id: channelId },
  });

  const member = await db.member.findFirst({
    where: { profileId: profile.id, serverId },
  });

  if (!channel || !member) return redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};

export default ChannelId;
