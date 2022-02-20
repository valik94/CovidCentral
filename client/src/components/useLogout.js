import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  let navigateBar = useNavigate();

  const logout = function () {
    axios.post("/api/logout").then(() => {
      localStorage.removeItem("userID");
      navigateBar("/");
    });
  };
  return {
    logout
  };
}
