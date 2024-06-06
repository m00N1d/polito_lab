import dayjs from "dayjs";

export default function FilmLibrary() {
    this.list = [];
  
    this.addNewFilm = (film) => {
      if(!this.list.some(f => f.id == film.id))
        this.list.push(film);
      else
        throw new Error('Duplicate id');
    };
  
    this.deleteFilm = (id) => {
      const newList = this.list.filter(function(film, index, arr) {
        return film.id !== id;
      })
      this.list = newList;
    }
  
    this.resetWatchedFilms = () => {
      this.list.forEach((film) => delete film.watchDate);
    }
  
    this.getRated = () => {
      const newList = this.list.filter(function(film, index, arr) {
        return film.rating > 0;
      })
      return newList;
    }
  
    this.sortByDate = () => {
      const newArray = [...this.list];
      newArray.sort((d1, d2) => {
        if(!(d1.watchDate)) return  1;   // null/empty watchDate is the lower value
        if(!(d2.watchDate)) return -1;
        return d1.watchDate.diff(d2.watchDate, 'day')
      });
      return newArray;
    }
  
  }
  
  