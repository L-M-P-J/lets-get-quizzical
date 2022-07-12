import { Link } from 'react-router-dom';
// import uuid from 'react-uuid';

const EndOfGame = (props) => {
    const { score, resultsData } = props;
    console.log(resultsData.gameData);
    return (
        <div className="endContainer">
            <p>Quizzical Is Over!</p> 

            <div className="endText">
                <p>Your final score is:</p>
                <p>{score} out of {resultsData.gameData.length}</p>

                <p>Thanks for playing!</p>
                {/* <Link to="/"><i className="fa-solid fa-arrow-left"></i>New game</Link> */}

                <Link to="/"><button className="currentGameButton">New Game</button></Link>

            </div>
            {/* {
                resultsData.gameData.map( (item) => {
                    console.log(item.question.correct_answer);
                    return  <div key={uuid()}>
                                <p>{decodeText(item.question)}</p>
                                <p>Answer: {decodeText(item.correct_answer)}</p>
                            </div>
                })
            } */}
        </div>
    )
}

export default EndOfGame;


//whe user submits last question, show endOfGame component
//if resultsData.length - 1 ==== currentQuestion, show endGame; else, return to next question

//put a last item (button maybe - in a dif handleSubmit) to let the user that they are in the last question "SHOW MY SCORE"
    //delete next button in the last question
    //put ternary around buttons to determine when they have to show 

