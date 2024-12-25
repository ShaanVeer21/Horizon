import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {

    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    
    const location = useLocation(); // Access location
    const navigate = useNavigate(); // Access navigation
    
    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate
    
    useEffect(() => {

      if(successUpdate){
        dispatch({type : USER_UPDATE_RESET})
        navigate('/admin/userlist')
      }else{
        if(!user.name || user._id !== Number(userId)){
          dispatch(getUserDetails(userId))
        }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      }

      
    }, [userId, user, successUpdate,navigate])
    
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id : user._id, name , email, isAdmin}))
        
    };


    return (
            <div>
              <Link to='/admin/userlist'>
                Go Back
              </Link>
              <FormContainer>
                
                      <h1>Edit User</h1>
                      {loadingUpdate && <Loader />}
                      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                      
                      {loading 
                      ? (<Loader/> )
                      : error 
                      ? (<Message variant='danger'>{error}</Message>) 
                      : (
                        <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control                        
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="isadmin">
                            <Form.Check
                                type="checkbox"
                                label="Is Admin"
                                value={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-3">
                            Update
                        </Button>
                    </Form>        
              )}     
              </FormContainer> 
          </div>
    );
}

export default UserEditScreen
