import { Apps } from "@/components/icons/apps";
import { Dashboard } from "@/components/icons/dashboard";
import { Logs } from "@/components/icons/logs";
import { Workflow } from "@/components/icons/workflow";
import { SideMenu } from "@/lib/types";

const menuData: SideMenu[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    title: "Workflows",
    path: "/workflows",
    Component: Workflow,
  },
  {
    title: "Apps",
    path: "/connections",
    Component: Apps,
  },
  {
    title: "Logs",
    path: "/logs",
    Component: Logs,
  },
];
export default menuData;
