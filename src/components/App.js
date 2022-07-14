
import '../App.css'; 
import { Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import SavedGames from './SavedGames';
import NewGameForm from './NewGameForm';
import Footer from './Footer';
import CurrentGame from './CurrentGame';
import ErrorPage from './ErrorPage';
import claps from '../assets/claps_final.mp3';

function App() {

  const [ categories, setCategories ] = useState([]);
  const [results, setResults] = useState([]);
  const [ isMuted , setIsMuted ] = useState(false);
  const [volumeClicked, setVolumeClicked] = useState(false);

  const clappingSound = new Audio(claps);

  const updateVolume = (volume) => {
    setIsMuted(volume);
  }
  
  useEffect( () => {
    axios({
      url: 'https://opentdb.com/api_category.php',
      method: 'GET',
      dataResponse: 'json',
    }).then((response) => {
      const originalCategories = response.data.trivia_categories;
      const slicedCategories = originalCategories.slice(1, originalCategories.length);
      setCategories(slicedCategories);
    });
  }, []);

  return (
    <div className="App">
  
      <Routes>
        <Route path='/' element={<Header updateVolume={updateVolume} volumeClicked={volumeClicked} setVolumeClicked={setVolumeClicked}/>}/>
        <Route path='/newgame' element={<NewGameForm categoriesData={categories} setResults={setResults} results={results}/>}/>
        <Route path='/savedgames' element={ <SavedGames />}/>
        <Route path='/currentGame/:gameId' element={<CurrentGame volumeClicked={volumeClicked} setVolumeClicked={setVolumeClicked} clappingSound={clappingSound} isMuted={isMuted} updateVolume={updateVolume}/>}/>
        <Route path='/*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>

    </div>
  );
}

export default App;