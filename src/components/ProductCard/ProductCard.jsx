import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({product}) {
    return (
        <div>
            <div className='card_container'>
                <Link to={`/product/${product.id}`}
                className='card_container_link'
                style={{ textDecoration: 'none' }}>
                    <div className='card_container_item_img'>
                        <img src={product.photo[0]} alt='' className='product_img' />   
                    </div>
                    <div className='card_container_item'>
                        <h5 className='product_price'>${product.price}</h5>
                        <h4 className='product_name'>{product.name}</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default ProductCard;
