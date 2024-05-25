import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import './App.css';
import SignUpComponent from './components/SignUpComponent';
import SignInComponent from './components/SingInComponent';
import FeedComponent from './components/FeedComponent';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleSignUpComponent = () => {
    setShowSignUp(!showSignUp);
  };

  const handleSignUp = (name, username, email, password) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8080/usuario/crearUsuario",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ userName: username, nombre: name, email: email, password: password, roles: ['ROLE_USER'] }),
        success: function(xhr) {
          if (xhr.status === 201) {
            console.log("Usuario creado exitosamente, mostrando formulario de ingreso...");
          }
        },
        error: function (error) {
          console.log("Error");
          reject(error);
        }
      });
    });
  };

  const signInRequest = function (userName, password) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "http://localhost:8080/usuario/login",
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ userName: userName, password: password }),
        success: function (data) {
          if (data.accesToken) {
            setIsAuthenticated(true);
            localStorage.setItem('jwtToken', data.accesToken);
            localStorage.setItem('tokenType', data.tokenType);
            resolve(data);
          } else {
            reject('Token no encontrado en la respuesta');
          }
        },
        error: function (error) {
          console.log("Error");
          reject(error);
        }
      });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('tokenType');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <FeedComponent handleLogout={handleLogout} />
      ) : (
        showSignUp ? (
          <SignUpComponent toggleSignUpComponent={toggleSignUpComponent} handleSignUp={handleSignUp} />
        ) : (
          <SignInComponent toggleSignUpComponent={toggleSignUpComponent} handleLogin={signInRequest} />
        )
      )}
    </div>
  );
}

export default App;
