import { useUpdateUserMutation } from "@/api/userApi/usersAPi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/features/AuthSlice/AuthSlice";
import { colors } from "@/lib/theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { driverId, userName, email, phoneNumber } = useSelector((state: any) => state.Auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: { userName, email, phoneNumber },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await updateProfile({ id: driverId, ...data }).unwrap();
      dispatch(updateUser(res.data));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Card className={`${colors.cardBg} border ${colors.cardBorder} rounded-2xl shadow-md`}>
        <CardHeader>
          <CardTitle className={`${colors.headerGradient} text-xl`}>Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
              <Label htmlFor="name" className={colors.text.label}>
                Name
              </Label>
              <Input id="name" type="text" {...register("userName")} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className={colors.text.label}>
                Email
              </Label>
              <Input id="email" type="email" {...register("email")} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone" className={colors.text.label}>
                Phone Number
              </Label>
              <Input id="phone" type="text" {...register("phoneNumber")} className="mt-1" />
            </div>
            <Button
              type="submit"
              className={`${colors.buttonGradient} px-6 py-2 rounded-xl hover:opacity-90 transition`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default UpdateProfile;
