
import { Routes, Route} from 'react-router-dom';
import firebase from './firebase';
import './App.css';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push } from 'firebase/database';

function App() {

  const [ categories, setCategories ] = useState([]);
  const [ numberChoice, setNumberChoice ] = useState(1);
  const [ categoryChoice, setCategoryChoice ] = useState('')


  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      setCategories(response.data.trivia_categories);
      // console.log(response.data.trivia_categories[0]);
    });
  }, []);

  useEffect(() => {
    axios({
      url: 'https://opentdb.com/api.php',
      method: 'GET',
      dataResponse: 'json',
      params: {
        category: categoryChoice,
        amount: numberChoice,
        type: 'multiple'
      }
    }).then((response) => {
      console.log(response.data.results[0]);
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      push(dbRef, response.data.results);
    });
  }, []);

  return (
    <div className="App">
      
      <Header />
      
      <Routes>
        <Route path="/newgame" element={ <NewGameForm categoriesData={categories} numberChoice={numberChoice} setNumberChoice={setNumberChoice} setCategoryChoice={setCategoryChoice} categoryChoice={categoryChoice} />}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
      </Routes>
      
    </div>
  );
}

export default App;

