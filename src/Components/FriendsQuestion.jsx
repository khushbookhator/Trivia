import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFriendsQues } from "../Redux/Friends/Action"
import styles from "./Landing.module.css"
import friendsdoor from "../Images/friendsdoor.jpeg"
import correct from "../Audio/correct.mp3"
import wrong from "../Audio/wrong.mp3"
import useSound from "use-sound"
import happyrach from "../Audio/happyrach.gif"
import sadjoey from "../Audio/sadjoey.gif"
import happychan from "../Audio/happychan.gif"
import { Link } from 'react-router-dom'


function FriendsQuestions() {
    const [rightans] = useSound(correct, { volume: 0.25 })
    const [wrongans] = useSound(wrong, { volume: 0.25 })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriendsQues())
    },[dispatch])

    const friends = useSelector(state => state.friends.friends)
    const randomQuestion = Math.floor(Math.random()*30)

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
            document.getElementById(options).style.background ="rgb(33,48,6)"
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
		const nextQuestion = Math.floor(Math.random()*30)
		if (count < 10 && timer > 0) {
            setTimeout(() => {
                document.getElementById(options).style.background="rgb(247,246,236)"
                document.getElementById(options).style.color ="rgb(132,30,26)"
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
    <div className={styles.outer}>
        <div className={styles.leaderboard}>
            <h2>You scored <span style={{
                color:"yellow"
            }}>{score}</span> out of <span style={{
                color:"yellow"
            }}>10</span></h2>
            <br/>
            <div>
                {
                    score < 5 ? (
                        <div>
                            <div className={styles.gifs}>
                            <img alt="t" src={sadjoey} width="100%" height="100%"/></div>
                            <br/>
                            <p>Well, better luck next time</p>
                        </div>
                    ) : score < 8 ? (
                        <div>
                            <div className={styles.gifs}>
                            <img alt="t" src={happyrach} width="100%" height="100%"/></div>
                            <br/>
                            <p>Well, Thats a good score</p>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.gifs}>
                            <img src={happychan} width="100%" height="100%" alt="t"/></div>
                            <br/>
                            <p>Could it be any better?</p>
                        </div>
                    )
                }
            </div>
            <div>
                <Link to="/">
                    <button className={styles.playagain}>PLAY AGAIN</button>
                </Link>
            </div>
        </div>
    </div>) : start ? (
        <div style={{
            background:"rgb(180,163,195)",
            minHeight:"100vh"
        }}> <br/>
            <div className={styles.doordiv}>
                <img className={styles.door} style={{
                    maxWidth:"100%",
                    maxHeight:"96vh"
                }} src={friendsdoor} alt="purpledoor"/>
            </div>
            <div style={{
                marginTop:"-18.8%",
                width:"100%",
                textAlign:"center"
            }}>
                <button onClick={startTimer} className={styles.startbutton}>START</button>
            </div>
        </div>
    ) : (
        <div className={styles.outer}>
            <div className={styles.middlebox}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <h3>Question {count} / 10</h3>
                    <h3>Time: {timer} secs</h3>
                </div>
                <br/><br/>
                <div className={styles.quesans}>
                    <div  className={styles.ques}>
                        <h2>{friends[currentQ]?.question}</h2>
                    </div>
                    <br/><br/>
                    <div>
                        {friends[currentQ]?.answer.map((answer) => (
                            <button disabled={disable} className={styles.optiontabs} id={answer.options} onClick={() => handleAnswerOptionClick(answer.isCorrect, answer.options)}>{answer.options}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {FriendsQuestions}