import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NewGameForm = (props) => {

    const { categoriesData, setResults, setGameName } = props;
    const [ numberChoice, setNumberChoice ] = useState(1);
    const [ categoryChoice, setCategoryChoice ] = useState('');

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
            
        }).then(() => {
            navigate('/currentgame/');
        });
    }

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