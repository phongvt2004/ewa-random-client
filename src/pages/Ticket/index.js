import style from './style.module.css';
import axios from 'axios'
import {useState, useEffect, useRef} from "react";
import ticketHeading from "../../images/ticketHeading.png";
import congratulation from "../../images/congratulation.png";
import sdt from "../../images/sdt.png";
import tracuu from "../../images/tracuu.png";
import TicketDetail from './TicketDetail';
import { SERVER } from '../../helper/constant';
import Loading from '../../components/Loading';

const InputBox = ({phoneNumber, setPhoneNumber, getCustomer}) => {
    
    return (
        <div className={style.inputBox}>
            <img className={style.boxText} src={sdt} />
            <input type="text" className={style.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <div className={style.submit} onClick={getCustomer}>
                <img src={tracuu} onClick={(e) => {
                    console.log(e.target)
                    e.stopPropagation()
                    e.preventDefault()
                    }}/>
            </div>
        </div> 
    )
}

const Ticket = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [customer, setCustomer] = useState(null)
    console.log(customer)

    const getCustomer = () => {
        
        axios.get(`${SERVER}/v1/customer/get/phone`, {
            params: { phoneNumber: phoneNumber },
        })
        .then(response => response.data)
        .then(data => {
            if(data?.code === 404) alert("Not Found")
            else setCustomer(data)
        })
    }

    return (
    <div className={style.ticketContainer}>
        <img src={customer ? congratulation : ticketHeading} className={style.heading}></img>
            {!customer && <InputBox phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} getCustomer={getCustomer}/>}
            {customer && <TicketDetail customers={customer}/>}
            <Loading />
        
    </div>
    )
}

export default Ticket;