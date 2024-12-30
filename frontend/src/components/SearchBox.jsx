import React,{ useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';

function SearchBox() {

    const [keyword , setKeyword] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

  const submitHandler = (e) =>{
    e.preventDefault()
    if(keyword){
        navigate(`/?keyword=${keyword}`)
    }else{
        navigate(location.pathname + location.search);
    }
  }

    return (
    <div>
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='m-2 py-1'
            size='sm'
        >
        </Form.Control>
        <Button 
            type='submit'
            variant='outline-success'
            className='m-2'
            size="sm"
        >
            Submit
        </Button>
    </Form>
    </div>
  )
}

export default SearchBox
