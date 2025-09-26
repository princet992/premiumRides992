import type { GetBookingRideResponse } from "@/api/bookingApi/bookingTypes";
import { colors } from "@/lib/theme";

const RecentRides: React.FC<GetBookingRideResponse> = ({ data }) => {
  return (
    <div className="h-80 overflow-y-auto space-y-2 bg-white/95 border border-gray-200 p-2 rounded-xl">
      <h2 className={`text-lg px-3 font-semibold text-gray-800 ${colors.headerGradient}`}>Recent Rides Booked</h2>
      {data.map((ride) => (
        <div
          key={ride._id}
          className={`flex items-center justify-between p-3 rounded-xl transition hover:shadow-md hover:bg-gray-50 border-b ${colors.cardBorder}`}
        >
          <div className="flex flex-col space-y-1">
            <p className={`${colors.text.primary} font-medium`}>{ride.user.userName}</p>
            <p className={`${colors.text.secondary} text-sm`}>
              <span className="font-medium">{ride.pickUp}</span> → <span className="font-medium">{ride.drop}</span>
            </p>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                ride.status === "Booked"
                  ? `${colors.badge.instantBooking.bg} ${colors.badge.instantBooking.text}`
                  : ride.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {ride.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentRides;
