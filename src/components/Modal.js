import { useEffect, useState } from "react";

const Modal = (props) => {

    const { setIsModalOn, resultsData, userAnswer, decodeText, currentQuestion, modalCounter, setModalCounter } = props;

    const [ modalQuestionNum, setModalQuestionNum ] = useState(0);
    
    const secondLastQuestion = resultsData.gameData.length - 1;
    
    const handleClick = () => {
        setIsModalOn(false);
    }
    
    useEffect( () => {
        if (secondLastQuestion > currentQuestion) {
            setModalQuestionNum(currentQuestion - 1);
        } else if (secondLastQuestion === currentQuestion && modalCounter === 1) {
            setModalQuestionNum(secondLastQuestion);
        } else if (secondLastQuestion === currentQuestion) {
            setModalCounter(modalCounter + 1);
            setModalQuestionNum(currentQuestion - 1);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //the eslint-diable-line comment above is 'commented out' on purpose, and it must stay on the same line as the end of the useEffect - this is part of the functionality.

    return(
        <div className='modal'>  
            <div className='modalContainer'>
                <div className='container'>
                    <div className='circleBorder'></div>
                    <div className='circle'>
                        <div className='error'></div>
                    </div>
                </div>
                <h3>Nice Try!</h3>
                <div className='modalText'>
                    <div><span className='correctAnswer'>Correct Answer:</span> <p>{decodeText(resultsData.gameData[modalQuestionNum].correct_answer)}</p></div>
                    <div className='yourAnswerParagraph'><span className='yourAnswer'>Your Answer:</span><p>{decodeText(userAnswer)}</p></div>
                </div>
                <button onClick={handleClick} className='exitModal currentGameButton'>Continue</button>
            </div>
            <div className='modalGray'></div>
        </div>
    )
}

export default Modal;