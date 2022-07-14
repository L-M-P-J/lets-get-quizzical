const Modal = (props) => {
    const {setIsModalOn, resultsData, currentQuestion, userAnswer, decodeText } = props;

    const handleClick = () => {
        setIsModalOn(false);
    }

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
                    <div><span className='correct-answer'>Correct Answer:</span> <p>{decodeText(resultsData.gameData[currentQuestion - 1].correct_answer)}</p></div>
                    <div className='yourAnswerParagraph'><span className='yourAnswer'>Your Answer:</span><p>{decodeText(userAnswer)}</p></div>
                </div>
                <button onClick={handleClick} className='exitModal currentGameButton'>Continue</button>
            </div>
            <div className='modalGray'></div>
        </div>
    )
}

export default Modal;