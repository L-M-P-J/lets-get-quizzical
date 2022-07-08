
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

function App() {

  const [ categories, setCategories ] = useState([]);
  const [results, setResults] = useState([]);
  console.log(results);
  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      setCategories(response.data.trivia_categories);
      // console.log(response.data.trivia_categories);
    });
  }, []);

  useEffect( () => {
    console.log(results);
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, results);
  }, [results]);

  /*
  NOTE TO FUTURE LESTER:

  The reason why we were pushing the previous value of result is because of the nature of firebase commands. 
  
  Meaning we will push results before we setResult with the new value, explaining the fact that we have the previous value on firebase.
  It will occur before we even setResult which means it will have the old value. 

  App.js (parent) -----> NewGameForm.js (child)
  
  NewGameForm.js will setResult which will trigger a re-render of App.js. 

  Before, the steps would be, push to Firebase, setResults, trigger re-render of App.js

  Now, if you put the firebase pushing in App component (in a useEffect depending on results to update), you would make the firebase step go LAST after everything, and it won't execute until results is updated.
  */

  // useEffect(() => {
  //   axios({
  //     url: 'https://opentdb.com/api.php',
  //     method: 'GET',
  //     dataResponse: 'json',
  //     params: {
  //       category: categoryChoice,
  //       amount: numberChoice,
  //       type: 'multiple'
  //     }
  //   }).then((response) => {
  //     setResults(response.data.results);
  //     console.log(results);
  //     // const database = getDatabase(firebase);
  //     // const dbRef = ref(database);
  //     // push(dbRef, response.data.results);
  //   });
  // }, []);

  return (
    <div className="App">
  
      <Routes>
        <Route path="/" element={<Header />}/>
        <Route path="/newgame" element={ <NewGameForm categoriesData={categories} setResults={setResults} results={results}/>}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
        <Route path="/currentGame" element={<CurrentGame/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

