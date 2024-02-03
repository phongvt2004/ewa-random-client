import style from "./style.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo,  faCircleXmark} from '@fortawesome/free-solid-svg-icons'
const Message = ({type, message, setDisplay}) => {
    return (
        <div className={style.messageBox}>
            <div className={style.message}>
                <div className={style.icon}>
                    <FontAwesomeIcon color={type ==="info" ? "aqua" : type === "error" ? "crimson" : ""} icon={type ==="info" ? faCircleInfo : type === "error" ? faCircleXmark : ""}  className={style.iconImg} />
                    <p>{type}</p>
                </div>
                <div className={style.messageText}>{message}</div>
                <button className={style.btn} onClick={() => setDisplay(false)} style={{backgroundColor: type ==="info" ? "aqua" : type === "error" ? "crimson" : ""}}>OK</button>
            </div>
        </div>
    )
}

export default Message;