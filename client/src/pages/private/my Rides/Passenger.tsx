import { useCancelBookingMutation, useGetBookedRideDataQuery } from "@/api/bookingApi/BookingApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Clock, IndianRupee, MapPin, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { colors } from "@/lib/theme";
import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";

const Passenger = () => {
  const { data: rideData, isLoading } = useGetBookedRideDataQuery();
  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();
  const {refetch} = useGetAllRidesQuery()

  const { driverId } = useSelector((state: any) => state.Auth);
  const myBooking = rideData?.data.filter((rides) => rides.user?._id === driverId);

  const handleCancelBooking = async (data: any) => {
    const newData = {
      id: data._id,
      bookingId: data.bookingId._id,
      seats: data.seats,
    };
    try {
      if (confirm("Are you sure you want to cancel this booking?")) {
        await cancelBooking(newData).unwrap();
        refetch()
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center h-64">
        <p className={`${colors.text.secondary} text-sm`}>Loading your bookings...</p>
      </div>
    );
  }

  if (!myBooking || myBooking.length === 0) {
    return (
      <div className="grid place-items-center gap-4 mt-20">
        <Users size={48} className={colors.text.secondary} />
        <h2 className={`${colors.text.primary} text-xl font-semibold`}>No Rides Booked</h2>
        <p className={colors.text.secondary}>Start your journey by booking a ride</p>
        <Link to="/postRides">
          <Button
            className={`bg-gradient-to-r ${colors.buttonGradient} text-white px-6 py-2 rounded-xl hover:opacity-90 transition`}
          >
            Book a Ride
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="py-8  space-y-4">
      {myBooking.map((booking) => {
        const posted = new Date(booking.bookingId?.createdAt).toDateString();

        return (
          <div
            key={booking._id}
            className={`p-5 rounded-xl ${colors.cardBg} ${colors.cardBorder} shadow-md hover:shadow-lg transition`}
          >
            <div className="flex justify-between items-center gap-4">
              <div className={`flex items-center gap-3 ${colors.text.primary} mb-3`}>
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-blue-100 text-blue-600">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className={`font-medium bg-clip-text ${colors.headerGradient}`}>
                      {booking.bookingId?.fromCity}
                    </h2>
                    <ArrowRightIcon size={16} className="text-gray-400" />
                    <h2 className={`font-medium bg-clip-text ${colors.headerGradient}`}>{booking.bookingId?.toCity}</h2>
                  </div>
                  <p className={`flex items-center gap-2 text-xs font-light ${colors.text.secondary} py-1`}>
                    <Clock size={14} /> {booking.bookingId?.departureDate.slice(0, 10)} at{" "}
                    {booking.bookingId?.departureTime}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                  booking.status === "Booked"
                    ? `${colors.badge.instantBooking.bg} ${colors.badge.instantBooking.text}`
                    : booking.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {" "}
                {booking.status}{" "}
              </Badge>
            </div>

            <div className="flex items-center max-[350px]:flex-col max-[350px]:items-start max-[350px]:gap-2 gap-6 text-sm">
              <div className="mb-3">
                <h2 className={`text-sm font-semibold ${colors.text.primary}`}>Driver Info</h2>
                <p className={`flex items-center gap-2 ${colors.text.primary}`}>
                  <Users size={14} /> {booking.bookingId?.driverName}
                </p>
                <p className={`flex items-center  gap-2 ${colors.text.primary}`}>
                  <IndianRupee size={14} /> {booking.bookingId?.driverPhone}
                </p>
              </div>

              <div className="mb-3">
                <h2 className={`text-sm font-semibold ${colors.text.primary}`}>Booking Info</h2>
                <p className={`flex items-center gap-2 ${colors.text.primary}`}>
                  <Users size={14} /> {booking.seats} seats
                </p>
                <p className={`flex items-center gap-2 ${colors.text.primary}`}>
                  <IndianRupee size={14} /> {booking.bookingId?.pricePerSeat * booking.seats}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 max-[350px]:flex-col max-[350px]:items-start max-[350px]:mt-1 gap-2">
              <p className={`text-sm ${colors.text.secondary}`}>Posted at: {posted}</p>
              <Button
                onClick={() => handleCancelBooking(booking)}
                variant="outline"
                disabled={isCancelling}
                className="hover:bg-red-500 hover:text-white transition"
              >
                {isCancelling ? "Cancelling..." : "Cancel"}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Passenger;
