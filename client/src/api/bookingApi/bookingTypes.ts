export interface BookingRideResponse {
  message: string;
}

export interface BookingRideRequest {
  seats: number;
  pickup: string;
  drop: string;
  phoneNumber: number;
  notes: string;
}
export interface BookingRide {
  bookingId: {
    _id: string;
    fromCity: string;
    toCity: string;
    departureDate: string;
    departureTime: string;
    availableSeats: number;
    pricePerSeat: number;
    driverPhone: string;
    driverName: string;
    carModel: string;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    musicAllowed: boolean;
    instantBooking: boolean;
    createdAt: string;
    driverId: string;
  };
  user: {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: string;
  };
  _id: string;
  seats: number;
  pickUp: string;
  drop: string;
  phoneNumber: number;
  status: string;
  createdAt: string;
}

export interface GetBookingRideResponse {
  data: BookingRide[];
}
export interface RevenueProps {
  _id: string;
  revenue: number;
  date: string;
}
export interface GetTotalRevenueResponse {
  revenue: RevenueProps[];
}
