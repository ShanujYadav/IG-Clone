import React, { useState } from "react";
import { Form, Button, Card, Container } from 'react-bootstrap';

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const onsubmitHandler = e => {
        e.preventDefault()
        console.log({ name, email, password })
        fetch('http://localhost:4000/signup',{
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json())
            .then(data => {
                if(data.msg === "Added Successfully..")
                window.location.href="login"
            })
            .catch(err=>console.log(err))
    }
    return (
        <Container>
            <center>
                <Card style={{ width: '20rem', backgroundColor: 'ghostwhite' }} className="mt-3">
                    <Card.Body>
                        <Form onSubmit={onsubmitHandler}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </center>
        </Container>
    )
}
export default Signup;