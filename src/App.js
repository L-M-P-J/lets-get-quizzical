
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

  The reason why we were pushing the previous value of result is because of the nature of how the commands execute in the .then

        }).then((response) => {  
          setResults(response.data.results);
          const database = getDatabase(firebase);
          const dbRef = ref(database);
          push(dbRef, results);
        });

      although we are setting result here, our code is in .then (which is asyncronous), meaning setResults will execute first, and the database code will execute RIGHT AWAY before we are able to even use the new value for results. Remember: We are in asyncrounous code, and javascript is a single-threaded language meaning one line of code will occur after the other. Meaning, when we're in .then, (aka within asyncrounous code), the order we write it is the order it will occur, and AFTER, the state will be updated with the new value.

      https://prnt.sc/zD11HUz7mCet
      https://prnt.sc/01nZ-zEvPLR8

      BEFORE: setResults -> const Database -> dbRef -> push -> result value is updated.

      this can explain why our initial push to firebase is always an empty array, because our initial value is [], as stated in our setResults.

      The way how I fixed this was by pushing taking the firebase portion of our process and making it only occur when results has been updated IN APP. This is done by putting it in a useEffect with the dependency on result. This means, when results is updated (ie: when setResults() is used to update results, this useEffect will trigger)

      NOW: setResults -> result value is updated -> firebase code is executed in useEffect

  Now, if you put the firebase pushing in App component (in a useEffect depending on results to update), you would make the firebase step go LAST after everything, and it won't execute until results is updated.

  -------------ALTERNATE WAY
  You may think an alternative way is to be doing this (putting the useEffect in new game form), however we need to note useEffect from React Hooks is by default executed on every render, but you can use second parameter in function to define when the effect will be executed again. 

  If passing a second argument (array), React will run the callback after the first render and every time one of the elements in the array is changed. for example when placing useEffect(() => console.log('hello'), [someVar, someOtherVar]) - the callback will run after the first render and after any render that one of someVar or someOtherVar are changed.

  This means, everytime we go onto NewGameForm, all useEffects (even if it is depending on result to update), will push to firebase regardless.

  https://prnt.sc/TiE6pM3VlHm6

  Since we are navigating to another page, we are no longer on the same component, meaning useEffect will no longer trigger until we are on the component again. Once we navigate back to newGameForm, we will trigger the automatic excute when the component mounts, finally pushing it.

  Since we are navigating before useEffect can execute, useEffect will never actually execute.

  setResults -> navigate (NOW IN CURRENT GAME COMP) -> (when you go back to form component) useEffect will execute.

  The benefit of putting it in the root (App component) is that, it will mount once, and re-render after state is changed. The issue we have right now is that we're using Routes. When going down the NewGameForm component, SavedGames and CurrentGame component aren't on the page. 

  On main page: https://prnt.sc/LqDgZi4IWDAT

  On new game form comp: https://prnt.sc/Dm9wOLcCdLMp

  We can see that the "header component" is no longer on the page. Meaning we are mounting every time we go to a new component using route. To summarize: If we were to go down our app architecture, only one single pathway exists at a time. They do not all exist at the same time.
  */

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

