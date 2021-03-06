import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from '../firebase';
import { getDatabase, onValue, ref } from 'firebase/database';
import EndOfGame from './EndOfGame';
import Modal from './Modal';

const CurrentGame = (props) => {

    const { volumeClicked, setVolumeClicked, isMuted, clappingSound, updateVolume } = props;

    const { gameId } = useParams();
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ userAnswer, setUserAnswer ] = useState('');
    const [ checked0, setChecked0 ] = useState(false);
    const [ checked1, setChecked1 ] = useState(false);
    const [ checked2, setChecked2 ] = useState(false);
    const [ checked3, setChecked3 ] = useState(false);
    const [ allAnswersArray, setAllAnswersArray ] = useState([]);
    const [ currentCorrectAns, setCurrentCorrectAns ] = useState('');
    const [ resultsData, setResultsData ] = useState([]);
    const [ isClicked, setIsClicked ] = useState(false);
    const [ isModalOn, setIsModalOn ] = useState(false);
    const [ modalCounter, setModalCounter ] = useState(0);

    const handleUserInput0 = () => {
        setChecked0(!checked0);
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
    }
    const handleUserInput1 = () => {
        setChecked1(!checked1);
        setChecked0(false);
        setChecked2(false);
        setChecked3(false);
    }
    const handleUserInput2 = () => {
        setChecked2(!checked2);
        setChecked1(false);
        setChecked3(false);
        setChecked0(false);
    }
    const handleUserInput3 = () => {
        setChecked3(!checked3);
        setChecked0(false);
        setChecked1(false);
        setChecked2(false);
    }
    const handleClick = (event) => {
        setUserAnswer(event.target.value);
    }

    const handleVolumeClick = () => {
        setVolumeClicked(!volumeClicked);  
    }

    useEffect(()=> {
        updateVolume(volumeClicked);
    }, [volumeClicked, updateVolume]); 

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
        if (resultsData.gameData.length - 1 === currentQuestion) {
            return;
        } else {
            setCurrentQuestion(currentQuestion+1);
        }
        setChecked0(false);
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
        if (userAnswer === currentCorrectAns) {
            setScore(score + 1);
            if (!isMuted) {
                clappingSound.play();
            }
            
        } else {
            setIsModalOn(true);
        }
    }

    const handleShowScore = () => {
        if (isClicked === false) {
            if (userAnswer === currentCorrectAns) {
                setScore(score + 1);
            } else {
                setIsModalOn(true);
            }
        }
        setIsClicked(true);
    }

    // To help decode the html encoding: https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
    function decodeText(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    if (resultsData.length < 1) {
        return (
            <section className='currentGameContainer wrapper'>
                <div className='currentLoadingContainer'>
                    <p>Loading</p>
                    <div className='ldsRoller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </section>
        )
    } else {    
        return (
            <section className='currentGameContainer wrapper'>
                <h3 className='categoryTitle'>{decodeText(resultsData.gameData[currentQuestion].category)}</h3>
                {
                    isClicked === false ?                 
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>{decodeText(resultsData.gameData[currentQuestion].question)}</legend>
                                <div className='answerContainer'>
                                    <div className='answer'>
                                        <input className="sr-only" id='option1' onClick={handleClick} onChange={handleUserInput0} type='radio' name='answer' value={allAnswersArray[0]} checked={checked0} required></input>
                                        <label className={checked0 ? 'answerChecked' : null} htmlFor='option1' tabindex="0">{decodeText(allAnswersArray[0])}</label>
                                    </div>
                                    <div className='answer'>
                                        <input className='sr-only' id='option2' onClick={handleClick} onChange={handleUserInput1} type='radio' name='answer' value={allAnswersArray[1]} checked={checked1} required></input>
                                        <label className={checked1 ? 'answerChecked' : 'answerNotChecked'}  htmlFor='option2' tabindex="0">{decodeText(allAnswersArray[1])}</label>
                                    </div>
                                    <div className='answer'>
                                        <input className='sr-only' id='option3' onClick={handleClick} onChange={handleUserInput2} type='radio' name='answer' value={allAnswersArray[2]} checked={checked2} required></input>
                                        <label className={checked2 ? 'answerChecked' : 'answerNotChecked'}  htmlFor='option3' tabindex="0">{decodeText(allAnswersArray[2])}</label>
                                    </div>            
                                    <div className='answer'>
                                        <input className='sr-only' id='option4' onClick={handleClick} onChange={handleUserInput3} type='radio' name='answer' value={allAnswersArray[3]} checked={checked3} required></input>
                                        <label className={checked3 ? 'answerChecked' : 'answerNotChecked'}  htmlFor='option4' tabindex="0">{decodeText(allAnswersArray[3])}</label>
                                    </div>
                                    {
                                        resultsData.gameData.length - 1 === currentQuestion ? <button className='currentGameButton' onClick={ handleShowScore }>Finish</button>
                                        : <button className='currentGameButton' type='submit' >Submit Response</button>
                                    }
                                </div>
                        </fieldset>
                    </form>
                : <EndOfGame score={score} resultsData={resultsData} decodeText={decodeText}/>}
                {isModalOn ? <Modal setIsModalOn={setIsModalOn} resultsData={resultsData} currentQuestion={currentQuestion} userAnswer={userAnswer} decodeText={decodeText} modalCounter={modalCounter} setModalCounter={setModalCounter}/> : null}
                {
                    volumeClicked 
                    ? <div aria-label='toggle volume off' onClick={handleVolumeClick}><i className='fa-solid fa-volume-xmark' aria-hidden='true'></i> <span className='sr-only'>Volume Off</span> </div> 
                    : <div aria-label='toggle volume on' onClick={handleVolumeClick}><i className='fa-solid fa-volume-high' aria-hidden='true'></i> <span className='sr-only'>Volume On</span> </div>
                }
            </section>
        )
    }
}

export default CurrentGame;