
import { Routes, Route} from 'react-router-dom';
import firebase from './firebase';
import './App.css';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import CurrentGame from './CurrentGame';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import uuid from "react-uuid";

// NEXT STEPS:

//in CurrentGame, use onValue to get data on each game back from firebase
    //get info from firebase to populate the questions/answers > onValue
    //if user refreshes current game, we get errors > to do with firebase
// refactor useEffect to access the firebase unique key
// set gameKey variable to the firebase unique key > useParams
// Make an END component for the game after the last question (logic using < .length of the array)
// Saved Games - display firebase data on the page
  //access firebase database, for each game in firebase, .map and return a list item which shows the gameName, category, and number of questions.
// Include Routing variable

//when the user reaches the last question (last index of the questions array) use ternary to show an end-game component -> show score, go back home etc.

function App() {

  const [ categories, setCategories ] = useState([]);
  const [results, setResults] = useState([]);

  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      setCategories(response.data.trivia_categories);
    });
  }, []);

//   useEffect( () => {
//     const database = getDatabase(firebase);
//     const dbRef = ref(database);
//     const newGameRef = push(dbRef, { results, key: uuid(), name: gameName });
//     setGameId(newGameRef.key)
// }, [results]);

  return (
    <div className="App">
  
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="/newgame" element={<NewGameForm categoriesData={categories} setResults={setResults} results={results}/>}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
        <Route path="/currentGame/:gameId" element={<CurrentGame />}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;

