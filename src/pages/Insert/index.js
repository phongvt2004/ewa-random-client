import style from "./style.module.css";
import {useState} from "react";
import ArrowDown from '../../images/arrow_down.png';

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
        <div className={`${style.options}`}>
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

const Insert = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [online, setOnline] = useState(true);
    const [type, setType] = useState("silver");
    return (
        <div className={style.insertWrapper}>
            <div className={style.insertBox}>
                <div className={style.insert}>
                    <div className={style.heading}>Họ và tên</div>
                    <input type="text" className={style.input} value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className={style.insert}>
                    <div className={style.heading}>Số diện thoại</div>
                    <input type="text" className={style.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                <div className={style.insert}>
                    <div className={style.heading}>Mã</div>
                    <input type="text" className={style.input} value={code} onChange={(e) => setCode(e.target.value)}></input>
                </div>
                <div className={`${style.insert} ${style.row}`}>
                    <div className={style.heading}>Loại vé</div>
                    <TypeOptions section={type} setSection={setType}/>
                </div>
                <div className={style.insert}>
                    <div className={style.heading}>Online hay offline</div>
                    <div className={style.input}>
                        <input type="radio" name="buyType" id="online" value={true} checked/> <label for="online">Online</label>
                        <input type="radio" name="buyType" id="offline" value={false}/> <label for="offline">Offline</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Insert;