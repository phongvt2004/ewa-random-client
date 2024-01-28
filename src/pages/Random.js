import style from './style.module.css';
import ArrowDown from '../images/arrow_down.png';
import heading from "../images/6.png"
import silverHeading from "../images/7.png"
import platinumHeading from "../images/1.png"
import goldHeading from "../images/2.png"
import vipHeading from "../images/3.png"
import supervipHeading from "../images/4.png"
import logo from "../images/8.png"
import {useState, useEffect, useRef} from "react";

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
const Options = ( {section, setSection}) => {
  const [show, setShow] = useState(false);

  return (
      <div className={`${style.height} options`}>
          <div className={`${style.selectBox}`} onClick={() => setShow(!show)} >
              <div>
                  {section || "Chọn loại vé"} 
              </div>
              <div>
                  <img src={ArrowDown} />
              </div>
          </div>
          {show && (<CategoryOption show={show} setShow={setShow} section={section} setSection={setSection}/>) }
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
  const ROLLTIME = 4000;
  const STOP_PER_NUMBER = 3000;
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
  const random = async () => {
    let rollList = [number1, number2, number3, number4, number5, number6];
    let rollValue = [null, null, null, null, null, null];
    await rolling(ROLLTIME, rollList, rollValue);
    for(let i = 0; i < rollList.length; i++) {
      let pos = i;
      rollValue[pos] = Math.floor(Math.random() * 10);
      console.log(rollValue)
      await rollingUntilValue(pos, rollList, rollValue);
      if(i === rollList.length-1) break;
      await rolling(i === rollList.length-2 ? STOP_PER_NUMBER + 2000 : STOP_PER_NUMBER, rollList, rollValue);
    }

  }
  return (
    <div className="App">
      <Options section={section} setSection={setSection}/>
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
      <div className="button" onClick={random}><div>Quay</div></div>
    </div>
  );
}

export default Random;