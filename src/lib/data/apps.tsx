import { Apps } from "../types";
import { DiscordIcon } from "@/components/icons/discord";
import { DriveIcon } from "@/components/icons/drive";
import { YoutubeIcon } from "@/components/icons/youtube";

export const appsData: Apps[] = [
  {
    name: "Youtube",
    description:
      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quisquam nemo labore tenetur",
    connected: true,
    icon: YoutubeIcon,
  },
  {
    name: "Drive",
    description:
      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quisquam nemo labore tenetur",
    connected: false,
    icon: DriveIcon,
  },
  {
    name: "Discord",
    description:
      " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quisquam nemo labore tenetur",
    connected: false,
    icon: DiscordIcon,
  },
];
