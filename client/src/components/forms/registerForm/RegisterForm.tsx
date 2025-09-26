import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterUserMutation } from "@/api/userApi/usersAPi";
import { colors } from "@/lib/theme";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const formSubmit = async (data: any) => {
    try {
      await registerUser(data).unwrap();
      setSuccess("Registered Successfully");
      setTimeout(() => {
        setSuccess("");
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      console.log("error", error);
      if (error?.data.message) {
        setError(error?.data?.message);
      } else {
        setError("Registeration failed");
      }
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className={`grid place-items-center min-h-screen py-5 ${colors.bodyBg}`}>
      <div className={cn("flex flex-col gap-6 max-w-lg mx-auto", className)} {...props}>
        <Card>
          <CardHeader className="">
            <Link to="/login">
              {" "}
              <CardDescription className="flex items-center gap-2">
                <ArrowLeft /> Back to Sign in
              </CardDescription>
            </Link>
            <CardTitle className={`text-xl text-center py-2 ${colors.headerGradient}`}>Create your Account</CardTitle>
            {success && (
              <CardDescription className="text-green-600 text-center font-medium py-1">{success}</CardDescription>
            )}
            {error && <CardDescription className="text-red-600 text-center font-medium py-1">{error}</CardDescription>}
          </CardHeader>
          <CardContent>
            <form onClick={handleSubmit(formSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="userName" className={` ${colors.headerGradient}`}>
                      UserName*
                    </Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Prince Thakur"
                      {...register("userName", { required: "userName is required" })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className={` ${colors.headerGradient}`}>
                      Email*
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="prince@gmail.com"
                      {...register("email", { required: "email is required" })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className={` ${colors.headerGradient}`}>
                      Password*
                    </Label>

                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      {...register("password", { required: "password is required" })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber" className={` ${colors.headerGradient}`}>
                      Phone Number*
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="+91 8299999999"
                      {...register("phoneNumber", { required: "phoneNumber is required" })}
                    />
                  </div>
                  <Button type="submit" className={`w-full my-2 ${colors.buttonGradient}`} disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Account"}
                  </Button>
                </div>
                <div className="text-center text-sm py-1">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4 text-blue-700">
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
