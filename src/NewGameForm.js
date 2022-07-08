import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import firebase from './firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database';

const NewGameForm = (props) => {

    const { categoriesData, setResults, results} = props;
    const [ numberChoice, setNumberChoice ] = useState(1);
    const [ categoryChoice, setCategoryChoice ] = useState('');
    const [ isClicked, setIsClicked ] = useState(false);

    const navigate = useNavigate();

    // const gameName = 'fun game';
    
    const handleNumberChange = (event) => {
        setNumberChoice(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategoryChoice(event.target.value);
    }

    // useEffect( () => {
    //     axios({
    //         url: 'https://opentdb.com/api.php',
    //         method: 'GET',
    //         dataResponse: 'json',
    //         params: {
    //             category: categoryChoice,
    //             amount: numberChoice,
    //             type: 'multiple'
    //         }
    //     }).then((response) => {  
    //         setResults(response.data.results);
    //                 console.log('async');
    //         const database = getDatabase(firebase);
    //         const dbRef = ref(database);
    //         push(dbRef, results);
    //     });
    // }, [isClicked])

    const handleSubmit = (event) => {
        console.log('clicked');
        event.preventDefault();
        setIsClicked(!isClicked);
        console.log('submited');
        navigate('/currentgame');
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
            setResults(response.data.results);
            console.log(response.data.results);

        });
    }

    return (
        <section>
            
            <form action="" onSubmit={handleSubmit}>
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