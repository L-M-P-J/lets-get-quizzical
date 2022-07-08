
import { Routes, Route} from 'react-router-dom';
// import firebase from './firebase';
import './App.css';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import CurrentGame from './CurrentGame';
// import { getDatabase, ref, onValue, push } from 'firebase/database';

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
      // console.log(response.data.trivia_categories[0]);
    });
  }, []);

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
        <Route path="/newgame" element={ <NewGameForm categoriesData={categories} setResults={setResults}/>}/>
        <Route path="/savedgames" element={ <SavedGames />}/>
        <Route path="/currentGame" element={<CurrentGame/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

