import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetRideResponse, RegiseterRideResponse, RegisterRideRequest } from "./driverTypes";

export const driverApi = createApi({
  reducerPath: "rideDetails",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Ride"],
  endpoints: (builder) => ({
    //createRide
    registerRide: builder.mutation<RegiseterRideResponse, RegisterRideRequest>({
      query: (data) => ({
        url: `createride`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Ride"],
    }),
    //get All Rides
    getAllRides: builder.query<GetRideResponse, void>({
      query: () => ({
        url: `getRideData`,
        method: "GET",
      }),
      providesTags: ["Ride"],
    }),
    // updates Rides
    updateRideData: builder.mutation({
      query: (data) => ({
        url: `updateRideData`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ride"],
    }),
    //delete Ride Data
    removerRide: builder.mutation({
      query: (Id) => ({
        url: `deleteRideData/${Id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ride"],
    }),
  }),
});

export const { useRegisterRideMutation, useGetAllRidesQuery, useUpdateRideDataMutation, useRemoverRideMutation } =
  driverApi;
