import { z } from "zod";

export const rideSchema = z.object({
  fromCity: z.string().nonempty("From city is required"),
  toCity: z.string().nonempty("To city is required"),
  pickupLocation: z.string().optional(),
  dropLocation: z.string().optional(),
  departureDate: z.string().nonempty("Required"),
  departureTime: z.string().nonempty("Required"),
  availableSeats: z.number().min(1, { message: "Min 1 seat is required" }),
  pricePerSeat: z.number().min(0, { message: "Price must be at least 0" }),
  carModel: z.string().nonempty("Required"),
  smokingAllowed: z.boolean().optional(),
  petsAllowed: z.boolean().optional(),
  instantBooking: z.boolean().optional(),
  musicAllowed: z.boolean().optional(),
  notes: z.string().optional(),
  driverName: z.string().nonempty("Driver name is required"),
  driverPhone: z
    .string()
    .nonempty("Driver phone is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
});
