import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Landing.module.css"
import correct from "../Audio/correct.mp3"
import wrong from "../Audio/wrong.mp3"
import useSound from "use-sound"
import { Link } from 'react-router-dom';
import { getHimQues } from "../Redux/Hiymym/Action"


function HimymQuestions() {
    const [rightans] = useSound(correct, { volume: 0.25 })
    const [wrongans] = useSound(wrong, { volume: 0.25 })

    const dispatch = useDispatch()

    
    const him = useSelector(state => state.him.him)
    useEffect(() => {
        dispatch(getHimQues())
    },[dispatch])
    const randomQuestion = Math.floor(Math.random()*29)
    

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
            // timesound()
            setTimer(prev => prev-1)
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
        if(end === true){
            clearInterval(x.current)
        }
    },[timer,end])

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
		const nextQuestion = Math.floor(Math.random()*29)
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
    <div className={styles.himymouter}>
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
                            <img src="https://thumbs.gfycat.com/CoolShadyBluebottlejellyfish-size_restricted.gif" width="100%" height="100%" alt="gif"/></div>
                            <br/>
                            <p>Well, better luck next time</p>
                        </div>
                    ) : score < 8 ? (
                        <div>
                            <div className={styles.gifs}>
                            <img src="https://i.gifer.com/7QeY.gif" width="100%" height="100%" alt="gif"/></div>
                            <br/>
                            <p>Well, Thats a good score</p>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.gifs}>
                            <img src="https://thumbs.gfycat.com/OrneryElatedGoldenretriever-max-1mb.gif" width="100%" height="100%" alt="gif"/></div>
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
            background: "url(https://wallpaperaccess.com/full/1782352.jpg)",
            backgroundSize: "100% 100%",
            textAlign:"center"
        }}>
            <button className={styles.himymbutton}
                onClick={startTimer}
            >LET'S START?</button>
        </div>
    ) : (
        <div className={styles.himymouter}>
            <div className={styles.himymmiddlebox}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <h3>Question {count} / 10</h3>
                    <h3>Time: {timer} secs</h3>
                </div>
                <br/><br/>
                <div className={styles.quesans}>
                    <div style={{
                        color:"white"
                    }}>
                        <h2>{him[currentQ]?.question}</h2>
                    </div>
                    <br/><br/>
                    <div>
                        {him[currentQ]?.answer.map((answer) => (
                            <button disabled={disable} className={styles.gotoptiontabs} id={answer.options} onClick={() => handleAnswerOptionClick(answer.isCorrect, answer.options)}>{answer.options}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {HimymQuestions}