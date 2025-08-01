import React from 'react';
import { Navigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/localStorage';
import { isTokenValid } from '../utils/auth';
import { UserObj } from '../types/common';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = getFromLocalStorage('token') as string;
  const userObj = getFromLocalStorage<UserObj>('user');

  console.log("userObj", userObj, token)
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

//   if(!userObj.role || !isAdmin(userObj.user))

  return <>{children}</>;
};

export default ProtectedRoute;
