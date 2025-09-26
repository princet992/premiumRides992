import AppSideBar from "@/components/layout/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import { colors } from "@/lib/theme";

const LayOut = () => {
  return (
    <SidebarProvider >
      <AppSideBar />
      <main className={`flex-1 ${colors.bodyBg}`}>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default LayOut;
