import style from './style.module.css';
import ArrowDown from '../../images/arrow_down.png';
import {useState} from "react";

const CategoryOption = ( {show, setShow, section, setSection} ) => {

    const handleClick = ( e ) => {
        e.stopPropagation();
        setShow(!show);
        setSection(e.target.getAttribute('value'));
        // console.log(section);
    }
    return (
        <div className={`${style.box}`}>
            <div 
                className={`${style.selectItem}`} 
                value={'silver'}
                disabled={section === "silver" ? true : false}
                onClick={(e) => handleClick(e)}>
                Silver
            </div>
            <div 
                className={`${style.selectItem}`} 
                value={'gold'}
                disabled={section === "gold" ? true : false}
                onClick={(e) => handleClick(e)}>
                Gold
            </div>
            <div 
                className={`${style.selectItem}`} 
                value={'platinum'}
                disabled={section === "platinum" ? true : false}
                onClick={(e) => handleClick(e)}>
                Platinum
            </div>
            <div 
                className={`${style.selectItem}`} 
                value={'vip'}
                disabled={section === "vip" ? true : false}
                onClick={(e) => handleClick(e)}>
                Vip
            </div>
            <div 
                className={`${style.selectItem}`}
                value={'supervip'}
                disabled={section === "supervip" ? true : false}
                onClick={(e) => handleClick(e)}>
                Supervip
            </div>
        </div>
    )
  }
  const TypeOptions = ( {section, setSection}) => {
    const [show, setShow] = useState(false);
  
    return (
        <div className={`${style.height} options`}>
            <div className={`${style.selectBox}`} onClick={() => setShow(!show)} >
                <div>
                {section ? section.charAt(0).toUpperCase() + section.slice(1) : "Chọn loại vé"}
                </div>
                <div>
                    <img src={ArrowDown} />
                </div>
            </div>
            {show && (<CategoryOption show={show} setShow={setShow} section={section} setSection={setSection}/>) }
        </div>
    )
  }

  export default TypeOptions;