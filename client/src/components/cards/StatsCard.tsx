import { colors } from "@/lib/theme";
import { Card, CardContent, CardTitle } from "../ui/card";

interface StatsTypes {
  title: string;
  value: number | string;
  Icon: React.ElementType;
  color: string;
}

const StatsCard: React.FC<StatsTypes> = ({ title, value, Icon, color }) => {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <CardTitle className={`text-lg font-medium ${colors.headerGradient} flex items-center gap-1`}>
            {" "}
            <Icon size={18} />
            {value}
          </CardTitle>
        </div>
        <div className={`p-3 rounded-full ${color} flex items-center justify-center text-white`}>
          <Icon />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
