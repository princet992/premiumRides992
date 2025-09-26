import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  User,
} from "./userTypes";

// Create the user API
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    // registering a user
    registerUser: builder.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (userData) => ({
        url: `register`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["user"],
    }),

    //login a User
    loginUser: builder.mutation<LoginUserResponse, LoginUserRequest>({
      query: (data) => ({
        url: `login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    //update User
    updateUser: builder.mutation({
      query: (data) => ({
        url: `updateUser`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    //get User
    getAllUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: `getAllUsers`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    //google Login
    googleLogin: builder.mutation<void,User>({
      query: () => ({
        url: `googleLogin`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useGoogleLoginMutation,
} = userApi;
