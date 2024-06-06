import { useState } from 'react';
import { Container, Navbar,Row,Button} from 'react-bootstrap';
import dayjs from "dayjs";
import {Routes, Route, Link} from 'react-router-dom';

function SideBar(props){

return(
    <div className='col-md-3 bg-light d-md-block'>
        <Row className='vh-100'>
        <ul className="list-group list-group-flush ">
                    
                    {/* <Button type="button" className="list-group-item list-group-item-action list-group-item-light btn btn-outline-primary" onClick={()=>{props.chg(ALL);props.sett("ALL");}}> */}
                    
                    <Link to='/filter/All'  >
                        All
                    </Link>
                    <p> </p>
                    <Link to='/filter/Favorites' >
                    Favorites
                    </Link>
                    <p> </p>
                    <Link to='/filter/BestRated' >
                    Best Rated
                    </Link>
                    <p> </p>
                    <Link to='/filter/SeenLastMonth'>
                    Seen Last Month
                    </Link>
                    <p> </p>
                    
                    <Link to='/filter/Unseen'>
                    Unseen
                    </Link>


                </ul>
        </Row>
    </div>
)

}

export default SideBar