import React, { useState, useEffect } from 'react';
import styles from '../styles/SignInComponent.module.css';

function SignInComponent({ toggleSignUpComponent, handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          Nombre de usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <input type="submit" value="Iniciar sesión" className={styles.button} />
      </form>
      <button onClick={toggleSignUpComponent} className={styles.signUpButton}>
        Registrarse
      </button>
    </div>
  );
}

export default SignInComponent;