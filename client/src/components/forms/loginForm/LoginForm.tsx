import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserCredential } from "@/features/AuthSlice/AuthSlice";
import { useState } from "react";
import { useLoginUserMutation } from "@/api/userApi/usersAPi";
import { colors } from "@/lib/theme";
const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const formSubmit = async (data: any) => {
    try {
      const res = await loginUser(data).unwrap();
      setSuccess("login Successfull");
      dispatch(setUserCredential(res));
      navigate("/");
    } catch (error: any) {
      if (error?.data?.message) {
        setError(error?.data?.message);
      } else {
        setError("Login failed");
      }
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };


  return (
    <div className={` grid place-items-center min-h-screen ${colors.bodyBg}`}>
      <div className={cn("flex flex-col gap-6 max-w-lg mx-auto", className)} {...props}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className={`text-xl font-semibold ${colors.headerGradient}`}>Welcome back</CardTitle>
            <CardDescription>Login with your Github or Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onClick={handleSubmit(formSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  {/* <Button variant="outline" className={`w-full ${colors.headerGradient}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-github-icon lucide-github"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Login with GitHUb
                  </Button> */}

                  <Button variant="outline" className={`w-full ${colors.headerGradient}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                  {/* <GoogleLogin onSuccess={handleLogin} onError={() => console.log("Login Failed")} /> */}
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                </div>
                {error && <p className="text-center text-red-700 text-sm font-medium py-1">{error}</p>}
                {success && <p className="text-center text-red-700 text-sm font-medium py-1">{success}</p>}
                <div className="grid gap-3">
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
                    <div className="flex items-center">
                      <Label htmlFor="password" className={` ${colors.headerGradient}`}>
                        Password*
                      </Label>
                      <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="******"
                      {...register("password", { required: "password is required" })}
                    />
                  </div>
                  <Button type="submit" className={`w-full my-2 ${colors.buttonGradient}`} disabled={isLoading}>
                    {isLoading ? "Logging in" : "Login"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4 text-blue-700">
                    Sign up
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

export default LoginForm;
