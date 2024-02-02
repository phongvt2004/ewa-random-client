import style from './style.module.css';
import { SERVER } from '../../helper/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loading = () => {
    return <FontAwesomeIcon icon={faSpinner} className={style.loading}/>
} 

export default Loading;