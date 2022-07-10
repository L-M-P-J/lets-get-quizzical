import { Link } from 'react-router-dom';


const EndOfGame = (props) => {

    const { score, resultsData } = props;
    return (
        <div>
        <p>Your funal score is:</p>
        <p>{score}/{resultsData.gameData.length}</p>
        <Link to="/"><i className="fa-solid fa-arrow-left"></i>Make a new game</Link>
        </div>
    )
}

export default EndOfGame;


//whe user submits last question, show endOfGame component
//if resultsData.length - 1 ==== currentQuestion, show endGame; else, return to next question

//put a last item (button maybe - in a dif handleSubmit) to let the user that they are in the last question "SHOW MY SCORE"
    //delete next button in the last question
    //put ternary around buttons to determine when they have to show 

