import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";
import { colors } from "@/lib/theme";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import type { FilterRide } from "./Find_Rides";

interface FilterRidesProps {
  onfilter?: (filter: FilterRide) => void;
}

const FilterRides = ({ onfilter }: FilterRidesProps) => {
  const { register, control } = useForm({
    defaultValues: {
      fromCity: "",
      toCity: "",
      date: "",
      seats: null,
    },
  });

  const watchAll = useWatch({ control });

  useEffect(() => {
    const filter = setTimeout(() => {
      onfilter?.(watchAll);
    }, 500);
    return () => clearTimeout(filter);
  }, [watchAll, onfilter]);

  return (
    <section className="py-10">
      <Card className={`${colors.cardBg} shadow-lg rounded-2xl border ${colors.cardBorder}`}>
        <CardHeader className={`flex items-center gap-2 ${colors.headerGradient} text-lg font-semibold`}>
          <Filter className={`${colors.iconGradient} w-5 h-5`} /> Search Filters
        </CardHeader>
        <CardContent className={colors.text.label}>
          <form className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-2">
              <Label htmlFor="fromCity">From City</Label>
              <Input id="fromCity" type="text" placeholder="Departure city" {...register("fromCity")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="toCity">To City</Label>
              <Input id="toCity" type="text" placeholder="Destination city" {...register("toCity")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" placeholder="Select Date" {...register("date")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minSeats">Min Available Seats</Label>
              <Input id="minSeats" type="number" placeholder="Seats" {...register("seats")} />
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default FilterRides;
