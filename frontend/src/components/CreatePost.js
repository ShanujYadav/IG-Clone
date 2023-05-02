import React, { useState } from "react";
import { Form, Button, Card, Container } from 'react-bootstrap';

const CreatePost=()=>{

const[title,setTitle]=useState('')
const[body,setBody]=useState('')
const[pic,setPic]=useState('')

const onsubmitHandler=e=>{
    e.preventDefault()
    fetch('http://localhost:4000/createPost',{
        method:'Post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({title,body,pic})
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
}
return(
    <Container>
    <center>
        <Card style={{ width: '20rem', backgroundColor: 'ghostwhite' }} className="mt-3">
            <Card.Body>
                <Form onSubmit={onsubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title" onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBody">
                        <Form.Label>Body</Form.Label>
                        <Form.Control type="text" placeholder="Enter Body" onChange={e => setBody(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPic">
                        <Form.Label>Pic</Form.Label>
                        <Form.Control type="text" placeholder="Img URL" onChange={e => setPic(e.target.value)} />
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
export default CreatePost;
