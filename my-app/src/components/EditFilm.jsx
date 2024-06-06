import { Form,Button} from 'react-bootstrap';
import { useState } from 'react'
import dayjs from 'dayjs';


function IsFavorite(props){
    if(props.like == "true")
        return(
            <input type="checkbox" className='custom-control-input' checked/>
        )
    else
        return(
            <input type="checkbox" className='custom-control-input'/>
        )
}

function Rating(props){
    
    const ar = [];
    for( let i =0; i<props.cnt;i++){
        ar.push(<Star/>);
    }
    
    return(
        <>
            {ar}
        </>
        
    )
}

export default function EditFilm(props){
    const [title, setTitle] = useState(props.film ? props.film.title : '');
    const [favorite, setFavorite] = useState(props.film.favorite ? props.film.favorite : '');
    const [rating, setRating] = useState(props.film.rating ? props.film.rating : '');
    const [watchDate,setWatchDate] = useState(props.film.watchDate);
    const [userId,setUserId] = useState(props.film ? props.film.userId : '');

    const handleSubmit = (event) => {
        event.preventDefault();

        const film = {title,favorite,rating,watchDate,userId};
        if(props.film){
            props.updateFilms({id: props.film.id, ...film});
        }
    }
    const editItem =async()=>{
        const response = await fetch(`http://localhost:3001/api/films/${userId}`,{
            method: "PUT",
            body: JSON.stringify({"id": props.film.id, 
            "title": title,
            "favorite": favorite,
            "watchDate": watchDate,
            "rating": rating,
            "userId": userId}),
            headers: {
                'content-type': 'application/json'
            },
        });
        if(response.ok){

        }
    }
    return(
        <>
            <td>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='me-3'>
                <Form.Control type='title' required = {true} minLength = {2} value = {title} onChange={(event)=>setTitle(event.target.value)}>
                </Form.Control>
            </Form.Group>
            </Form>
            </td>
            <td>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='me-3'>
                <Form.Control type='favorite' required = {true} minLength = {2} value = {favorite} onChange={(event)=>setFavorite(event.target.value)}>
                </Form.Control>
            </Form.Group>
            </Form>
            </td>
            <td>
            <Form onSubmit={handleSubmit}>
            <Form.Group className='me-3'>
                <Form.Control type='rating' required = {true} minLength = {2} value = {rating} onChange={(event)=>setRating(event.target.value)}>
                </Form.Control>
            </Form.Group>
            </Form>
            </td>
            <td>            
            <Form onSubmit={handleSubmit}>
            <Form.Group className='me-3'>
                <Form.Control type='userId' required = {true} minLength = {2} value = {userId} onChange={(event)=>setWatchDate(event.target.value)}>
                </Form.Control>
            </Form.Group>
            {props.mode === 'edit' && <Button variant='primary' type='Submit' onClick={editItem}>Add</Button>}
            {' '}
            <Button variant='danger' onClick={()=>{props.cancel;props.modding('default')}} >Cancel</Button>
            </Form>
            </td>
        </>
    );
}