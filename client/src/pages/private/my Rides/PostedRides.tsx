import { useGetAllRidesQuery, useRemoverRideMutation } from "@/api/driverApi/driverApi";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Clock, IndianRupee, MapPin, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "@/lib/theme";

const Driver = () => {
  const { data: rideData, isLoading } = useGetAllRidesQuery();
  const [removeRide, { isLoading: isRemoving }] = useRemoverRideMutation();
  const { driverId } = useSelector((state: any) => state.Auth);
  const navigate = useNavigate();
  const driverRide = rideData?.data.filter((rides) => rides.driverId?._id === driverId);

  const handleNavigate = (data: any) => navigate(`/updateRide/${data._id}`, { state: data });

  const handleCancelRide = async (Id: string) => {
    try {
      if (confirm("Are you sure you want to remove this ride?")) {
        await removeRide(Id).unwrap();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) return <div className={`${colors.text.secondary} text-center py-4 text-sm`}>Loading...</div>;

  return (
    <>
      <div className="py-8">
        {driverRide && driverRide.length > 0 ? (
          <div className="space-y-4 ">
            {driverRide.map((ride) => {
              const posted = new Date(ride.createdAt).toDateString();
              return (
                <div
                  key={ride._id}
                  className={`w-full max-w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 rounded-xl ${colors.cardBg} ${colors.cardBorder} shadow-sm hover:shadow-md transition`}
                >
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div className={`flex items-center gap-2 font-semibold flex-wrap ${colors.text.primary}`}>
                      <MapPin size={18} />
                      <span>{ride.fromCity}</span>
                      <ArrowRightIcon size={16} className="text-gray-400" />
                      <span>{ride.toCity}</span>
                    </div>
                    <p className={`flex items-center gap-2 text-sm flex-wrap ${colors.text.secondary}`}>
                      <Clock size={14} /> {ride.departureDate.slice(0, 10)} at {ride.departureTime}
                    </p>
                    <p className={`text-xs ${colors.text.secondary}`}>Posted: {posted}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ">
                    <div className={`flex items-center gap-4 text-sm flex-wrap ${colors.text.primary}`}>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {Number(ride.availableSeats) > 0
                          ? `${ride.availableSeats} seat${Number(ride.availableSeats) > 1 ? "s" : ""}`
                          : "Full"}
                      </span>
                      <span className="flex items-center gap-1">
                        <IndianRupee size={14} /> {ride.pricePerSeat}/seat
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleNavigate(ride)}
                        className={`${colors.buttonGradient} hover:text-white transition`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        disabled={isRemoving}
                        onClick={() => handleCancelRide(ride._id)}
                        className={`hover:bg-red-500 hover:text-white transition`}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid place-items-center gap-4 mt-20">
            <Users size={48} className={`${colors.text.secondary}`} />
            <h2 className={`${colors.text.primary} text-xl font-semibold`}>No booking requests yet</h2>
            <p className={`${colors.text.secondary}`}>Post rides to start receiving booking requests</p>
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

export default Driver;
