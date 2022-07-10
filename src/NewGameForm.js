import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import firebase from './firebase';
import { getDatabase, ref, push, onValue} from 'firebase/database';

const NewGameForm = (props) => {

    const { categoriesData, setResults } = props;
    const [ numberChoice, setNumberChoice ] = useState(1);
    const [ categoryChoice, setCategoryChoice ] = useState('');
    const [gameId, setGameId] = useState('');
    const [gameName, setGameName] = useState('');

    const navigate = useNavigate();

    const handleNumberChange = (event) => {
        setNumberChoice(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategoryChoice(event.target.value);
    }

    const handleNameChange = (event) => {
        setGameName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        axios({
            url: 'https://opentdb.com/api.php',
            method: 'GET',
            dataResponse: 'json',
            params: {
                category: categoryChoice,
                amount: numberChoice,
                type: 'multiple'
            }
        }).then((response) => {  
            const gameData = response.data.results;
            setResults(gameData);
            push(dbRef, { gameData, name: gameName });
        }).then(() => {
            onValue(dbRef, (response) => {
                const data = response.val();
                const lastKey = Object.keys(data).pop();
                setGameId(lastKey);
                navigate(`/currentgame/${lastKey}`);
            })
        });
    }

    console.log(gameId);
    console.clear();

    return (
        <section>
            
            <form action="" onSubmit={handleSubmit}>

                <label htmlFor="gameName">Name your game!</label>
                <input type="text" id="gameName" placeholder="Dua Lipa" onChange={handleNameChange}/>

                <label htmlFor="category">Select Category:</label>
                <select name="category" id="category" onChange={handleCategoryChange}>
                    {
                        categoriesData.map((category) => {
                            return(
                                <option value={category.id} key={category.id}>{category.name}</option>
                            )
                        })
                    }
                </select>
                
                <label htmlFor="questionNumber">Select number of questions:</label>
                <input
                    type="number"
                    id="questionNumber"
                    name="questionNumber"
                    placeholder=""
                    step="1"
                    min="1"
                    max="30"
                    onChange={ handleNumberChange }
                    value={numberChoice}
                />
                <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
                <button type="submit">Submit</button>
            </form>

        </section>
    )
}

export default NewGameForm;