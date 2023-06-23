
import { Route, useNavigate} from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect } from "react";


interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}


export const PrivateRoute: React.FC<PrivateRouteProps> = ({path, element }) => {
   const isAuth = auth.currentUser?.uid ? true : false
   const navigate = useNavigate()

   useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  
   return <>{element}</>
}