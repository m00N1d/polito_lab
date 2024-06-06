
import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import MainContext from './MainContext';
import dayjs from 'dayjs';
import {loadFilms,filterUnseen,filterLastmonth,filterBest,filterFavorite} from '../api/API.js'

export default function NewFilter(props){
    const params = useParams();
    const cond = params.f;
    const [Repository, SetRepository] = useState([]);
    let newP =  Repository;
    const newT = cond

    function FilmsList(){

        useEffect(()=>{
            loadFilms().then((myFilms)=>{
                SetRepository(myFilms);
            });
        },[]);
    }
    
    function FilmsFavorite(){

        useEffect(()=>{
            filterFavorite().then((myFilms)=>{
                SetRepository(myFilms);
            });
        },[]);
    }
    function FilmsBest(){

        useEffect(()=>{
            filterBest().then((myFilms)=>{
                SetRepository(myFilms);
            });
        },[]);
    }
    function FilmsLastmonth(){

        useEffect(()=>{
            filterLastmonth().then((myFilms)=>{
                SetRepository(myFilms);
            });
        },[]);
    }
    function FilmsUnseen(){

        useEffect(()=>{
            filterUnseen().then((myFilms)=>{
                SetRepository(myFilms);
            });
        },[]);
    }
    function Filterfilms(){
        
        switch (cond) {
            case 'All':
                FilmsList();
                break;
            case 'Favorites':
                FilmsFavorite();
                break;
            case 'BestRated':
                FilmsBest();
                break;
            case 'SeenLastMonth':
                FilmsLastmonth();
                break;
            case 'Unseen':
                FilmsUnseen();
                break;
        }
    }


    return(
        
        <>
            <Filterfilms/>
            <MainContext films={Repository} titlemain = {newT} addFilms = {props.addFilms} updateFilms = {props.updateFilms}/>
        </>
        
    )
}