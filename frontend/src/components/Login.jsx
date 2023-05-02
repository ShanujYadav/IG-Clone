import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onsubmitHandler = e => {
        e.preventDefault()
        console.log({email, password })
        fetch('http://localhost:4000/login', {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email, password })
        })
            .then(res => res.json())
            .then(data=>{
                localStorage.setItem("jwt",data)
            })
    }

return(
    <Container> 
    <center>
        <Card style={{ width: '20rem', backgroundColor: 'ghostwhite' }} className="mt-3">
            <Card.Body>
                <Form onSubmit={onsubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </center>
</Container>
)
}
export default Login;