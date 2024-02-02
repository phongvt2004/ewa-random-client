import style from './style.module.css';

const Layer = ({setDisplay}) => {
    return (
    <div className={style.layer} onClick={() => setDisplay(false)}>
    </div>
    )
} 

export default Layer;