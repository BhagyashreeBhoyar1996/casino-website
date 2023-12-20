import React from 'react'

import { Navigate } from 'react-router-dom';

/**
 * @component
 * @description This component is use to protect the route based on user valid or not.
 * If user is valid then respective route component will renders 
 * else redirected to login page by rendering navigate component. 
 * @param {Object} user The user's information
 * @param {React.ReactNode} children The rounte component
 * @returns {React.ReactNode | JSX.Element} If user is valide then it renders route component else navigation component.
 */
export default function ProtectedRoute({ user, children }) {

    if(!user) {
      return (
        <Navigate to="/" replace/>
      );
    }
  
    return children;
  }