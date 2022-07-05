import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link className="gameButton" to="/newgame">New Game</Link>
            <Link className="gameButton" to="/savedgames">Saved Games</Link>
        </header>
    )
}

export default Header;