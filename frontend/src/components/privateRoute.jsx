// Remider --> jb bhi fronten create kro aur RBAC hai -->
//  to sbse pehle private aur protected route setup kro

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const isAuthenticated = !!localStorage.getItem('token'); 

  // console.log(localStorage.getItem('token'));

  return isAuthenticated ? children : <Navigate to="/profile" />;
};

export default PrivateRoute;
