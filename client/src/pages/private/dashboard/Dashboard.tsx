import { useGetAllUserQuery } from "@/api/userApi/usersAPi";
import { Users, Car, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";

import RecentUsers from "./RecentUsers";
import RecentRides from "./RecentRides";
import { useGetBookedRideDataQuery, useGetTotalRevenueQuery } from "@/api/bookingApi/BookingApi";
import RevenueChart from "./RevenueChart";
import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";
import StatsCard from "@/components/cards/StatsCard";
import { colors } from "@/lib/theme";

const Dashboard = () => {
  const { userName } = useSelector((state: any) => state.Auth);
  const { data: user } = useGetAllUserQuery();
  const { data: bookedRides } = useGetBookedRideDataQuery();
  const { data: postedRides } = useGetAllRidesQuery();
  const { data: revenue } = useGetTotalRevenueQuery();

  const recentUsers = user?.users;
  const recentBookedRides = bookedRides?.data;
  const totalPostedRides = postedRides?.data;
  const totalRevenue = revenue?.reduce((acc, amount) => acc + amount.revenue, 0);

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 py-8 px-5">
        <h1 className={`text-3xl font-bold mb-6 ${colors.headerGradient}`}>
          Welcome Back, <span className="text-sky-500">{userName} !</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Rides" value={totalPostedRides?.length || ""} Icon={Car} color="bg-blue-500" />
          <StatsCard title="Total Users" value={recentUsers?.length || ""} Icon={Users} color="bg-green-500" />
          <StatsCard title="Toatal Revenue" value={totalRevenue || 0} Icon={IndianRupee} color="bg-purple-500" />
        </div>

        <div className={`grid gap-6`}>
          <RecentRides data={recentBookedRides || []} />
          <RecentUsers users={recentUsers || []} />
          <RevenueChart revenue={revenue || []} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
