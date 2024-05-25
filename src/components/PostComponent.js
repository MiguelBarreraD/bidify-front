import React from 'react';
import styles from '../styles/PostComponent.module.css';

function Post({ imageUrl, productName, owner, initialPrice }) {
  return (
    <div className={styles.post}>
      <img className={styles.image} src={imageUrl} alt={productName} />
      <div className={styles.details}>
        <h2 className={styles.productName}>{productName}</h2>
        <p className={styles.owner}>Owner: {owner}</p>
        <p className={styles.price}>Initial Price: ${initialPrice}</p>
      </div>
    </div>
  );
}

export default Post;
