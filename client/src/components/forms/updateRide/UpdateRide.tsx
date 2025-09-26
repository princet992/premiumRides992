import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import {
  ArrowLeft,
  Calendar,
  Car,
  Cigarette,
  Heart,
  MapPin,
  MessageSquare,
  Music,
  Phone,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { rideSchema } from "../createRide/formSchema";
import { useUpdateRideDataMutation } from "@/api/driverApi/driverApi";

const UpdateRide = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [update, { isLoading }] = useUpdateRideDataMutation();
  const navigate = useNavigate();
  const { state: ride } = useLocation();
  const date = ride.departureDate.split("T")[0];

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fromCity: ride.fromCity,
      toCity: ride.toCity,
      pickupLocation: ride.pickupLocation,
      dropLocation: ride.dropLocation,
      departureDate: date,
      departureTime: ride.departureTime,
      availableSeats: ride.availableSeats,
      pricePerSeat: ride.pricePerSeat,
      carModel: ride.carModel,
      smokingAllowed: ride.smokingAllowed,
      petsAllowed: ride.petsAllowed,
      musicAllowed: ride.musicAllowed,
      instantBooking: ride.instantBooking,
      notes: ride.notes,
      driverName: ride.driverName,
      driverPhone: ride.driverPhone,
    },
    resolver: zodResolver(rideSchema),
  });

  const formSubmit = async (data: any) => {
    try {
      const newData = {
        id: ride._id,
        ...data,
      };
      await update(newData).unwrap();
      navigate("/bookings");
      reset();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="  min-h-screen py-5 bg-[#f0f3f8] px-3 mt-5 md:mt-0">
      <div className={cn("flex flex-col gap-6 max-w-2xl mx-auto", className)} {...props}>
        <div className="flex items-center gap-2">
          <Link to="/bookings">
            <div className="w-10 h-10 rounded-lg bg-white p-1 grid place-items-center">
              <ArrowLeft className="" />
            </div>
          </Link>
          <div>
            <h2 className="text-2xl font-bold">Offer a Ride</h2>
            <p>Share your journey and help others travel</p>
          </div>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl ">Ride Details</CardTitle>
            <CardDescription>Fill in the information about your ride</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(formSubmit)}>
              <div className="grid gap-2">
                {/* ----Route Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2">
                  <MapPin className="text-blue-700 w-5 h-5" /> Route Information
                </h2>
                <div className="grid md:grid-cols-2 md:gap-5 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pickUp">Pickup Location*</Label>
                    <Input id="pickUp" type="text" placeholder="Enter pickup location" {...register("fromCity")} />
                    {errors.fromCity && <p className="text-sm text-red-700 py-1">{errors.fromCity.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="destination">Destination*</Label>
                    <Input id="destination" type="text" placeholder="Enter destination" {...register("toCity")} />
                    {errors.toCity && <p className="text-sm text-red-700 py-1">{errors.toCity.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="destination">Specific Pickup Location</Label>
                    <Input
                      id="destination"
                      type="text"
                      placeholder="e.g., Downtown Mall, Airport Terminal"
                      {...register("pickupLocation")}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="destination">Specific Drop Location</Label>
                    <Input
                      id="destination"
                      type="text"
                      placeholder="e.g., City Center, Train Station"
                      {...register("dropLocation")}
                    />
                  </div>
                </div>

                {/* ----Schedule Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2">
                  <Calendar className="text-green-600 w-5 h-5" />
                  Schedule
                </h2>

                <div className="grid md:grid-cols-2 md:gap-5 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Departure Date*</Label>
                    <Input id="date" type="date" {...register("departureDate")} />
                    {errors.departureDate && (
                      <p className="text-sm text-red-700 py-1">{errors.departureDate.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Departure Time*</Label>
                    <Input id="time" type="time" {...register("departureTime")} />
                    {errors.departureTime && (
                      <p className="text-sm text-red-700 py-1">{errors.departureTime.message}</p>
                    )}
                  </div>
                </div>

                {/* ----Seats & Pricing Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2">
                  <Users className="text-[#5e0e6e] w-5 h-5" /> Seats & Pricing
                </h2>
                <div className="grid md:grid-cols-2 md:gap-5 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="seat">Available Seats*</Label>
                    <Input
                      id="seat"
                      type="number"
                      placeholder="1"
                      {...register("availableSeats", { valueAsNumber: true })}
                    />
                    {errors.availableSeats && (
                      <p className="text-sm text-red-700 py-1">{errors.availableSeats.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price Per Seats*</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      {...register("pricePerSeat", { valueAsNumber: true })}
                    />
                    {errors.pricePerSeat && <p className="text-sm text-red-700 py-1">{errors.pricePerSeat.message}</p>}
                  </div>
                </div>
                {/* ----Contact Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2 ">
                  <Phone className="text-amber-400 w-5 h-5" /> Contact Details
                </h2>
                <div className="grid md:grid-cols-2 md:gap-5 gap-3 sm:gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Driver Name*</Label>
                    <Input id="name" type="text" placeholder="Your name" {...register("driverName")} />
                    {errors.driverName && <p className="text-sm text-red-700 py-1">{errors.driverName.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input id="phone" type="phone" placeholder="Your contact number" {...register("driverPhone")} />
                    {errors.driverPhone && <p className="text-sm text-red-700 py-1">{errors.driverPhone.message}</p>}
                  </div>
                </div>

                {/* ----Vehicle Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2 ">
                  <Car className="text-[#560be2] w-5 h-5" /> Vehicle Information
                </h2>
                <div className="grid gap-2">
                  <Label htmlFor="model">Car Model*</Label>
                  <Input id="model" type="text" placeholder="e.g., Toyota Camry 2020" {...register("carModel")} />
                  {errors.carModel && <p className="text-sm text-red-700 py-1">{errors.carModel.message}</p>}
                </div>

                {/* ----Travel Preferences Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2 ">
                  <Settings className="text-[#e26c0b] w-5 h-5" /> Travel Preferences
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between px-4 gap-2">
                    <Label htmlFor="smokingAllowed" className="flex items-center gap-4">
                      <Cigarette className="text-[#dd0d75] w-5 h-5" />
                      <div className="space-y-2">
                        <h2>Smoking Allowed</h2>
                        <p className="text-slate-700 text-xs">Allow smoking in the vehicle</p>
                      </div>
                    </Label>
                    <Controller
                      name="smokingAllowed"
                      control={control}
                      render={({ field }) => (
                        <Switch id="smokingAllowed" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 gap-2">
                    <Label htmlFor="musicAllowed" className="flex items-center gap-4">
                      <Music className="text-[#790ea3] w-5 h-5" />
                      <div className="space-y-2">
                        <h2>Music Allowed</h2>
                        <p className="text-slate-700 text-xs">Play music during the ride</p>
                      </div>
                    </Label>
                    <Controller
                      name="musicAllowed"
                      control={control}
                      render={({ field }) => (
                        <Switch id="musicAllowed" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 gap-2">
                    <Label htmlFor="petsAllowed" className="flex items-center gap-4">
                      <Heart className="text-[#af2882] w-5 h-5" />
                      <div className="space-y-2">
                        <h2>Pets Allowed</h2>
                        <p className="text-slate-700 text-xs">Allow pets in the vehicle</p>
                      </div>
                    </Label>
                    <Controller
                      name="petsAllowed"
                      control={control}
                      render={({ field }) => (
                        <Switch id="petsAllowed" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4 gap-2">
                    <Label htmlFor="instantBooking" className="flex items-center gap-4">
                      <Zap className="text-[#dbb91f] md:my-3 my-2w-5 h-5" />
                      <div className="space-y-2">
                        <h2>Instant Booking</h2>
                        <p className="text-slate-700 text-xs">Allow immediate bookings</p>
                      </div>
                    </Label>
                    <Controller
                      name="instantBooking"
                      control={control}
                      render={({ field }) => (
                        <Switch id="instantBooking" checked={field.value} onCheckedChange={field.onChange} />
                      )}
                    />
                  </div>
                </div>

                {/* ----Additional Info--- */}
                <h2 className="flex items-center gap-2 font-medium text-lg md:my-3 my-2 ">
                  <MessageSquare className="text-green-400 w-5 h-5" /> Additional Information
                </h2>
                <div className="grid gap-2 ">
                  <Label htmlFor="note">Notes for Passengers</Label>
                  <Textarea
                    placeholder="Any additional information for passengers (meeting point details, luggage restrictions, etc.)"
                    {...register("notes")}
                  />
                </div>
                <div className="grid items-center gap-4 grid-cols-2 my-4">
                  <Link to="/bookings">
                    <Button type="submit" variant="outline" className="" disabled={isLoading}>
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className=" bg-blue-600 text-white" disabled={isLoading}>
                    <Car />
                    <span>{isLoading ? "Updating ride..." : "Update Ride"}</span>
                  </Button>
                </div>
                {/* <Button type="submit" className="w-full my-2 bg-blue-600 text-white" disabled={isLoading}>
                  <Car />
                  <span>{isLoading ? "Updating ride..." : "Update Ride"}</span>
                </Button> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateRide;
