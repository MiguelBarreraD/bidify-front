import React from 'react';
import styles from '../styles/TopBar.module.css'; 

function TopBar({ handleLogout }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        <h1>Bidify</h1>
      </div>
      <div className={styles.menu}>
        <ul>
          <li onClick={handleLogout}>Cerrar sesión</li>
        </ul>
      </div>
    </div>
  );
}

export default TopBar;
