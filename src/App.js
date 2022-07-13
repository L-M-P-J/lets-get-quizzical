
import './App.css'; 
import { Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import Footer from './Footer';
import CurrentGame from './CurrentGame';
import claps from '../src/assets/claps_final.mp3';

// NEXT STEPS:

//if user refreshes current game  >goes back to question 1 (ok w/e)
// Make an END component for the game after the last question (logic using < .length of the array)
    //when the user reaches the last question (last index of the questions array) use ternary to show an end-game component -> show score, go back home etc.
// Saved Games - display firebase data on the page
    //access firebase database, for each game in firebase, .map and return a list item which shows the gameName, category, and number of questions.

function App() {

  const [ categories, setCategories ] = useState([]);
  const [results, setResults] = useState([]);

  //clapping sound effect - Audio is a built in object with different properties, one of them play()
  const clappingSound = new Audio(claps);

  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      const originalCategories = response.data.trivia_categories;
      const slicedCategories = originalCategories.slice(1, originalCategories.length);
      setCategories(slicedCategories);
      console.log(categories);
      console.log(slicedCategories);
    });
  }, []);

  return (
    <div className="App">
  
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="/newgame" element={<NewGameForm categoriesData={categories} setResults={setResults} results={results}/>}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
        <Route path="/currentGame/:gameId" element={<CurrentGame clappingSound={clappingSound}/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;

/*

  TO-DO FOR TONIGHT

    1. Modal & Google Chrome Issue - Lester
    2. Research for replacing regex, audio - Pau
    3. Current Games - Joey
    4. Saved Games - Mel


*/