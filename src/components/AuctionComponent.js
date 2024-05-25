import React, { useEffect, useState } from 'react';
import styles from '../styles/AuctionComponent.module.css';
import $ from 'jquery';

function Auction() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const response = await fetch('http://localhost:8080/producto/lista', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener productos');
                }
                const data = await response.json();
                const formattedProductos = data.map(producto => ({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    img: producto.img
                }));
                setProductos(formattedProductos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProductos();
    }, []);

    const getProductoById = (id) => {
        return productos.find((producto) => producto.id === id);
    };

    const handleCreateSubasta = (productoId) => {
        const producto = getProductoById(productoId);
        const subastador = null; 

        if (producto && subastador) {
            const token = localStorage.getItem('jwtToken'); // Obtener el token

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'http://localhost:8080/subastas',
                    type: 'POST',
                    contentType: 'application/json',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        subastador: subastador,
                        producto: producto,
                        precioInicial: producto.precio,
                        estado: true,
                        cantidadDeOfertantes: 0,
                    }),
                    success: function (data) {
                        console.log('Subasta creada:', data);
                        resolve(data);
                    },
                    error: function (error) {
                        console.error('Error al crear la subasta:', error);
                    },
                });
            });
        }
    };

    return (
        <div className="album py-5 bg-light">
            <div className={styles.container}>
                <div className={styles.contenedorProducto}>
                    {productos.map((producto) => (
                        <div key={producto.id} className={styles.productCard}>
                            <img
                                src={producto.img}
                                alt={producto.nombre}
                                className={styles.productImage}
                            />
                            <div className={styles.productContent}>
                                <h3 className={styles.productName}>{producto.nombre}</h3>
                                <p className={styles.productPrice}>
                                    Precio: ${producto.precio.toLocaleString()}
                                </p>
                                <button
                                    className={styles.productButton}
                                    onClick={() => handleCreateSubasta(producto.id)}
                                >
                                    Seleccionar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Auction;