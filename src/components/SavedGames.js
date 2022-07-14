import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from '../firebase';
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
        })
    }, [])

    return (
        <section className='tightWrapper savedGames'>
            <Link to='/' className='currentGameButton savedGamesButton'>Back to main page</Link>
            <div className='savedGamesContainer'>
                <h2>Saved Games</h2>
                <h3>Click on a game to re-play!</h3>
                <ul className='savedGamesList'>
                    {gameList.map( (game) => {
                        return (
                            <li key={game.key} className='cassette'>
                                <div className='cassetteDiv'>
                                    <p className='madeBy'>{game.name}</p>
                                </div>
                                <div className='linkToGame'>
                                <Link to={`/currentGame/${game.key}`}>
                                    <div className='cassetteText'>
                                        <h4>{game.gameData[0].category}</h4>
                                        <p>No. of questions: {game.gameData.length}</p>
                                    </div>
                                </Link>
                                </div>
                            </li>
                        )
                    })} 
                </ul>
            </div>
        </section>

    )
}

export default SavedGames;