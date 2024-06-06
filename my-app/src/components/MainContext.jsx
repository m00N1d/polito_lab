import { Container, Navbar,Row,Col,Table,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Pencil, Trash, Star} from 'react-bootstrap-icons';
import { useState } from 'react';
import FilmForm from './FilmForm.jsx';
import EditFilm from './EditFilm.jsx';
import {Routes, Route, Link} from 'react-router-dom';

function IsFavorite(props){
    if(props.like == true)
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

function Filmrow(props){
    const [mode, setMode]=useState('default');
    const date  = props.film.watchDate ? props.film.watchDate : null;

    const deleteitem = async()=>{
        const response = await fetch(`http://localhost:3001/api/films/${props.film.id}`,{
            method: 'DELETE',
        })
        if(response.ok){

        }
    }

    return (
        <tr>
        {   mode === 'default' &&
            <>
            <td>
                {props.film.title}
            </td>
            <td>
                <IsFavorite like = {props.film.favorite}/>
            </td>
            <td>
                <Rating cnt = {props.film.rating}/>
            </td>
            <td>{date}</td>
            </>
        }
        {
            mode === 'edit' &&
            <EditFilm film = {props.film} mode = {mode} modding = {ti =>setMode(ti)} updateFilms={(fi)=>{props.updateFilms(fi);setMode('default')}}/>
        }
            <td>
            <Button variant = 'warning' onClick={()=>{setMode('edit');}} ><Pencil/></Button>
            <Button variant='primary' className='mx-1' onClick={deleteitem}><Trash/></Button> 
            </td>
        </tr>
    )
}
Filmrow.propTypes = {
    film: PropTypes.object,
}

export default function MainContext(props){
    const [mode, setMode]=useState('default');
return(
    <div className='col-md-9 pt-3'>
        <h5>
            <span>{props.titlemain}</span>
            films
        </h5>
        <Row>
            <Col lg={10} className='mx-auto'>
                <Filmtable films={props.films} updateFilms={props.updateFilms}></Filmtable>
            </Col>
        </Row>
        <Link to= '/Add'>
            <Button variant='primary'>Add</Button>
        </Link>
        <Link to= '/'>
            <Button variant='danger'>Back</Button>
        </Link>
    </div>
    )
}
MainContext.propTypes = {
    films: PropTypes.array,
}

function Filmtable(props){

    return(
        <Table striped>
            <thead>
                <tr>

                </tr>
            </thead>
            <tbody>
                {
                    props.films.map((fi) => <Filmrow film={fi} key={fi.id} updateFilms={props.updateFilms}/>)
                }
            </tbody>
        </Table>
    )
}

Filmtable.propsTypes = {
    films: PropTypes.array,
}