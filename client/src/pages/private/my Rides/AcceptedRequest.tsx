import { useGetBookedRideDataQuery, useUpdateBookingDataMutation } from "@/api/bookingApi/BookingApi";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { colors } from "@/lib/theme";
import { useSelector } from "react-redux";
import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";

const AcceptedRequest = () => {
  const { data } = useGetBookedRideDataQuery();
  const [updateBooking] = useUpdateBookingDataMutation();
  const { refetch } = useGetAllRidesQuery();
  const { driverId } = useSelector((state: any) => state.Auth);
  const acceptedRequest = data?.data.filter(
    (ride) => ride.bookingId?.driverId === driverId && ride.status === "Booked"
  );

  const handleCancelRide = async (data: any) => {
    const newData = {
      id: data._id,
      status: "Cancelled",
      rideId: data.bookingId._id,
    };
    try {
      await updateBooking(newData).unwrap();
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="py-8 px-4">
        {acceptedRequest && acceptedRequest.length > 0 ? (
          <div className="space-y-4">
            {acceptedRequest.map((ride: any) => (
              <div
                key={ride._id}
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 rounded-xl ${colors.cardBg} ${colors.cardBorder} shadow-sm hover:shadow-md transition`}
              >
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className={`flex items-center gap-3 ${colors.text.primary}`}>
                    <div className="h-10 w-10 grid place-items-center rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className={`font-medium bg-clip-text ${colors.headerGradient} truncate`}>{ride.pickUp}</h2>
                        <ArrowRightIcon size={16} className="text-gray-400 flex-shrink-0" />
                        <h2 className={`font-medium bg-clip-text ${colors.headerGradient} truncate`}>{ride.drop}</h2>
                      </div>
                      <div className={`flex items-center gap-4 mt-1 ${colors.text.secondary} text-sm flex-wrap`}>
                        <span>{ride.user?.userName}</span>
                        <span>{ride.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-shrink-0 mt-4 lg:mt-0">
                  <p className={`flex items-center gap-2 text-sm ${colors.text.primary}`}>
                    <Users size={14} /> {ride.seats} booked
                  </p>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      className="hover:bg-red-500 hover:text-white transition w-full sm:w-auto"
                      onClick={() => handleCancelRide(ride)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid place-items-center gap-4 mt-20">
            <Users size={48} className={colors.text.secondary} />
            <h2 className={`${colors.text.primary} text-xl font-semibold`}>No accepted bookings yet</h2>
            <p className={`${colors.text.secondary}`}>Once someone confirms a ride, it will appear here.</p>

            <Link to="/postRides">
              <Button
                className={`bg-gradient-to-r ${colors.buttonGradient} text-white px-6 py-2 rounded-xl hover:opacity-90 transition`}
              >
                Post Ride
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptedRequest;
