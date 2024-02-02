import style from './style.module.css';
import axios from 'axios'
import heading from "../../images/6.png"
import silverHeading from "../../images/7.png"
import platinumHeading from "../../images/1.png"
import goldHeading from "../../images/2.png"
import vipHeading from "../../images/3.png"
import supervipHeading from "../../images/4.png"
import Layer from "../../components/Layer"
import PopUp from "../../components/PopUp"
import logo from "../../images/LOGO.png"

import clapEffect from "../../sound/clap.mp3"
import randomSoundEffect from "../../sound/random.mp3"
import stopSoundEffect from "../../sound/stop.mp3"
import useSound from 'use-sound';

import {useState, useEffect, useRef} from "react";
import { SERVER } from '../../helper/constant';
import TypeOptions from '../../components/TypeOptions';
import RoundOptions from '../../components/RoundOptions';
import { Fireworks } from '@fireworks-js/react'

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const getRandomNumbers = (array) => {
  console.log(array)
  let shuffled_array = shuffle(array);
  let result = shuffled_array[Math.floor(Math.random() * shuffled_array.length)]
  result.digits = []
  for(let i in result.code) {
    result.digits[i] = Number(result.code[i])
  }
  return result
}

const WinnerMessage = ({name, code}) => {
  return (
    <div className={style.message}>
      <p className={style.messageBlock}>
        Xin chúc mừng quý khách <span>{name}</span>  
      </p>
      <p className={style.messageBlock}>
        Có mã số <span>{code}</span> đã trúng thưởng
      </p>
    </div>
  )
}

