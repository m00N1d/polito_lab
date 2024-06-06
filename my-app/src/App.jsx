import { useState, useEffect } from 'react'
import './App.css'
import NavigationBar from './components/NavigationBar';
import SideBar from './components/SideBar';
import MainContext from './components/MainContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import FilmLibrary from "./FilmLibary.mjs"
import Film  from './FILMS.mjs';
import {Routes, Route, Link} from 'react-router-dom';
import FilmForm from './components/FilmForm.jsx';
import NewFilter from './components/NewFilter.jsx';
import FilmsList from './components/FIlmslist.jsx';
import { loadFilms,filterUnseen,filterLastmonth,filterBest,filterFavorite,logIn,logOut,getUserInfo } from "./api/API";
import { LoginForm, LogoutButton } from "./components/Auth.jsx"



function App() {
  
  const [FilmRespb, setFilmRespb] = useState([]);
  const [LoggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  const addFilms = (fi)=>{
    setFilmRespb(      (oldFilmResp)=>{
      const newID = Math.max(...oldFilmResp.map(film=>film.id))+1;
      const newFilm = {"id": newID, 
                      "title": fi.title,
                      "favorite": fi.favorite,
                      "watchDate": fi.watchDate,
                      "rating": fi.rating,
                      "userId": fi.userId}
      return [...oldFilmResp,newFilm];
    });
  }

  const updateFilms = (fi)=>{
    setFilmRespb(      (oldFilmResp)=>{
      return oldFilmResp.map((film)=>{
        if(film.id ===fi.id){
          return {"id": fi.id, 
          "title": fi.title,
          "favorite": fi.favorite,
          "watchDate": fi.watchDate,
          "rating": fi.rating,
          "userId": fi.userId};
        }else{
          return film;
        }
      })
    });
  }

  function FilmsList(){
    useEffect(()=>{
        loadFilms().then((myFilms)=>{
          setFilmRespb(myFilms);
        });
    },[]);
}
  // NEW
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  // NEW
  const handleLogin = async (credentials) => {
    try {
      const user = await logIn(credentials);
      setLoggedIn(true);
      setMessage({msg: `Welcome, ${user.name}!`, type: 'success'});
      setUser(user);
    }catch(err) {
      setMessage({msg: err, type: 'danger'});
    }
  };

  // NEW
  const handleLogout = async () => {
    await logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };

  return (
    
    
      
      <Routes>
      
        <Route path='/' element={<>
          {LoggedIn&&<NavigationBar/>}
          <Row LclassName='flex-grow-1'>
            {FilmsList()}
            {LoggedIn&&<SideBar/>}
            {LoggedIn&&<MainContext films={FilmRespb} titlemain = {"All"}  updateFilms = {updateFilms}/>}
            {LoggedIn||<LoginForm login={handleLogin} />}
          </Row>
          </>
        }>

          <Route path='/ADD' element={
            <FilmForm
                addFilms = {(fi)=>{addFilms(fi);}}
                />
            }/>


          <Route path='/filter/:f' element={
          <Row className='flex-grow-1'>
            <NewFilter Rep={FilmRespb} updateFilms = {updateFilms}/>
          </Row>
          }>
          </Route>



        </Route>

      </Routes>
  )
}

export default App
