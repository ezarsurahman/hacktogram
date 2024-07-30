// TODO: answer here

import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate()

   if(!localStorage.getItem("username")) {
    console.log("no username")
    return (
        <Navigate to={"/signin"}></Navigate>
    )
   }

    return children;
}

export default ProtectedRoute;
