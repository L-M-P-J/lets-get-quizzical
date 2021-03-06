import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import firebase from '../firebase';
import { getDatabase, ref, push, onValue} from 'firebase/database';

const NewGameForm = (props) => {

    const { categoriesData, setResults } = props;
    const [ numberChoice, setNumberChoice ] = useState(5);
    const [ categoryChoice, setCategoryChoice ] = useState('');
    const [ gameId, setGameId ] = useState('');
    const [ gameName, setGameName ] = useState('');

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

    return (
        <section className='formSection wrapper'>
            <h2>Are you Ready To Get Quizzical?!</h2>
            <form className='gameForm' action='' onSubmit={handleSubmit}>
                <label className='sr-only' htmlFor='gameName'>Name your game!</label>
                <input className='inputForm' type='text' id='gameName' placeholder='Name your game!' onChange={handleNameChange} required/>
                <div className='arrowContainer'>
                    <i className='fa-solid fa-caret-down'></i>
                    <label className='sr-only' htmlFor='category'>Select Category: </label>
                    <select className='selectCategory' name='category' id='category' onChange={handleCategoryChange}>
                        <option value disabled selected>Select a category</option>
                        {
                            categoriesData.map((category) => {
                                return(
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='numberOfQuestionContainer'>
                    <label className='selectNumber' htmlFor='questionNumber'>Select number of questions:</label>
                    <input
                    className='numOfQuestions'
                        type='number'
                        id='questionNumber'
                        name='questionNumber'
                        placeholder=''
                        step='1'
                        min='5'
                        max='30'
                        onChange={ handleNumberChange }
                        value={numberChoice}
                    />
                </div>
                <button className='submitGame' type='submit'><span>Let's Play!</span></button>
            </form>
            <Link to='/'><i className='fa-solid fa-arrow-left'></i></Link>
        </section>
    )
}

export default NewGameForm;