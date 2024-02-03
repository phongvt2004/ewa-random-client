import style from "./style.module.css";
import {useState} from "react";
import ArrowDown from '../../images/arrow_down.png';
import {SERVER} from "../../helper/constant"
import axios from "axios"
import Layer from "../../components/Layer"
import Message from "../../components/Message";

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
    const [type, setType] = useState("silver");
    const [display, setDisplay] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const createCustomer = () => {
        let data = {
            name,
            phoneNumber,
            code,
            type
        }
        data.time = new Date();
        if(document.getElementById("online").checked) data.online = true;
        else if(document.getElementById("offline").checked) data.online = false;
        axios.post(`${SERVER}/v1/customer/create`, data)
        .then(response => response.data)
        .then(data => {
            if(data?.code === 500) {
                setMessage(data?.message)
                setMessageType("error")
                setDisplay(true);
            }
            else {
                setMessage("Success")
                setMessageType("info")
                setDisplay(true);
            }

        })
    }

    return (
        <div className={style.insertWrapper}>
            <div className={style.insertBox} onKeyDown={(e) => console.log(e.key)}>
                <div className={style.insert}>
                    <div className={style.heading}>Họ và tên</div>
                    <input type="text" className={style.input} value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className={style.insert}>
                    <div className={style.heading}>Số điện thoại</div>
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
                        <input className={style.radio} type="radio" name="buyType" id="online" defaultChecked/> <label htmlFor="online">Online</label>
                        <input className={style.radio} type="radio" name="buyType" id="offline"/> <label htmlFor="offline">Offline</label>
                    </div>
                </div>
                <button className={style.submit}>Thêm</button>
            </div>
            {display && <Layer setDisplay={setDisplay}/>}
            {display &&  <Message type={messageType} message={message} setDisplay={setDisplay}/>}
        </div>
    )
}

export default Insert;