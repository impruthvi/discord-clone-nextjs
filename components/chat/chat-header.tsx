import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggel";

interface ChatHeaderProps {
  name: string;
  serverId: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  name,
  serverId,
  type,
  imageUrl,
}) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId}/>
      {type === "channel" && (
        <Hash className="h-6 w-6 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  );
};
