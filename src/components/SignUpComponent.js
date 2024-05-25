import React, { useState, useEffect  } from 'react';
import styles from '../styles/SignUpComponent.module.css';

function SignUpComponent({ toggleSignUpComponent, handleSignUp }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    },  100); 
  
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    handleSignUp(name, username, email, password);    
  };

  return (
    <div className={`${styles.container} ${isLoaded ? styles.loaded : ''}`}>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>
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
          Correo:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <input type="submit" value="Registrarse" className={styles.button} />
      </form>
      <button onClick={toggleSignUpComponent} className={styles.signInButton}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default SignUpComponent;