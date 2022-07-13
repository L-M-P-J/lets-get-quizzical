const Modal = (props) => {
    const {setIsModalOn, resultsData, currentQuestion, userAnswer, decodeText } = props;

    const handleClick = () => {
        setIsModalOn(false);
    }

    return(
        <div className="modal">  
            <div className="modal-container">
                <div className="container">
                    <div className="circle-border"></div>
                    <div className="circle">
                        <div className="error"></div>
                    </div>
                </div>
                <h3>Nice Try!</h3>
                <div className="modal-text">
                    <div><span className="correct-answer">Correct Answer:</span> <p>{decodeText(resultsData.gameData[currentQuestion - 1].correct_answer)}</p></div>
                    <div className="your-answer-paragraph"><span className="your-answer">Your Answer:</span><p>{decodeText(userAnswer)}</p></div>
                </div>
                <button onClick={handleClick} className="exit-modal currentGameButton">Continue</button>
            </div>
            <div className="modalGray"></div>
        </div>
    )
}

export default Modal;