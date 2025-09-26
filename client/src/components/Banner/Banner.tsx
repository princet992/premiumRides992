import { Car, Lock, Search, Verified } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";
import { colors } from "@/lib/theme";

const Banner = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <section className={`${colors.bodyBg} font-sans`}>
        <nav className="flex items-center justify-between h-14 md:px-10 px-2 shadow-sm bg-white border-b border-gray-200">
          <h2 className={`flex items-center gap-2 font-bold text-lg ${colors.headerGradient}`}>
            <Car className={`${colors.iconGradient}`} />
            PremiumRides
          </h2>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className={` hidden sm:block sm:bg-transparent sm:text-slate-800  ${colors.iconGradient} text-white`}
              >
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="sm"
                className={` ${colors.buttonGradient} text-white hover:from-rose-500 hover:to-orange-500`}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="grid place-items-center text-center h-[60vh] px-3 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN9Z-QRJKKtPGsvk4Vp13q5KgYXAZgccgzJQ&s')] bg-no-repeat bg-cover bg-center">
          <div className="absolute h-[60vh] w-full top-[56px] bg-black/60 z-0" />
          <div className="max-w-2xl space-y-4 z-10 relative text-white">
            <h1 className="text-4xl md:text-5xl font-medium font-sans text-white">Share the ride, split the cost</h1>
            <p className="">
              Find or offer rides across cities and states. Save money and meet new people along the way.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Link to="/login">
                <Button className={`px-6 ${colors.buttonGradient} text-white hover:from-rose-500 hover:to-orange-500`}>
                  Find a ride
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-6 text-gray-900 border-gray-200">
                  Offer a ride
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center py-16 sm:px-6 px-3 max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 ${colors.headerGradient}`}>Why choose PremiumRides?</h2>
          <div className="grid md:grid-cols-3 sm:gap-8 gap-6">
            <Card className="py-6 px-2 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center sm:mb-4">
                <div className="p-3 rounded-full bg-pink-100">
                  <Search className="text-pink-500" size={28} />
                </div>
              </div>
              <CardHeader className={`text-xl font-semibold ${colors.headerGradient}`}>Easy Booking</CardHeader>
              <CardContent className="text-gray-700">
                Quickly find and book rides with just a few clicks. Our intuitive interface makes it simple to plan your
                journey.
              </CardContent>
            </Card>

            <Card className="py-6 px-2 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center sm:mb-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Verified className="text-green-500" size={28} />
                </div>
              </div>
              <CardHeader className={`text-xl font-semibold ${colors.headerGradient}`}>Verified Users</CardHeader>
              <CardContent className="text-gray-700">
                Travel with peace of mind knowing all users are verified for added safety and reliability.
              </CardContent>
            </Card>

            <Card className="py-6 px-2 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center sm:mb-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Lock className="text-blue-500" size={28} />
                </div>
              </div>
              <CardHeader className={`text-xl font-semibold ${colors.headerGradient}`}>Safe and Secure</CardHeader>
              <CardContent className="text-gray-700">
                We prioritize your safety with secure payment processing and in-app communication features.
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center py-16 px-6 bg-gray-50">
          <h2 className={`text-3xl font-bold mb-3 ${colors.headerGradient}`}>Ready to hit the road?</h2>
          <p className="text-gray-700 mb-6">Join a community of travelers and start sharing your journeys today.</p>
          <Button
            className={`px-8 py-2 text-lg ${colors.buttonGradient} text-white hover:from-rose-500 hover:to-orange-500`}
          >
            Sign up now
          </Button>
        </div>

        <footer className="text-center py-6 text-gray-500 text-sm border-t border-gray-200">
          © {year} PremiumRides. All rights reserved.
        </footer>
      </section>
    </>
  );
};

export default Banner;
