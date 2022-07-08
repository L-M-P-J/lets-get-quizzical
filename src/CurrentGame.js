import {Link} from 'react-router-dom';
const CurrentGame = () => {
    return (
        <section>
            <p>I am the current game!</p>
            {/* radio buttons */}
            <form action="">
                    <fieldset>
                        <legend></legend>
                    </fieldset>
            </form>
            <Link to="/"><i className="fa-solid fa-arrow-left"></i></Link>
        </section>
    )
}

export default CurrentGame;