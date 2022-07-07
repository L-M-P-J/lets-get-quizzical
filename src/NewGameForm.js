import { useState} from 'react';
import axios from 'axios';

const NewGameForm = (props) => {

    const { categoriesData, setResults} = props;
    const [ numberChoice, setNumberChoice ] = useState(1);
    const [ categoryChoice, setCategoryChoice ] = useState('');
    
    const handleNumberChange = (event) => {
        setNumberChoice(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategoryChoice(event.target.value);
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
            // console.log(results);
            // const database = getDatabase(firebase);
            // const dbRef = ref(database);
            // push(dbRef, response.data.results);
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

                <button type="submit">Submit</button>
            </form>

        </section>
    )
}

export default NewGameForm;