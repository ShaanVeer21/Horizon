import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { getOrderDetails,payOrder, deliverOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const { id: orderId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {loading: loadingDeliver , success: succcessDeliver } = orderDeliver;

    const orderPay = useSelector((state) => state.orderPay);
    const {loading: loadingPay , success: succcessPay } = orderPay;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    // Calculate itemsPrice locally without mutating Redux state
    const itemsPrice = !loading && order
        ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
        : 0;

    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }

        if (!order || order._id !== Number(orderId) || succcessDeliver || succcessPay) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, succcessDeliver, succcessPay]);

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    const paymentHandler = () =>{
        dispatch(payOrder(order))
    }


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name :</strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email :</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt.substring(0,10)}</Message>
                            ) : (
                                <Message variant="warning">Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong> {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt.substring(0,10)}</Message>
                            ) : (
                                <Message variant="warning">Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">No Orders</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    {item.qty} x ₹{item.price} = ₹
                                                    {(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>₹{itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>GST:</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        
                        {loadingPay && <Loader></Loader>}
                        {userInfo && !order.isPaid &&(
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block w-100'
                                    onClick={paymentHandler}
                                >
                                    Pay
                                </Button>
                            </ListGroup.Item>
                        )}


                        {loadingDeliver && <Loader />}
                        
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block w-100'
                                    onClick={deliverHandler}
                                >
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;
