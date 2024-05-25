import React from 'react';
import styles from '../styles/SidebarMenu.module.css';

function SidebarMenu({ handleMenuClick }) {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menuList}>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick('wall')}
        >
          Página principal
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick('auction')}
        >
          Crear Subasta
        </li>
        <li
          className={styles.menuItem}
          onClick={() => handleMenuClick('product')}
        >
          Crear Producto
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;