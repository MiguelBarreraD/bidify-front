import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import styles from '../styles/WallComponent.module.css';
import Post from './PostComponent';

function Wall() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = () => {
      const token = localStorage.getItem('jwtToken');

      return new Promise((resolve, reject) => {
        $.ajax({
          url: 'http://localhost:8080/subasta',
          type: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          success: function (data) {
            const formattedPosts = data.map(subasta => ({
              imageUrl: subasta.producto.img,
              productName: subasta.producto.nombre,
              owner: subasta.subastador.nombre,
              initialPrice: subasta.precioInicial,
            }));
            setPosts(formattedPosts);
            resolve(data);
          },
          error: function (error) {
            console.log('Error fetching posts:', error);
          }
        });
      });
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.wall}>
      {posts.map((post, index) => (
        <Post
          key={index}
          imageUrl={post.imageUrl}
          productName={post.productName}
          owner={post.owner}
          initialPrice={post.initialPrice}
        />
      ))}
    </div>
  );
}

export default Wall;
