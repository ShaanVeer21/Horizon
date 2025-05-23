import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image , Form , Button, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen() {
  const params = useParams()
  const location = useLocation()
  const productId = params.id
  const qty = new URLSearchParams(location.search).get('qty') || 1
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart


  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch , productId, qty] )

  const removeFromCartHandler = (id) =>{
    if(window.confirm('Are you sure you want to delete this User?')){
      dispatch(removeFromCart(id))
    }
  }

  const checkoutHandler = () =>{
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md = {8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md= {2}>
                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ₹{item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                        [...Array(item.countInStock).keys()].map((x) => 
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        )
                      }
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md = {4}>
        <Card>
          <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items
            </h2>
            ₹{cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(2)}
          </ListGroup.Item>
          <ListGroup>
            <ListGroup.Item>
              <Button type='button' className='btn-block w-100' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
