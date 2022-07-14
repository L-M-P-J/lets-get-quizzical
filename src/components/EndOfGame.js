import { Link } from 'react-router-dom';

const EndOfGame = (props) => {
    const { score, resultsData } = props;
    return (
        <div className="endContainer">
            <p>Quizzical Is Over!</p> 
            <div className="endText">
                <p>Your final score is:</p>
                <p>{score} out of {resultsData.gameData.length}</p>
                <p>Thanks for playing!</p>
                <Link to="/"><button className="currentGameButton">New Game</button></Link>
            </div>
        </div>
    )
}

export default EndOfGame;
