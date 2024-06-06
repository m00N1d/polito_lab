const url = "http://localhost:3001/api"
const SERVER_URL = 'http://localhost:3001';
async function loadFilms ()  {
    // on button click
    try {
        const response = await fetch(`${url}/films`)
        if (response.ok) { 
            const Films = await response.json()
            return Films;
        } else {
            console.log('http error code', response.status)
        }
    } catch (e) {
        console.log('Network error')
    }
}
async function filterUnseen ()  {
    // on button click
    try {
        const response = await fetch(`http://localhost:3001/api/films?filter=filter-unseen`)
        if (response.ok) { 
            const Films = await response.json()
            return Films;
        } else {
            console.log('http error code', response.status)
        }
    } catch (e) {
        console.log('Network error')
    }
}
async function filterLastmonth ()  {
    // on button click
    try {
        const response = await fetch(`${url}/films?filter=filter-lastmonth`)
        if (response.ok) { 
            const Films = await response.json()
            return Films;
        } else {
            console.log('http error code', response.status)
        }
    } catch (e) {
        console.log('Network error')
    }
}
async function filterBest ()  {
    // on button click
    try {
        const response = await fetch(`http://localhost:3001/api/films?filter=filter-best`)
        if (response.ok) { 
            const Films = await response.json()
            return Films;
        } else {
            console.log('http error code', response.status)
        }
    } catch (e) {
        console.log('Network error')
    }
}
async function filterFavorite ()  {
    // on button click
    try {
        const response = await fetch(`${url}/films?filter=filter-favorite`)
        if (response.ok) { 
            const Films = await response.json()
            return Films;
        } else {
            console.log('http error code', response.status)
        }
    } catch (e) {
        console.log('Network error')
    }
}

const logIn = async (credentials)=>{
    const response = await fetch(`${url}/sessions`,{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if(response.ok){
        const user = await response.json();
        return user;
    }else{
        const errDetails = await response.text();
        throw errDetails;
    }
}
const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;  // an object with the error coming from the server
    }
  };
  
  // NEW
  const logOut = async() => {
    const response = await fetch(SERVER_URL + '/api/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
  }

export{loadFilms,filterUnseen,filterLastmonth,filterBest,filterFavorite,logIn,logOut,getUserInfo};