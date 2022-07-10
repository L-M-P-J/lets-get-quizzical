import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, ref } from 'firebase/database';

const CurrentGame = (props) => {

    const {gameId} = useParams();

    // const { resultsData } = props;
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ userAnswer, setUserAnswer ] = useState('');
    const [ checked0, setChecked0 ] = useState(false);
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ checked3, setChecked3 ] = useState(false);
    const [allAnswersArray, setAllAnswersArray] = useState([]);
    const [currentCorrectAns, setCurrentCorrectAns] = useState('');
    const [currentGame, setCurrentGame] = useState('');
    const [resultsData, setResultsData] = useState([]);

    useEffect( () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${gameId}`);
        onValue(dbRef, (response) => {
            const data = response.val();
            console.log(data);
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
            // for (let game in data) {
            //     console.log(game);
            // }
        })
    }, [])

    useEffect(() => {

        console.log(resultsData);

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
        

    }, [currentQuestion]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentQuestion(currentQuestion+1);
        console.log(currentQuestion);
        setChecked0(false);
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        if (userAnswer === currentCorrectAns) {
            setScore(score + 1);
        } else {
            console.log('WRONG WRONG SO WRONG');
        }
        

        // const answerArray = [...resultsData.gameData[currentQuestion].incorrect_answers];
        // const correctAnswer = resultsData.gameData[currentQuestion].correct_answer;
        // setCurrentCorrectAns(correctAnswer);
        // function combineAnswer(arr, corr) {
        //     const randInd = Math.floor(Math.random()*4)
        //     return arr.splice(randInd, 0, corr)
        // }
        // combineAnswer(answerArray, correctAnswer);
        // setAllAnswersArray(answerArray);


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

            <p>{score}/{resultsData.gameData.length}</p>

                <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
            </section>
        )
    }
    
}

export default CurrentGame;