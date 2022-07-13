import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <div className="headerContainer">
                    <h1>lets get quizzical</h1>
                    <div className="buttonContainer">
                        <Link className="gameButton" to="/newgame">New Game</Link>
                        <Link className="gameButton" to="/savedgames">Saved Games</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;