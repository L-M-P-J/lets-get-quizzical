import {Link} from 'react-router-dom';
import { useState } from 'react';
const CurrentGame = (props) => {

    const { resultsData } = props;
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    

    return (
        <section>
            <fieldset>
            <legend>{resultsData[currentQuestion].question}</legend>
            <input type='radio' value='Mel'></input>
            <label htmlFor='Mel'>Mel</label>
            {/* {
                gameData.map((item, index) => {
                    return item.options
                })
            } */}
           
        </fieldset>
            <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
        </section>
    )
}

export default CurrentGame;