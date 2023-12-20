import { useState, useEffect } from "react";

import BardDesktopImg from "../assets/pattern-divider-desktop.svg";
import BardMobileImg from "../assets/pattern-divider-mobile.svg";
import DiceImg from "../assets/icon-dice.svg";

function Card() {
    const [advice, setAdvice] = useState("If you're going bald, don't comb your hair over your bald patch.");
    const [idAdvice, setIdAdvice] = useState("139");
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const url:string = "https://api.adviceslip.com/advice";

    const handleClick = async () => {
        try{
            const res = await fetch(url)
            const data = await res.json()
            setAdvice(data.slip.advice);
            setIdAdvice(data.slip.id);
        }catch(error){
            console.error("Error al obtener los consejos: ",error);
        }
    }

  return (
    <div id="main-card">
        <p>ADVICE #{idAdvice}</p>
        <h1>"{advice}"</h1>
        <img src={isSmallScreen ? BardMobileImg : BardDesktopImg} id="BardImg"/>
        <button onClick={handleClick}><img src={DiceImg}/></button>
    </div>
  )
}

export default Card