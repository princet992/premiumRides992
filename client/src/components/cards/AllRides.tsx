import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Car,
  Cigarette,
  Clock,
  Heart,
  IndianRupee,
  MapPin,
  MoveRight,
  Music,
  Phone,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import BookingForm from "../forms/bookingForm/BookingForm";
import { colors } from "@/lib/theme";
import type { Ride } from "@/api/driverApi/driverTypes";
import { useSelector } from "react-redux";

interface AllRideProps {
  rides: Ride;
}

const AllRides = ({ rides }: AllRideProps) => {
  const { driverId } = useSelector((state: any) => state.Auth);

  const isOwnRide = rides.driverId._id === driverId;

  const rideDate = rides.departureDate.slice(0, 10);
  const rideDateTime = new Date(`${rides.departureDate}T${rides.departureTime}`);

  const isPast = rideDateTime < new Date();
  const isFull = rides.availableSeats === 0;
  return (
    <Card
      className={`${colors.cardBg} shadow-lg rounded-3xl ${colors.cardBorder} hover:shadow-xl transition-all duration-300 relative`}
    >
      {(isPast || isFull) && (
        <Badge
          className={`absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full ${
            isPast ? "bg-gray-200 text-gray-700" : "bg-red-50 text-red-700"
          }`}
        >
          {isPast ? "Past Ride" : "Full"}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className={`flex items-center gap-3 text-lg font-semibold ${colors.text.primary}`}>
          <div className="h-10 w-10 grid place-items-center rounded-xl bg-indigo-100 text-indigo-600">
            <MapPin size={18} />
          </div>
          <div className="flex items-center gap-3">
            <h2 className={`font-medium ${colors.headerGradient}`}>{rides?.fromCity}</h2>
            <MoveRight className={`${colors.text.muted}`} size={18} />
            <h2 className={`font-medium ${colors.headerGradient}`}>{rides?.toCity}</h2>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className={`font-mono`}>
        <div
          className={`flex items-start justify-between gap-6 text-sm ${colors.text.primary} py-3 border-b ${colors.cardBorder}`}
        >
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 `} />
              {rideDate}
            </p>
            <p className="flex items-center gap-2">
              <User className={`h-4 w-4 `} />
              {rides?.driverName}
            </p>
            <p className="flex items-center gap-2">
              <Car className={`h-4 w-4`} />
              {rides?.carModel}
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Clock className={`h-4 w-4 `} />
              {rides?.departureTime}
            </p>
            <p className="flex items-center gap-2">
              <Phone className={`h-4 w-4 `} />
              {rides?.driverPhone}
            </p>
            <p className="flex items-center gap-2">
              <Users className={`h-4 w-4 `} />
              {isFull ? "Full" : `${rides.availableSeats} seats Available`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 py-2 pt-3">
          {!rides?.smokingAllowed && (
            <Badge
              className={`${colors.badge.smoking.bg} ${colors.badge.smoking.text} rounded-lg px-2 py-1 flex items-center gap-1`}
            >
              <Cigarette size={14} /> Smoking
            </Badge>
          )}
          {!rides?.petsAllowed && (
            <Badge
              className={`${colors.badge.pets.bg} ${colors.badge.pets.text} rounded-lg px-2 py-1 flex items-center gap-1`}
            >
              <Heart size={14} /> Pets
            </Badge>
          )}
          {rides?.musicAllowed && (
            <Badge
              className={`${colors.badge.music.bg} ${colors.badge.music.text} rounded-lg px-2 py-1 flex items-center gap-1`}
            >
              <Music size={14} /> Music
            </Badge>
          )}
          {!rides?.instantBooking && (
            <Badge
              className={`${colors.badge.instantBooking.bg} ${colors.badge.instantBooking.text} rounded-lg px-2 py-1 flex items-center gap-1`}
            >
              <Zap size={14} /> Instant Booking
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className={`flex items-center justify-between text-sm pt-2 border-t ${colors.cardBorder}`}>
        <div className={`flex items-center gap-2 font-semibold ${colors.text.success}`}>
          <IndianRupee className="h-4 w-4" /> {rides?.pricePerSeat}/seat
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={isOwnRide || isPast || isFull}
              className={`rounded-xl text-white px-4 py-2 transition ${
                isOwnRide || isPast || isFull
                  ? "bg-gray-500 text-gray-200 cursor-not-allowed"
                  : `bg-gradient-to-r ${colors.buttonGradient} hover:opacity-90`
              }`}
            >
              {isOwnRide ? "Own Ride" : isFull ? "Full" : "Book Now"}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[85vh] rounded-2xl shadow-lg">
            <DialogHeader>
              <DialogTitle
                className={`text-xl font-bold  ${colors.headerGradient} `}
              >
                Book Your Ride
              </DialogTitle>

              <p className={`text-sm ${colors.text.primary}`}>Confirm details and book instantly</p>

              <DialogDescription
                asChild
                className="bg-blue-50 p-4 rounded-xl font-medium text-blue-800 flex flex-col  gap-4 justify-between shadow-sm"
              >
                <div>
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{rides.fromCity}</span>
                      <ArrowRight size={16} className="text-slate-400" />
                      <span>{rides.toCity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{rides.driverName}</span>
                      <span className="text-slate-400">|</span>
                      <Car size={16} />
                      <span>{rides.carModel}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{rides.departureDate.slice(0, 10)}</span>
                    <Clock size={16} />
                    <span>{rides.departureTime}</span>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>

            <BookingForm ride={rides} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default AllRides;
