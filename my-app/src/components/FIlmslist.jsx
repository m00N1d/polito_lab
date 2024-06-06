import { useEffect,useState } from "react";
import { loadFilms } from "../api/API";


export default function FilmsList(props){
    const  [fIlms, setFIlms] = useState();

    useEffect(()=>{
        loadFilms().then((myFilms)=>{
            setFIlms(myFilms);
        });
    },[]);
    console.log(fIlms);

    props.setting(fIlms);
}

