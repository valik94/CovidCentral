import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function useLogout() {
  let navigateBar = useNavigate();

  const logout = function() {
    axios.post("/api/logout").then( () => {
      localStorage.removeItem("userLastName")
      localStorage.removeItem("userID")
      localStorage.removeItem("userSpecialty")  
      navigateBar("/");
     })
  
  } //update to POST instead of GET
 return {
   logout
 }
}

