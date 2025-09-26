export interface RegisterRideRequest {
  fromCity: string;
  toCity: string;
  departureDate: string;
  departureTime: string;
  availableSeats: number;
  pricePerSeat: number;
  driverPhone: string;
  carModel: string;
}

export interface Ride {
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
  driverId: {
    _id:string
  };
  createdAt: string;
}

export interface RegiseterRideResponse {
  isSuccess: boolean;
}

export interface GetRideResponse {
  data: Ride[];
}
