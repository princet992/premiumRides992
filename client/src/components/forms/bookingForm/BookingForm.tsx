import { useBookRideMutation } from "@/api/bookingApi/BookingApi";
import type { Ride } from "@/api/driverApi/driverTypes";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupee } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { colors } from "@/lib/theme";
import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";

interface AllRideProps {
  ride: Ride;
}

const BookingForm: React.FC<AllRideProps> = ({ ride }) => {
  const [bookRide] = useBookRideMutation();
  const { refetch } = useGetAllRidesQuery();
  const { driverId, phoneNumber } = useSelector((state: any) => state.Auth);
  const navigate = useNavigate();
  const { register, control, watch, handleSubmit } = useForm({
    defaultValues: {
      seats: "1",
      pickUp: "",
      drop: "",
      phoneNumber: phoneNumber,
      notes: "",
    },
  });

  const seatCount = watch("seats");
  const riderId = ride._id;
  const amount = Number(seatCount) * ride.pricePerSeat;
  const journeyDate = ride.departureDate;

  const formSubmit = async (data: any) => {
    const newData = {
      ...data,
      amount,
      journeyDate,
      bookingId: riderId,
      user: driverId,
    };
    try {
      await bookRide(newData).unwrap();
      navigate("/bookings");
      refetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)} className={`grid gap-6 md:gap-8  p-1 sm:p-6 ${colors.headerGradient}`}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label htmlFor="seats" className={colors.text.primary}>
              Number of seats*
            </Label>
            <Controller
              name="seats"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Seats" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: ride.availableSeats }).map((_, i) => (
                      <SelectItem value={String(i + 1)} key={i}>
                        {i + 1 === 1 ? `${i + 1} seat` : `${i + 1} seats`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone" className={colors.text.primary}>
              Your Phone Number*
            </Label>
            <Input id="phone" type="text" placeholder="Enter phone number" {...register("phoneNumber")} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-3">
            <Label htmlFor="pickup" className={colors.text.primary}>
              Pickup Location*
            </Label>
            <Input id="pickup" type="text" placeholder="Pickup point" {...register("pickUp")} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="drop" className={colors.text.primary}>
              Drop-off Location*
            </Label>
            <Input id="drop" type="text" placeholder="Drop-off point" {...register("drop")} />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="notes" className={colors.text.primary}>
            Special Requests (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any special requirements or notes for the driver..."
            {...register("notes")}
          />
        </div>

        <div className="rounded-xl border p-4 bg-white/70 shadow-sm">
          <h2 className="font-semibold text-lg text-slate-800 mb-2">Price Breakdown</h2>
          <div className="flex justify-between items-center text-sm py-1">
            <span className={colors.text.primary}>Price per seat</span>
            <span className="flex items-center gap-1 font-medium">
              <IndianRupee size={14} /> {ride.pricePerSeat}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm py-1 border-b">
            <span className={colors.text.primary}>Number of seats</span>
            <span className="font-medium">{seatCount}</span>
          </div>
          <div className="flex justify-between items-center font-bold sm:text-xl py-3">
            <span>Total Amount</span>
            <span className="flex items-center sm:gap-1 text-green-600">
              <IndianRupee size={18} />
              {amount}
            </span>
          </div>
        </div>

        <DialogFooter className="flex gap-3 justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className={`rounded-xl bg-gradient-to-r ${colors.buttonGradient} text-white px-6 py-2 hover:opacity-90 transition`}
          >
            Book Now
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default BookingForm;
