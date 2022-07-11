const Modal = (props) => {
    const {setIsModalOn, resultsData, currentQuestion, userAnswer} = props;

    const handleClick = () => {
        setIsModalOn(false);
    }

    console.log(resultsData);

    return(
        <div className="modal">  
            <p>Correct Answer: {resultsData.gameData[currentQuestion - 1].correct_answer.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`)}</p>
            <p>Your Answer: {userAnswer.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`)}</p>
            <p>Modal</p>
            <button onClick={handleClick}><i className="fa-solid fa-x" aria-hidden="true"></i><div className="sr-only">Exit Modal</div></button>
        </div>
    )
}

export default Modal;