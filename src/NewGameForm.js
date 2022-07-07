import { useState } from 'react';

const NewGameForm = (props) => {

    const { categoriesData, setCategoryChoice, setNumberChoice, numberChoice, categoryChoice } = props;
    
    const handleNumberChange = (event) => {
        setNumberChoice(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategoryChoice(event.target.value);
    }

    return (
        <section>
            
            <form action="">
                <label htmlFor="category">Select Category:</label>
                <select name="category" id="category">
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