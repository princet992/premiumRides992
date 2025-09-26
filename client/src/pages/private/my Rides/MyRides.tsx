import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Driver from "./PostedRides";
import Passenger from "./Passenger";
import BookingRequest from "./BookingRequest";
import { colors } from "@/lib/theme";
// import { Truck, Users, CheckCircle, Clock } from "lucide-react";

const MyRides = () => {
  return (
    <>
      <section className="py-10 px-5">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">My Bookings & Rides</h2>
          <p>Manage your travel bookings and ride requests</p>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Truck className="w-6 h-6 text-gray-700 mr-3" />
            <div>
              <p className="text-gray-900 font-semibold">12</p>
              <p className="text-gray-500 text-sm">Rides Posted</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Users className="w-6 h-6 text-gray-700 mr-3" />
            <div>
              <p className="text-gray-900 font-semibold">34</p>
              <p className="text-gray-500 text-sm">Bookings Received</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Clock className="w-6 h-6 text-gray-700 mr-3" />
            <div>
              <p className="text-gray-900 font-semibold">5</p>
              <p className="text-gray-500 text-sm">Upcoming Rides</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <CheckCircle className="w-6 h-6 text-gray-700 mr-3" />
            <div>
              <p className="text-gray-900 font-semibold">21</p>
              <p className="text-gray-500 text-sm">Completed Bookings</p>
            </div>
          </div>
        </div> */}
        <div className="flex w-full  flex-col gap-6 py-10">
          <Tabs defaultValue="driver">
            <TabsList className={`w-full flex items-center justify-between ${colors.bodyBg}`}>
              <TabsTrigger value="driver">As Driver</TabsTrigger>
              <TabsTrigger value="passenger">As Passenger</TabsTrigger>
            </TabsList>
            <TabsContent value="driver">
              <Tabs defaultValue="postedRides">
                <TabsList className={`flex justify-start gap-2 ${colors.bodyBg}`}>
                  <TabsTrigger value="postedRides">Posted Rides</TabsTrigger>
                  <TabsTrigger value="bookingRequest">Booking Request</TabsTrigger>
                </TabsList>
                <TabsContent value="postedRides" className="w-full">
                  <Driver />
                </TabsContent>
                <TabsContent value="bookingRequest">
                  <BookingRequest />
                </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="passenger">
              <Passenger />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default MyRides;
