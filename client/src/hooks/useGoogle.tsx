import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function useGoogle() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // exchange access token for ID token
      console.log("Google Response:", tokenResponse);

      // If you want the ID token, you must fetch userinfo
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      console.log("User Info:", res.data);
    },
    onError: () => console.log("Login Failed"),
  });
  return login;
}
