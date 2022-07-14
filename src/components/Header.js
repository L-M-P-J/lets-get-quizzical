import { Link } from "react-router-dom";
import { useEffect } from "react";

const Header = (props) => {

    const { updateVolume, setVolumeClicked, volumeClicked } = props;

    const handleVolumeClick = () => {
        setVolumeClicked(!volumeClicked);  
    }

    useEffect(()=> {
        updateVolume(volumeClicked);
    }, [volumeClicked, updateVolume]); 

    return (
        <header>
            <div className='wrapper'>
                <div className='headerContainer'>
                    <h1>lets get quizzical</h1>
                    <div className='buttonContainer'>
                        <Link className='gameButton' to='/newgame'>New Game</Link>
                        <Link className='gameButton' to='/savedgames'>Saved Games</Link>
                    </div>

                    {
                        volumeClicked 
                        ? <div aria-label='toggle volume off' onClick={handleVolumeClick}><i className='fa-solid fa-volume-xmark' aria-hidden='true'></i> <span className='sr-only'>Volume Off</span> </div> 
                        : <div aria-label='toggle volume on' onClick={handleVolumeClick}><i className='fa-solid fa-volume-high' aria-hidden='true'></i> <span className='sr-only'>Volume On</span> </div>
                    }
                    
                </div>
            </div>
        </header>
    )
}

export default Header;