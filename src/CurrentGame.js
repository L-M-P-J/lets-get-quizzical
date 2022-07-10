import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

const CurrentGame = () => {

    const {gameId} = useParams();

    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ userAnswer, setUserAnswer ] = useState('');
    const [ checked0, setChecked0 ] = useState(false);
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ checked3, setChecked3 ] = useState(false);
    const [allAnswersArray, setAllAnswersArray] = useState([]);
    const [currentCorrectAns, setCurrentCorrectAns] = useState('');
    const [resultsData, setResultsData] = useState([]);

    useEffect( () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${gameId}`);
        onValue(dbRef, (response) => {
            const data = response.val();
            setResultsData(data);

            const answerArray = [...data.gameData[currentQuestion].incorrect_answers];
            const correctAnswer = data.gameData[currentQuestion].correct_answer;
            setCurrentCorrectAns(correctAnswer);
            function combineAnswer(arr, corr) {
                const randInd = Math.floor(Math.random() * 4)
                return arr.splice(randInd, 0, corr)
            }
            combineAnswer(answerArray, correctAnswer);
            setAllAnswersArray(answerArray);
        })
    }, [currentQuestion, gameId])

    useEffect(() => {

        if (currentQuestion) {
            const answerArray = [...resultsData.gameData[currentQuestion].incorrect_answers];

            const correctAnswer = resultsData.gameData[currentQuestion].correct_answer;
            setCurrentCorrectAns(correctAnswer);

            function combineAnswer(arr, corr) {
                const randInd = Math.floor(Math.random() * 4)
                return arr.splice(randInd, 0, corr)
            }

            combineAnswer(answerArray, correctAnswer);

            setAllAnswersArray(answerArray);
        }
    }, [currentQuestion, resultsData]);

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

    const handleUserInput0 = () => {
        setChecked0(!checked0);
    }

    const handleUserInput1 = () => {
        setChecked1(!checked1);
    }

    const handleUserInput2 = () => {
        setChecked2(!checked2);
    }

    const handleUserInput3 = () => {
        setChecked3(!checked3);
    }

    const handleClick = (event) => {
        setUserAnswer(event.target.value);
    }
    
    if (resultsData.length < 1) {
        return (
            <p>Game is loading</p>
        )
    } else {

        return (
            <section>
                <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>{resultsData.gameData[currentQuestion].question}</legend>
                    <label htmlFor='option1'>{allAnswersArray[0]}</label>
                    <input id='option1' onClick={handleClick} onChange={handleUserInput0} type='radio' name='answer' value={allAnswersArray[0]} checked={checked0}></input>

                    <label htmlFor='option2'>{allAnswersArray[1]}</label>
                    <input id='option2' onClick={handleClick} onChange={handleUserInput1} type='radio' name='answer' value={allAnswersArray[1]} checked={checked1}></input>

                    <label htmlFor='option3'>{allAnswersArray[2]}</label>
                    <input id='option3' onClick={handleClick} onChange={handleUserInput2} type='radio' name='answer' value={allAnswersArray[2]} checked={checked2}></input>

                    <label htmlFor='option4'>{allAnswersArray[3]}</label>
                    <input id='option4' onClick={handleClick} onChange={handleUserInput3} type='radio' name='answer' value={allAnswersArray[3]} checked={checked3}></input>

                    <button type='submit' >Next Question</button>
            
                </fieldset>
            </form>

            <p>{score}/{resultsData.gameData.length}</p>

                <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
            </section>
        )
    }
    
}

export default CurrentGame;