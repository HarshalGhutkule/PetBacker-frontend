import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Offline = ()=>{

    const token = useSelector((store) => store.token) || JSON.parse(localStorage.getItem("token"));

    if (token == "" || token == null) {
        return <Navigate to={"/login"} />;
      }

    return <div>
        <img style={{margin:"5%",borderRadius:"5px"}} src="https://c.tenor.com/W0HnICOTtt4AAAAC/offline.gif" alt="offline" />
    </div>
}