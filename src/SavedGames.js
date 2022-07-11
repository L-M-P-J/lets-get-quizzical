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
       
        <ul className="savedGamesList">
            {gameList.map( (game) => {
                return (
                    
                    <li key={game.key}>
                        <Link to={`/currentGame/${game.key}`}>
                            <h2>{game.name}</h2>
                            <p>Category:{game.gameData[0].category}</p>
                            {/* error handle for general knowledge or REMOVE */}
                            <p>Number of questions:{game.gameData.length}</p>
                        
                        </Link>
                    </li>
                    
                )
            })} 
        </ul>
    )
}

export default SavedGames;

//make a firebase call onvalue to display user game, categories nd number of questions:
    //for loop to then push it into an array and 
    //map over the array of games to display them on the page
    //make each game a link so they can go to currentGame/key
