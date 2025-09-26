import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookingRideRequest, BookingRideResponse, GetBookingRideResponse, RevenueProps } from "./bookingTypes";

export const bookingApi = createApi({
  reducerPath: "bookingRide",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Ride"],
  endpoints: (builder) => ({
    //create booking
    bookRide: builder.mutation<BookingRideResponse, BookingRideRequest>({
      query: (data) => ({
        url: `createbooking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),
    //Get Booking
    getBookedRideData: builder.query<GetBookingRideResponse, void>({
      query: () => ({
        url: `getBookingData`,
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    //updateBooking
    updateBookingData: builder.mutation({
      query: (data) => ({
        url: `updateBooking`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),
    //cancelBooking
    cancelBooking: builder.mutation({
      query: (data) => ({
        url: `cancelBooking`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),
    //getTotalRevenue
    getTotalRevenue: builder.query<RevenueProps[], void>({
      query: () => ({
        url: `getTotalRevenue`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useBookRideMutation,
  useGetBookedRideDataQuery,
  useUpdateBookingDataMutation,
  useCancelBookingMutation,
  useGetTotalRevenueQuery,
} = bookingApi;
