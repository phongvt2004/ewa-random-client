import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const PopUp = ({ Message, name, code, setDisplay }) => {
    console.log(Message)
    return (
        <div className={style.popup}>
            <FontAwesomeIcon icon={faXmark} className={style.cancel} onClick={() => setDisplay(false)}/>
            <div className={style.message}>
                <Message name={name} code={code}/>
            </div>
        </div>
    )
}

export default PopUp;