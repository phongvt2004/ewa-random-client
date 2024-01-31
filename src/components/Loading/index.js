import style from './style.module.css';
import { SERVER } from '../../helper/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
    <div className={style.layer}>
        <FontAwesomeIcon icon={faSpinner} className={style.loading}/>
    </div>
} 

export default Loading;