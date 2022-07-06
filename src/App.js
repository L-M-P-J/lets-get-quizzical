
import { Routes, Route} from 'react-router-dom';
import firebase from './firebase';
import './App.css';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import { useEffect } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push } from 'firebase/database';

function App() {

  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      console.log(response.data.trivia_categories);
    
    });

   
 
  }, []);

  useEffect(() => {
    axios({
      url: 'https://opentdb.com/api.php',
      method: 'GET',
      dataResponse: "json",
      params: {
        category: 9,
        amount: 10,
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
        <Route path="/newgame" element={ <NewGameForm />}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
      </Routes>
      
    </div>
  );
}

export default App;

