import type { BookingRide } from "@/api/bookingApi/bookingTypes";
import type { Ride } from "@/api/driverApi/driverTypes";
import { colors } from "@/lib/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { MoveRight, User, UserCheck } from "lucide-react";
import { useSelector } from "react-redux";

interface RecentRideProps {
  passengerRides: BookingRide[];
  driverRides: Ride[];
}

const UserRecentRides = ({ passengerRides, driverRides }: RecentRideProps) => {
  const { driverId, userName, email, phoneNumber } = useSelector((state: any) => state.Auth);
  return (
    <Tabs defaultValue="profile">
      <TabsList className={`grid grid-cols-2 w-full rounded-xl ${colors.bodyBg} p-1`}>
        <TabsTrigger
          value="profile"
          className={`rounded-lg  data-[state=active]:shadow-sm data-[state=active]:bg-white`}
        >
          Profile
        </TabsTrigger>
        <TabsTrigger value="rides" className={`rounded-lg  data-[state=active]:shadow-sm data-[state=active]:bg-white`}>
          Rides
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-4 space-y-2 text-left text-sm">
        <p className="text-[#232323]">
          <span className={`${colors.text.label} font-medium me-2`}>Name:</span> {userName}
        </p>
        <p>
          <span className={`${colors.text.label} font-medium me-2`}>Email:</span> {email}
        </p>
        <p>
          <span className={`${colors.text.label} font-medium me-2`}>Phone:</span> {phoneNumber}
        </p>
        <p>
          <span className={`${colors.text.label} font-medium me-2`}>ID:</span> {driverId}
        </p>
      </TabsContent>
      <TabsContent value="rides" className="mt-4 space-y-4">
        <div>
          <h3 className={`font-semibold flex items-center mb-2 ${colors.headerGradient}`}>
            <User className="w-4 h-4 mr-2" /> As Passenger
          </h3>
          <div className="space-y-2">
            {passengerRides?.map((ride) => (
              <div
                key={ride._id}
                className={`border ${colors.cardBorder} rounded-xl p-3 text-gray-800 hover:bg-gray-50 transition text-sm`}
              >
                <div className={`flex items-center gap-4 font-medium ${colors.text.primary}`}>
                  <p>{ride.pickUp}</p>
                  <MoveRight />
                  <p>{ride.drop}</p>
                </div>
                <p className="text-xs">{ride.bookingId?.departureDate.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className={`font-semibold flex items-center mb-2 ${colors.headerGradient}`}>
            <UserCheck className="w-4 h-4 mr-2" /> As Driver
          </h3>
          <div className="space-y-2">
            {driverRides?.map((ride) => (
              <div
                key={ride._id}
                className={`border ${colors.cardBorder} rounded-xl p-3 text-gray-800 hover:bg-gray-50 transition text-sm`}
              >
                <div className={`flex items-center gap-4 font-medium ${colors.text.primary}`}>
                  <p>{ride.fromCity}</p>
                  <MoveRight />
                  <p>{ride.toCity}</p>
                </div>
                <p className="text-xs">{ride.departureDate.slice(0, 10)}</p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default UserRecentRides;
