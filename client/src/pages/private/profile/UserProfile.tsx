import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { colors } from "@/lib/theme";
import { useGetBookedRideDataQuery } from "@/api/bookingApi/BookingApi";
import UpdateProfile from "./UpdateProfile";
import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";
import UserRecentRides from "./UserRecentRides";

const UserProfile = () => {
  const { driverId, userName } = useSelector((state: any) => state.Auth);
  const { data: bookedRide } = useGetBookedRideDataQuery();
  const { data: postedRide } = useGetAllRidesQuery();

  const passengerRides = bookedRide?.data.filter((ride) => ride.user._id === driverId);
  const driverRides = postedRide?.data.filter((ride) => ride.driverId._id === driverId);
  return (
    <div className={`${colors.bodyBg} min-h-screen p-8 grid grid-cols-1 lg:grid-cols-2 gap-8`}>
      <div className="space-y-6">
        <Card className={`${colors.cardBg} border ${colors.cardBorder} rounded-2xl shadow-md overflow-hidden`}>
          <div className="h-24 bg-gray-100 flex items-end justify-center">
            <img
              src="https://github.com/shadcn.png"
              alt="profile"
              className="w-24 h-24 rounded-full border-2 border-white -mb-12"
            />
          </div>
          <CardContent className="pt-16 text-center">
            <h2 className={`${colors.headerGradient} text-2xl font-semibold`}>{userName}</h2>
            <p className={`${colors.text.secondary} text-sm mt-1`}>Member since 2021</p>
            <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 mr-1" /> 4.8 (125 reviews)
            </div>
          </CardContent>
          <CardContent>
            <UserRecentRides passengerRides={passengerRides || []} driverRides={driverRides || []} />
          </CardContent>
        </Card>
      </div>
      <UpdateProfile />
    </div>
  );
};

export default UserProfile;