function Random() {
  const colorCode = {
    silver: "#e4c378",
    gold: "#eda2bf",
    platinum: "#1e3f1f",
    vip: "navy",
    supervip: "#272727",
  }
  const headingCode = {
    silver: silverHeading  ,
    gold: goldHeading  ,
    platinum: platinumHeading  ,
    vip: vipHeading ,
    supervip: supervipHeading  ,
  }
  let number1 = useRef(null);
  let number2 = useRef(null);
  let number3 = useRef(null);
  let number4 = useRef(null);
  let number5 = useRef(null);
  let number6 = useRef(null);
  
  const [section, setSection] = useState("silver")
  const [customerArr, setCustomerArr] = useState([])
  const [winner, setWinner] = useState(null)
  const [display, setDisplay] = useState(false)
  const [round, setRound] = useState(1)
  const [roundNumber, setRoundNumber] = useState(1)
  const [clap, exposedClap] = useSound(clapEffect, {
    volume: 0.7,
  });
  const [randomSound,  exposedRandom] = useSound(randomSoundEffect);
  const [stopSound, exposedStop] = useSound(stopSoundEffect);

  const rollBtn = useRef(null)
  const fireworkRef = useRef(null)
  useEffect(() => {
    if(display === false && winner !== null) {
      setWinner(null)
      exposedClap.stop();
    }
    if(display === true && winner !== null) clap();
  }, [display])
  useEffect(() => {
    let api = section === "vip" ? `${SERVER}/v1/customer/get/type` : `${SERVER}/v1/customer/get/type/buytype`
    let params = {
      type: section
    }

    if(section === "silver") {
      if(round === 1) params.online = true
      else params.online = false
    } else if (section === "gold") params.online = false
    else if (section === "platinum") {
      if(round <=2) params.online = false
      else params.online = true
    } else if(section === "supervip") params.online = false

    axios.get(api, {
        params: params
    })
    .then(response => response.data)
    .then((data) => {
      console.log(data)
      setCustomerArr(data)
    })
},[section, round])
  const ROLLTIME = 1000;
  const STOP_PER_NUMBER = 1000;
  const delay = async function(delayInms) {
    for(let i = 0; i < 10; i++) {
        return new Promise(resolve => setTimeout(resolve, delayInms));
    }
}

  const rolling = async (stop, rollList, rollValue) => {
    console.log(stop)
    let time = 0;
    while (true) {
      if(time >= stop) break; 
      for(let j = 0; j < 9; j++) {
        for(let i in rollList) {
          if(rollValue[i] !== null) continue;
          let currentNumber = Number(rollList[i].current.textContent);
          rollList[i].current.textContent = currentNumber < 9 ? currentNumber + 1 : 0;
        }
        await delay(50);
      }
      time += 500;
    }
  }
  const rollingUntilValue = async (pos, rollList, rollValue) => {
    while (true) {
      for(let j = 0; j < 9; j++) {
        if(rollValue[pos] === Number(rollList[pos].current.textContent)) return;
        for(let i in rollList) {
          if(rollValue[i] === Number(rollList[i].current.textContent)) continue;
          let currentNumber = Number(rollList[i].current.textContent);
          rollList[i].current.textContent = currentNumber < 9 ? currentNumber + 1 : 0;
        }
        await delay(50);
      }
    }
  }
  useEffect(() => {
    if(display && fireworkRef) fireworkRef.current?.start();
    else if(fireworkRef) fireworkRef.current?.stop();
  })
  const random = async () => {
    rollBtn.current.setAttribute("disabled", true)

    let rollList = [number1, number2, number3, number4, number5, number6];
    let winner;
    console.log(customerArr)
    if(customerArr.length === 0) {
      alert("There are no customers left!")
      rollBtn.current.removeAttribute("disabled")
      return;
    } else if(customerArr.length === 1) {
      winner = customerArr[0]
      winner.digits = []
      for(let i in winner.code) {
        winner.digits[i] = Number(winner.code[i])
      }
    } else winner = getRandomNumbers(customerArr);
    console.log(winner.digits);
    let rollValue = [null, null, null, null, null, null];
    randomSound();
    await rolling(ROLLTIME, rollList, rollValue);
    for(let i = 0; i < rollList.length; i++) {
      let pos = i;
      rollValue[pos] = winner.digits[i];
      console.log(rollValue)
      await rollingUntilValue(pos, rollList, rollValue);
      stopSound();
      if(i === rollList.length-1) break;
      await rolling(STOP_PER_NUMBER + i*1000, rollList, rollValue);
    }
    exposedRandom.stop();
    rollBtn.current.removeAttribute("disabled")
    setCustomerArr(customerArr.filter(customer => customer._id !== winner._id));
    setWinner(winner);
    setDisplay(true);
  }

  useEffect(() => {
    setRound(1);
    switch(section) {
      case "platinum":
        setRoundNumber(3);
        break;
      case "supervip":
        setRoundNumber(1);
        break;
      case "gold":
      case "silver":
      case "vip":
        setRoundNumber(2);
        break;
    }
  }, [section]);

  return (
    <div className="App">
      <TypeOptions section={section} setSection={setSection}/>
      <RoundOptions round={round} setRound={setRound} roundNumber={roundNumber}/>
      <img src={logo} alt="Logo" className="logo"/>
      <img src={heading} alt="Heading" className="heading"/>
      <img src={headingCode[section]} alt="Logo" className="silverHeading"/>
      <div className="wrapper">
        <div className="box"><p style={{color: colorCode[section]}} ref={number1}>0</p></div>
        <div className="box"><p style={{color: colorCode[section]}} ref={number2}>0</p></div>
        <div className="box"><p style={{color: colorCode[section]}} ref={number3}>0</p></div>
        <div className="box"><p style={{color: colorCode[section]}} ref={number4}>0</p></div>
        <div className="box"><p style={{color: colorCode[section]}} ref={number5}>0</p></div>
        <div className="box"><p style={{color: colorCode[section]}} ref={number6}>0</p></div>
      </div>
      <div className="button" ref={rollBtn} onClick={random}>
        <div>Quay</div>
        </div>
      {display && <Layer setDisplay={setDisplay}/>}
      {display && <PopUp Message = {WinnerMessage} name={winner.name} code = {winner.code} setDisplay={setDisplay}/>}
      {display && <Fireworks
        ref={fireworkRef}
        options={{ opacity: 1, explosion: 10,}}
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'fixed',
          background: '#000',
          zIndex: 9,
          opacity: 0.7
        }}
      />}
    </div>
  );
}

export default Random;