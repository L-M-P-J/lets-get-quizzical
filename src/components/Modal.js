import { useEffect, useState } from "react";

const Modal = (props) => {
    const {setIsModalOn, resultsData, userAnswer, decodeText, currentQuestion, modalCounter, setModalCounter } = props;

    const [modalQuestionNum, setModalQuestionNum] = useState(0);
    
    const handleClick = () => {
        setIsModalOn(false);
    }
    
    useEffect( () => {
        if (resultsData.gameData.length - 1 > currentQuestion) {
            setModalQuestionNum(currentQuestion - 1);
        } else if (resultsData.gameData.length - 1 === currentQuestion && modalCounter === 1) {
            setModalQuestionNum(resultsData.gameData.length - 1);
        } else if (resultsData.gameData.length - 1 === currentQuestion) {
            setModalCounter(modalCounter + 1);
            setModalQuestionNum(currentQuestion - 1);
        }
    }, [resultsData.gameData.length, currentQuestion, modalCounter, setModalCounter])

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
                    <div><span className='correct-answer'>Correct Answer:</span> <p>{decodeText(resultsData.gameData[modalQuestionNum].correct_answer)}</p></div>
                    <div className='yourAnswerParagraph'><span className='yourAnswer'>Your Answer:</span><p>{decodeText(userAnswer)}</p></div>
                </div>
                <button onClick={handleClick} className='exitModal currentGameButton'>Continue</button>
            </div>
            <div className='modalGray'></div>
        </div>
    )
}

export default Modal;