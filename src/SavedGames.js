import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { onValue, getDatabase, ref} from 'firebase/database';

const SavedGames = () => {

    const [ gameList, setGameList ] = useState([]);

    useEffect( () => {
        const newArray = [];
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        onValue(dbRef, (response) => {
            const data = response.val();
            for(let item in data) {
                data[item] = {...data[item], 'key': item};
                newArray.push(data[item]);
            }
            setGameList(newArray);
            console.log(newArray);
            
      
        })
    }, [])

    return (
       
        <section className="wrapper savedGames">

            <Link to="/"><i className="fa-solid fa-arrow-left"></i>Make a new game</Link>

            <h2>Saved Games</h2>
            <h3>Click on a game to re-play!</h3>

            <ul className="savedGamesList">
                {gameList.map( (game) => {
                    return (
                        
                        <li key={game.key} className="cassette">
                            <Link to={`/currentGame/${game.key}`} className="cassetteLabel">

                                <h4>Category: {game.gameData[0].category}</h4>
                                {/* error handle for general knowledge or REMOVE */}
                                <p>Number of questions: {game.gameData.length}</p>
                                <p>Made by: {game.name}</p>

                                <div className="cassetteTape">
                                    <div className="tapeFrame">

                                    </div>
                                </div>

                            </Link>

{/* TO-DO - hide all cassette tape related divs from screen readers */}
                            
                        </li>
                        
                    )
                })} 
            </ul>
        </section>
    )
}

export default SavedGames;

//make a firebase call onvalue to display user game, categories nd number of questions:
    //for loop to then push it into an array and 
    //map over the array of games to display them on the page
    //make each game a link so they can go to currentGame/key
