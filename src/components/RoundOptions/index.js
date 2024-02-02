import style from './style.module.css';
import ArrowDown from '../../images/arrow_down.png';
import {useState} from "react";

const CategoryOption = ( {show, setShow, round, setRound, roundNumber} ) => {
    let roundList = [];
    for(let i = 0; i < roundNumber; i++) {
        roundList.push(i+1);
    }
    const handleClick = ( e ) => {
        e.stopPropagation();
        setShow(!show);
        setRound(Number(e.target.getAttribute('value')));
        // console.log(round);
    }
    return (
        <div className={`${style.box}`}>
            {roundList.map(roundNum => (
                <div 
                    className={`${style.selectItem}`} 
                    value={roundNum}
                    disabled={round === roundNum ? true : false}
                    onClick={(e) => handleClick(e)}>
                    Vòng {roundNum}
                </div>
            ))}
        </div>
    )
  }
  const RoundOptions = ( {round, setRound, roundNumber = 1}) => {
    const [show, setShow] = useState(false);
  
    return (
        <div className={`${style.height} options`}>
            <div className={`${style.selectBox}`} onClick={() => setShow(!show)} >
                <div>
                    {round ? `Vòng ${round}`: "Chọn vòng"} 
                </div>
                <div>
                    <img src={ArrowDown} />
                </div>
            </div>
            {show && (<CategoryOption show={show} setShow={setShow} round={round} setRound={setRound} roundNumber={roundNumber}/>) }
        </div>
    )
  }

  export default RoundOptions;