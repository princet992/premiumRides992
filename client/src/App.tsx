import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import LayOut from "./components/layout/DashBoardLayout";
import Dashboard from "./pages/private/dashboard/Dashboard";
import MyRides from "./pages/private/my Rides/MyRides";
import Post_Rides from "./pages/private/post Rides/Post_Rides";
import Find_Rides from "./pages/private/search Rides/Find_Rides";
import UserProfile from "./pages/private/profile/UserProfile";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import UpdateRide from "./components/forms/updateRide/UpdateRide";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";
import NotFound from "./pages/NotFound";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <LayOut />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "searchRides",
              element: <Find_Rides />,
            },
            {
              path: "postRides",
              element: <Post_Rides />,
            },
            {
              path: "updateRide/:id",
              element: <UpdateRide />,
            },
            {
              path: "bookings",
              element: <MyRides />,
            },
            {
              path: "profiles",
              element: <UserProfile />,
            },
          ],
        },
      ],
    },
    {
      element: <PublicRoute />,
      children: [
        {
          path: "banner",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
