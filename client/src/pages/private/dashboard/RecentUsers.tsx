import type { GetUserResponse } from "@/api/userApi/userTypes";
import { colors } from "@/lib/theme";

const RecentUsers: React.FC<GetUserResponse> = ({ users }) => {
  return (
    <div className="h-80 overflow-y-auto space-y-2 bg-white/95 border border-gray-200 p-2 rounded-xl">
      <h2 className={`text-lg px-3 font-semibold text-gray-800 ${colors.headerGradient}`}>Recent Users</h2>
      {users?.map((user) => {
        const currentDate = new Date();
        const joinedDate = new Date(user.createdAt);
        const createdDay = new Date(joinedDate.getFullYear(), joinedDate.getMonth(), joinedDate.getDate());
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const diffTime = today.getTime() - createdDay.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const joined = diffDays === 0 ? `Joined today` : `Joined ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

        return (
          <div
            key={user._id}
            className={`flex max-[360px]:flex-col justify-between p-3 rounded-xl transition hover:shadow-md hover:bg-gray-50 border-b ${colors.cardBorder}`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                {user.userName[0]}
              </div>
              <div className="flex flex-col">
                <span className={`${colors.text.primary} font-medium`}>{user.userName}</span>
                <span className={`${colors.text.secondary} text-sm`}>{user.email}</span>
              </div>
            </div>
            <div className="text-right text-sm italic text-gray-500">
              <span className={`${colors.text.muted}`}>{joined}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentUsers;
