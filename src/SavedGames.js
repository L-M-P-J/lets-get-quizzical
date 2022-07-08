import {Link} from 'react-router-dom';

const GameList = () => {
    return (
        <ul>
            <li>one game</li>

            <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
        </ul>
    )
}

export default GameList;