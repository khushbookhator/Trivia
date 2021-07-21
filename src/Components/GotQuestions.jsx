import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Landing.module.css"
import correct from "../Audio/correct.mp3"
import wrong from "../Audio/wrong.mp3"
import useSound from "use-sound"
import happydany from "../Audio/happydany.gif"
import sadsansa from "../Audio/sadsansa.gif"
import welldonegot from "../Audio/welldonegot.gif"
import { Link } from 'react-router-dom';
import { getGotQues } from "../Redux/Got/Action"


function GotQuestions() {
    const [rightans] = useSound(correct, { volume: 0.25 })
    const [wrongans] = useSound(wrong, { volume: 0.25 })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGotQues())
    },[dispatch])

    const got = useSelector(state => state.got.got)
    const randomQuestion = Math.floor(Math.random()*31)

    const [currentQ, setCurrentQ] = useState(randomQuestion)
    const [score, setScore] =  useState(0)
    const [end, setEnd] = useState(false)
    const [count, setCount] = useState(1)
    const [start, setStart] = useState(true)
    const [disable, setDisable] = useState(false)
    const [timer, setTimer] = useState(30)

    const x = useRef()
    const startTimer=()=> {
        setStart(false)
        x.current = setInterval(() => {
            setTimer(prev => prev-1)
            // timesound()
        },1000)
        if(timer <=0){
            alert("Oops! Times up")
            setEnd(true)
        }
    }
    useEffect(() => {
        if(timer === 0) {
            clearInterval(x.current)
            setEnd(true)
        }
    },[timer])



    const handleAnswerOptionClick = (isCorrect, options) => {
        setDisable(true)
		if (isCorrect) {
			setScore(score + 1);
            document.getElementById(options).style.background ="green"
            document.getElementById(options).style.color ="white"
            rightans()
		}
        else {
            document.getElementById(options).style.background="red"
            document.getElementById(options).style.color ="white"
            wrongans()
        }
        setTimeout(() => {
            setCount(count+1)
        },1000)
		const nextQuestion = Math.floor(Math.random()*31)
		if (count < 10) {
            setTimeout(() => {
                document.getElementById(options).style.background="rgb(21,55,91)"
                document.getElementById(options).style.color ="white"
                setCurrentQ(nextQuestion);
                setDisable(false)
            },1000)
		} else { 
            setTimeout(() => {
                setEnd(true);
            },1000)
		}
	};

    return end ? (
    <div className={styles.gotouter}>
        <div className={styles.gotleaderboard}>
            <h2>You scored <span style={{
                color:"white"
            }}>{score}</span> out of <span style={{
                color:"white"
            }}>10</span></h2>
            <br/>
            <div>
                {
                    score < 5 ? (
                        <div>
                            <div className={styles.gifs}>
                            <img alt="t" src={sadsansa} width="100%" height="100%"/></div>
                            <br/>
                            <p>Well, better luck next time</p>
                        </div>
                    ) : score < 8 ? (
                        <div>
                            <div className={styles.gifs}>
                            <img src={happydany} width="100%" height="100%" alt="t"/></div>
                            <br/>
                            <p>Well, Thats a good score</p>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.gifs}>
                            <img alt="t" src={welldonegot} width="100%" height="100%"/></div>
                            <br/>
                            <p>Well done!</p>
                        </div>
                    )
                }
            </div>
            <div>
                <Link to="/">
                    <button className={styles.gotplayagain}>PLAY AGAIN</button>
                </Link>
            </div>
        </div>
    </div>) : start ? (
        <div style={{
            minHeight:"100vh",
            background: "url(https://c4.wallpaperflare.com/wallpaper/948/971/600/valar-morghulis-game-of-thrones-wallpaper-preview.jpg)",
            backgroundSize: "100% 100%",
            textAlign:"center"
        }}>
            <button className={styles.valarbutton}
                onClick={startTimer}
            >VALAR DOHAERIS</button>
        </div>
    ) : (
        <div className={styles.gotouter}>
            <div className={styles.gotmiddlebox}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <h3>Question {count} / 10</h3>
                    <h3>Time: {timer} secs</h3>
                </div>
                <br/><br/>
                <div className={styles.quesans}>
                    <div className={styles.gotques}>
                        <h2>{got[currentQ]?.question}</h2>
                    </div>
                    <br/><br/>
                    <div>
                        {got[currentQ]?.answer.map((answer) => (
                            <button disabled={disable} className={styles.gotoptiontabs} id={answer.options} onClick={() => handleAnswerOptionClick(answer.isCorrect, answer.options)}>{answer.options}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {GotQuestions}