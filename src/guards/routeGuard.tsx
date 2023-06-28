
import { useNavigate} from "react-router-dom";

import { useEffect } from "react";


interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}


export const PrivateRoute: React.FC<PrivateRouteProps> = ({element }) => {
  const navigate = useNavigate()


  useEffect(() => {
    const currentUser = sessionStorage.getItem('id')
    if(!currentUser) {
      navigate('/')
    }
  }, []);


  return <>{element}</>
}