import style from './style.module.css';
import { SERVER } from '../../helper/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faDownload } from '@fortawesome/free-solid-svg-icons'
import silver from "../../images/silver.png"
import gold from "../../images/gold.png"
import platinum from "../../images/platinum.png"
import vip from "../../images/vip.png"
import supervip from "../../images/supervip.png"
import axios from "axios"
import { useState } from 'react';

const ticketMap = {
    "silver": silver, 
    "gold": gold, 
    "platinum": platinum, 
    "vip": vip,
    "supervip": supervip, 
}

const TicketDetail = ({customers}) => {
    const [change, setChange] = useState(true)
    const [ticketFaces, setTicketFaces] = useState(customers.map(customer => true))
    const download = (phoneNumber, code, type) => {
        axios.post(`${SERVER}/v1/create-zip-file`, {
            phoneNumber,
            code,
            type
        })
        .then(response => response.data)
        .then(zipFileName => {
            console.log(zipFileName)
            let url = `${SERVER}/public/zip/${zipFileName}`
            document.getElementById('my_iframe').src = url;
        })
    }
    return (
    <div className={style.TicketDetail}> 
        {customers.map((customer, i) => {
            let imageName = customer.phoneNumber+"_"+customer.code+".png";
            let imageFront = `${SERVER}/public/ticket/${imageName}`;
            let imageBack = ticketMap[customer.type];
            let imagePath = ""
            if(ticketFaces[i]) {
                imagePath = imageFront;
            } else {
                imagePath = imageBack;
            }
        return (
            <div className={style.Ticket}>
                <img src={imagePath} className={style.ticketImg}></img>
                <div className={style.btn} >
                    <div className={style.parentBtn}>
                        <FontAwesomeIcon icon={faRetweet} className={style.icon}/>
                        <div className={style.text} onClick={() => {
                            ticketFaces[i] = !ticketFaces[i];
                            setTicketFaces(ticketFaces)
                            setChange(!change)
                        }}>{ticketFaces[i] ? "Mặt sau" : "Mặt trước"}</div>
                    </div>
                    <div className={style.parentBtn} onClick={() => download(customer.phoneNumber, customer.code, customer.type)}>
                        <FontAwesomeIcon icon={faDownload} className={style.icon}/>
                        <div className={style.text}>Tải về</div>
                        <iframe id="my_iframe" ></iframe>
                    </div>
                </div>
            </div>
        )})
        }
    </div>
    )
}

export default TicketDetail