import React, { useState, useEffect } from 'react';
import styles from '../styles/recomendationComponent.module.css'; 

const Recomendations = () => {
  const [subastas, setSubastas] = useState([]);

  useEffect(() => {
    const fetchSubastas = async () => {
      const token = localStorage.getItem('jwtToken');
      
      try {
        const response = await fetch('http://localhost:8080/subasta', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener subastas');
        }

        const data = await response.json();
        const formattedSubastas = data.map(subasta => ({
          id: subasta.id,
          productName: subasta.producto.nombre,
          initialPrice: subasta.precioInicial,
        }));
        
        setSubastas(formattedSubastas);
      } catch (error) {
        console.error('Error al obtener subastas:', error);
      }
    };

    fetchSubastas();
  }, []);

  return (
    <div className={styles.recomendacionesContainer}>
      <h2>Recomendaciones</h2>
      <div className={styles.columnWrapper}>
        {subastas.map((subasta, index) => (
          <div key={index} className={styles.subastaItem}>
            <div className={styles.productName}>{subasta.productName}</div>
            <div className={styles.precio}>Precio inicial: {subasta.initialPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendations;
