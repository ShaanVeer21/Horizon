import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'




function FormContainer({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6} className='m-2'>
            {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
