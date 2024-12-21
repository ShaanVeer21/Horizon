import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    
    const location = useLocation(); // Access location
    const navigate = useNavigate(); // Access navigation
    
    // Extract the redirect query parameter or default to '/'
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    
    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
        
    };


    return (
            <FormContainer>
                <h1>Register</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="my-3">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Already have an Account?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/login'}>
                            Sign In
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
    );
}

export default RegisterScreen
