import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

const CurrentGame = (props) => {

    const {gameKey} = useParams();

    const { resultsData } = props;
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ userAnswer, setUserAnswer ] = useState('');
    const [ checked0, setChecked0 ] = useState(false);
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ checked3, setChecked3 ] = useState(false);
    const [allAnswersArray, setAllAnswersArray] = useState([]);
    const [currentCorrectAns, setCurrentCorrectAns] = useState('');

    //when we load this page, we need to go into firebase, choose the last object (the most current game) and use that to diplay stuff on the page (in the return() in this component)

    // useEffect( () => {
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database);
    //     onValue(dbRef, (response) => {
    //         for (let game in data) {
    //         }
    //     })
    // }, [])

    useEffect(() => {

        const answerArray = [...resultsData[currentQuestion].incorrect_answers];
    
        const correctAnswer = resultsData[currentQuestion].correct_answer;
        setCurrentCorrectAns(correctAnswer);
    
        function combineAnswer(arr, corr) {
            const randInd = Math.floor(Math.random()*4)
            return arr.splice(randInd, 0, corr)
        }
        
        combineAnswer(answerArray, correctAnswer);
        
        setAllAnswersArray(answerArray);

    }, [currentQuestion]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentQuestion(currentQuestion+1);
        setChecked0(false);
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        if (userAnswer === currentCorrectAns) {
            setScore(score + 1);
        } else {
            console.log('WRONG WRONG SO WRONG');
        }
    }

    const handleUserInput0 = (event) => {
        setChecked0(!checked0);
    }

    const handleUserInput1 = (event) => {
        setChecked1(!checked1);
    }

    const handleUserInput2 = (event) => {
        setChecked2(!checked2);
    }

    const handleUserInput3 = (event) => {
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
                    <label htmlFor='Mel'>{allAnswersArray[0]}</label>
                    <input onClick={handleClick} onChange={handleUserInput0} type='radio' name='answer' value={allAnswersArray[0]} checked={checked0}></input>

                    <label htmlFor='Mel'>{allAnswersArray[1]}</label>
                    <input onClick={handleClick} onChange={handleUserInput1} type='radio' name='answer' value={allAnswersArray[1]} checked={checked1}></input>

                    <label htmlFor='Mel'>{allAnswersArray[2]}</label>
                    <input onClick={handleClick} onChange={handleUserInput2} type='radio' name='answer' value={allAnswersArray[2]} checked={checked2}></input>

                    <label htmlFor='Mel'>{allAnswersArray[3]}</label>
                    <input onClick={handleClick} onChange={handleUserInput3} type='radio' name='answer' value={allAnswersArray[3]} checked={checked3}></input>

                    <button type='submit' >Next Question</button>
            
                </fieldset>
            </form>

            <p>{score}/{resultsData.length}</p>

            <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
        </section>
    )
}

export default CurrentGame;