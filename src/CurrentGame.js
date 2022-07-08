import { Link } from 'react-router-dom';
import { useState } from 'react';
const CurrentGame = (props) => {

    const { resultsData } = props;
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ userAnswer, setUserAnswer ] = useState('');
    const [ checked0, setChecked0 ] = useState(false);
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ checked3, setChecked3 ] = useState(false);
    
    // When the user selects an answer, track the value of that answer. 
    // When the user clicks "next question", clear the radio button, it should compare value to Correct_Answer 
    // If it equals correct_Answer, add 1 to score
    // If it doesn't equal correct_Answer, add 0

    // Put all answers in 1 array. 
    // Put the correct answer into the incorrect array (use unshift or push to put it in)
    // Randomize the answers (Math.floor(Math.random()*incorrect_answers.length)) and map it on the page 
                    // function insertCorr(arr, corr) {
                //     const randInd = Math.floor(Math.random() * 4)
                //     arr.splice(randInd, 0, corr)
                    // }

    //  *** Remember to make an END component for the game
    
    const answerArray = [...resultsData[currentQuestion].incorrect_answers];

    answerArray.push(resultsData[currentQuestion].correct_answer);
    // console.log(answerArray);

    const handleSubmit = (event) => {
        console.log(event.target);
        event.preventDefault();
        setCurrentQuestion(currentQuestion+1);
        setChecked0(false);
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        console.log(userAnswer);
    }

    const handleUserInput0 = (event) => {
        // setUserAnswer(event.target.value);
        setChecked0(!checked0);
    }

    const handleUserInput1 = (event) => {
        // setUserAnswer(event.target.value);
        setChecked1(!checked1);
        // console.log(userAnswer);
    }

    const handleUserInput2 = (event) => {
        // setUserAnswer(event.target.value);
        setChecked2(!checked2);
    }

    const handleUserInput3 = (event) => {
        // setUserAnswer(event.target.value);
        setChecked3(!checked3);
    }

    const handleClick = (event) => {
        setUserAnswer(event.target.value);
    }

 

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>{resultsData[currentQuestion].question}</legend>
                    <label htmlFor='Mel'>{resultsData[currentQuestion].correct_answer}</label>
                    <input onClick={handleClick} onChange={handleUserInput0} type='radio' name='answer' value={resultsData[currentQuestion].correct_answer} checked={checked0}></input>

                    <label htmlFor='Mel'>{resultsData[currentQuestion].incorrect_answers[0]}</label>
                    <input onChange={handleUserInput1} type='radio' name='answer' value={resultsData[currentQuestion].incorrect_answers[0]} checked={checked1}></input>

                    <label htmlFor='Mel'>{resultsData[currentQuestion].incorrect_answers[1]}</label>
                    <input onChange={handleUserInput2} type='radio' name='answer' value={resultsData[currentQuestion].incorrect_answers[1]} checked={checked2}></input>

                    <label htmlFor='Mel'>{resultsData[currentQuestion].incorrect_answers[2]}</label>
                    <input onChange={handleUserInput3} type='radio' name='answer' value={resultsData[currentQuestion].incorrect_answers[2]} checked={checked3}></input>

                    <button type='submit' >Next Question</button>

                {/* {
                    gameData.map((item, index) => {
                        return item.options
                    })
                } */}
            
                </fieldset>
            </form>
            <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
        </section>
    )
}

export default CurrentGame;