import React from "react";
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image}></Card.Img>
        </Link>
        <Card.Body>
            <Link to={{textDecorationLine : "none"}} href={`/products/${product._id}`}>
                <Card.Title as="h5" >
                    {product.name}
                </Card.Title>
            </Link>
            <Card.Text as="h5">
                <div className="my-3">
                    <Rating value= {product.rating} text={`${product.numReviews} reviews`} color={`#FCD12A`}/>
                </div>
            </Card.Text>

            <Card.Text as="h4">
                <i className="fa-solid fa-indian-rupee-sign"> {product.price}</i>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
