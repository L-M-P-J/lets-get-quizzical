const Modal = (props) => {
    const {setIsModalOn, resultsData, currentQuestion, userAnswer} = props;

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
                    <div><span className="correct-answer">Correct Answer:</span> <p>{resultsData.gameData[currentQuestion - 1].correct_answer.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`)}</p></div>
                    <div className="your-answer-paragraph"><span className="your-answer">Your Answer:</span><p>{userAnswer.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`)}</p></div>
                </div>
                <button onClick={handleClick} className="exit-modal">Continue</button>
            </div>
            <div className="modalGray"></div>
        </div>
    )
}

export default Modal;