import React , {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


function ProductScreen({match}) {
    const [product , setProduct ] = useState([])
    const { id } = useParams();

    useEffect(()=>{

        async function fetchProduct(){
          const{ data } = await axios.get(`/api/products/${id}`)
          setProduct(data)
        }
    
        fetchProduct()
    
      },[])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt = {product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#FCD12A`}></Rating>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h3>Price: <i className="fa-solid fa-indian-rupee-sign"> {product.price}</i></h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h5>Descprition: </h5>{product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong><i className="fa-solid fa-indian-rupee-sign"> {product.price}</i></strong></Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Button disabled={product.countInStock == 0} className='btn-block btn-dark'>Add to Cart</Button>
                                    
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
    }

export default ProductScreen
