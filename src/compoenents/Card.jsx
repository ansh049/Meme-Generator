import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {useNavigate} from 'react-router-dom'

const MemeCard=(props)=>{
    const navigate=useNavigate();
    return (
       <Card className="meme-card">
      <Card.Img variant="top" src={props.img} alt={`${props.title} meme template`} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        
        <Button variant="primary" className="meme-card-button" onClick={e=>navigate(`/edit?url=${props.img}`)}>Edit this meme <span aria-hidden="true">→</span></Button>
      </Card.Body>
    </Card>
    )
}

export default MemeCard;