import React, { useState } from 'react';
import $ from 'jquery';
import styles from '../styles/productComponent.module.css';

function Producto() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [img, setImg] = useState('');

  const createProduct = () => {
    const token = localStorage.getItem('jwtToken');

    return new Promise((resolve, reject) => {
      $.ajax({
        url: 'http://localhost:8080/producto/create',
        type: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ nombre, precio, img }),
        success: function (data) {
          console.log('Producto creado exitosamente:', data);
          resolve(data);
        },
        error: function (error) {
          console.log('Error al crear el producto:', error);
          reject(error);
        }
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct();
  };

  return (
    <div className={styles.productContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del producto"
          />
        </label>
        <label className={styles.label}>
          Precio:
          <input
            className={styles.input}
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ingresa el precio del producto"
          />
        </label>
        <label className={styles.label}>
          Imagen:
          <input
            className={styles.input}
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Ingresa la URL de la imagen"
          />
        </label>
        <input className={styles.submit} type="submit" value="Crear producto" />
      </form>
    </div>
  );
}

export default Producto;