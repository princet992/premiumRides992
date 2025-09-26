
export interface RegisterUserRequest {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
}
export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  message: string;
}

export interface LoginUserResponse {
  userName: string;
  email: string;
  token: string;
  driverId: string;
  phoneNumber: string;
}

export interface User {
  email: string;
  password: string;
  phoneNumber: string;
  userName: string;
  _id: string;
  createdAt:string
}

export interface GetUserResponse {
  users: User[];
}
