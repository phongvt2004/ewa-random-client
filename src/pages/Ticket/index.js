import style from './style.module.css';
import axios from 'axios'
import {useState, useEffect, useRef} from "react";
import ticketHeading from "../../images/ticketHeading.png";
import congratulation from "../../images/congratulation.png";
import TicketDetail from './TicketDetail';
import { SERVER } from '../../helper/constant';

const InputBox = ({phoneNumber, setPhoneNumber, getCustomer}) => {
    
    return (
        <div className={style.inputBox}>
            <div className={style.boxText} >SDT</div>
            <input type="text" className={style.input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <button className={style.submit} onClick={getCustomer}>TRA CỨU</button>
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
            {customer && <TicketDetail/>}
        
    </div>
    )
}

export default Ticket;