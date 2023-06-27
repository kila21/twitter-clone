
import { Route, useLocation, useNavigate} from "react-router-dom";
import { auth } from "../config/firebase";
import { Component, useEffect, useState } from "react";


interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}


export const PrivateRoute: React.FC<PrivateRouteProps> = ({path, element }) => {
  const navigate = useNavigate()


  useEffect(() => {
    const currentUser = sessionStorage.getItem('id')
    if(!currentUser) {
      navigate('/')
    }
  }, []);


  return <>{element}</>
}