import { useGetAllRidesQuery } from "@/api/driverApi/driverApi";
import FilterRides from "./FilterRides";
import AllRides from "@/components/cards/AllRides";
import { useSidebar } from "@/components/ui/sidebar";
import { colors } from "@/lib/theme";
import { useMemo, useState } from "react";
export interface FilterRide {
  fromCity?: string;
  toCity?: string;
  date?: string;
  seats?: number | null;
}

const Find_Rides = () => {
  const { data, isLoading } = useGetAllRidesQuery();
  const { open } = useSidebar();
  const allRides = data?.data;
  const [filter, setFilter] = useState<FilterRide>({});

  const filteredRides = useMemo(() => {
    return allRides?.filter((ride) => {
      const fromcityFilter = !filter.fromCity || ride.fromCity.toLowerCase().includes(filter.fromCity.toLowerCase());
      const tocityFilter = !filter.toCity || ride.toCity.toLowerCase().includes(filter.toCity.toLowerCase());
      const seatFilter = !filter.seats || ride.availableSeats >= filter.seats;
      const rideDate = new Date(ride.departureDate).toISOString().split("T")[0];
      const dateFilter = !filter.date || rideDate === filter.date;
      return fromcityFilter && tocityFilter && seatFilter && dateFilter;
    });
  }, [filter, allRides]);

  return (
    <section className={`py-10 px-5 ${colors.bodyBg}`}>
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-extrabold ${colors.headerGradient}`}>Find Your Perfect Ride</h2>
        <p className={`${colors.text.primary} mt-2`}>
          Discover available rides in your area and connect with fellow travelers
        </p>
      </div>

      <FilterRides onfilter={setFilter} />

      {isLoading && (
        <p className={`text-center ${colors.text.highlight} py-2 animate-pulse`}>Loading, please wait...</p>
      )}

      {filteredRides && filteredRides.length > 0 ? (
        <div className={`grid gap-4 mt-6 ${open ? "md:grid-cols-1 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {filteredRides?.map((rides) => (
            <AllRides key={rides._id} rides={rides} />
          ))}
        </div>
      ) : (
        <div className={`${colors.text.secondary} text-center mt-6`}>No rides posted yet.</div>
      )}
    </section>
  );
};

export default Find_Rides;
