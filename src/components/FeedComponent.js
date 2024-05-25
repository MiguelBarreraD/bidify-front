import React, { useState } from 'react';
import styles from '../styles/FeedComponent.module.css';
import SidebarMenu from './SidebarMenuComponent';
import TopBar from './TopBarComponent';
import Wall from './WallComponent';
import Producto from './productComponent';
import Auction from './AuctionComponent';
import Recomendations from './recomendationComponent';

function FeedComponent({ handleLogout }) {
  const [currentComponent, setCurrentComponent] = useState('wall');

  const handleMenuClick = (component) => {
    setCurrentComponent(component);
  };

  const renderMainContent = () => {
    switch (currentComponent) {
      case 'wall':
        return (
          <>
            <Wall className={styles.wallComponent} />
            <Recomendations className={styles.recomendationsComponent} />
          </>
        );
      case 'auction':
        return <Auction className={styles.auctionComponent} />;
      case 'product':
        return <Producto />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <TopBar handleLogout={handleLogout} />
      <div className={styles.mainContent}>
        <SidebarMenu
          className={styles.sidebarMenuComponent}
          handleMenuClick={handleMenuClick}
        />
        {renderMainContent()}
      </div>
    </div>
  );
}

export default FeedComponent;