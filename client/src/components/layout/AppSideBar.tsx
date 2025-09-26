import { Calendar, Car, ChartColumnIncreasing, LogOut, Plus, Search, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/features/AuthSlice/AuthSlice";
import { colors } from "@/lib/theme";

const items = [
  {
    title: "DashBoard",
    url: "/",
    icon: Car,
  },
  {
    title: "Search Rides",
    url: "/searchRides",
    icon: Search,
  },
  {
    title: "Post Rides",
    url: "/postRides",
    icon: Plus,
  },
  {
    title: "My Bookings",
    url: "/bookings",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/profiles",
    icon: User,
  },
];

const AppSideBar = () => {
  const dispatch = useDispatch();
  const { userName, email } = useSelector((state: any) => state.Auth);
  const { toggleSidebar } = useSidebar();

  const closeIfMobile = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const handleLogOut = () => {
    if (confirm("Are you sure want to logout")) {
      dispatch(logOutUser());
    }
  };
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-3 py-4">
            <div className={`bg-gradient-to-br ${colors.buttonGradient} p-2 rounded-lg`}>
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${colors.headerGradient}`}>PremiumRides</h2>
              <p className={`text-xs text-muted-foreground ${colors.text.primary}`}>Premium Carpooling</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={`text-lg font-medium ${colors.headerGradient}`}>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={closeIfMobile}
                      className={({ isActive }) =>
                        `flex items-center gap-2 font-medium rounded-lg p-2 transition-colors 
                         hover:text-indigo-700 ${colors.headerGradient}
                        ${isActive ? `text-indigo-700` : ""}`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between px-3 py-3 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>PT</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className={`text-sm font-medium ${colors.headerGradient}`}>{userName}</span>
                <span className={`text-xs text-muted-foreground ${colors.text.primary}`}>{email}</span>
              </div>
            </div>
            <button
              className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-red-500"
              onClick={handleLogOut}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* -----Mobile-- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50 py-3 px-5 ">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className={`bg-gradient-to-br ${colors.buttonGradient} p-1 rounded-lg`}>
            <ChartColumnIncreasing className="h-6 w-6 text-white" />
          </div>
          <h2 className={`text-lg font-semibold ${colors.headerGradient}`}>PremiumRides</h2>
        </div>
      </div>
    </>
  );
};

export default AppSideBar;
