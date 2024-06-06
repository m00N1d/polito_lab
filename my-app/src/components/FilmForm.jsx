import { Form,Button} from 'react-bootstrap';
import { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
export default function FilmForm(props){
    const [title, setTitle] = useState(props.film ? props.film.title : '');
    const [favorite, setFavorite] = useState(props.film ? props.film.favorite : '');
    const [rating, setRating] = useState(props.film ? props.film.rating : '');
    const [watchDate,setWatchDate] = useState(props.film ? props.film.watchDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    const [userId,setUserId] = useState(props.film ? props.film.userId : '');
    const [film,setFilm] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const film1 = {title,favorite,rating,watchDate,userId};
        if(props.film){

        }else{
            props.addFilms(film1);
        }
    }

    useEffect(()=>{setFilm({title,favorite,rating,watchDate,userId})},[title,favorite,rating,watchDate,userId])
    const addItems = async () => {
        
        const response = await fetch('http://localhost:3001/api/films',{
            method: 'POST',
            body: JSON.stringify(film),
            headers: {
                'content-type': 'application/json'
            },
        })
        if(response.ok){

        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control type='title' required = {true} minLength = {2} value = {title} onChange={(event)=>setTitle(event.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    Favorite
                </Form.Label>
                <Form.Control type='favorite' required = {true}  value = {favorite} onChange={(event)=>setFavorite(event.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    rating
                </Form.Label>
                <Form.Control type='rating' required = {true}  value = {rating} onChange={(event)=>setRating(event.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    watchDate
                </Form.Label>
                <Form.Control type='watchDate' required = {true}  value = {watchDate} onChange={(event)=>setWatchDate(event.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>
                    userId
                </Form.Label>
                <Form.Control type='userId'  value = {userId} onChange={(event)=>setUserId(event.target.value)}>
                </Form.Control>
            </Form.Group>

                <Button variant='primary' type='Submit' onClick={addItems}>Add</Button>

            {' '}
            <Link to='/'>
                <Button variant='danger'>Cancel</Button>
            </Link>
        </Form>
    )
}
