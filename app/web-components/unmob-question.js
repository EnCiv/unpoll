'use strict';

import React, {useRef,useState} from "react"

export default function Home(props){
    const topic1=useRef(null)
    const topic2=useRef()
    const question1=useRef(null)
    const question2=useRef(null)
    const [errMsg,setErrMsg]=useState('')
    const {subject, description, user}=props
   const submit=()=>{
        const t1={
            parentId: props._id,
            subject: "Topic of "+subject,
            description: topic1.current.value
        }
        socket.emit('create-topic',t1,newTopic1=>{
            if(!newTopic1) return setErrMsg('error creating topic 1')
            const q1={
                parentId: newTopic1._id,
                subject: "Question of "+newTopic1.description,
                description: question1.current.value
            }
            socket.emit('create-question',q1,newQuestion1=>setErrMsg('question1 succeeded'))
        })
        const t2={
            parentId: props._id,
            subject: "Topic of "+subject,
            description: topic2.current.value
        }
        socket.emit('create-topic',t2,newTopic2=>{
            if(!newTopic2) return setErrMsg('error creating topic 2')
            const q2={
                parentId: newTopic2._id,
                subject: "Question of "+newTopic2.description,
                description: question2.current.value
            }
            socket.emit('create-question',q2,newQuestion1=>setErrMsg('question 2 succeeded'))
        })
    }
    if(!user)
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <div style={{textAlign: 'center'}}>{subject}</div>
                <div style={{textAlign: 'center'}}>{description}</div>
                <div style={{textAlign: 'center'}}>You must <a href="/join">join</a> to do this</div>
            </div>
        )
    else
    return (
    <div style={{width: '100vw', height: '100vh'}}>
        <div style={{textAlign: 'center'}}>{subject}</div>
        <div style={{textAlign: 'center'}}>{description}</div>
        <div style={{textAlign: 'center'}}>Topic 1<input ref={topic1}/></div>
        <div style={{textAlign: 'center'}}>Question 1<input ref={question1}/></div>
        <div style={{textAlign: 'center'}}>Topic 2<input ref={topic2}/></div>
        <div style={{textAlign: 'center'}}>Question 2<input ref={question2}/></div>
        <div style={{textAlign: 'center'}}><button onClick={submit}>Submit</button></div>
        {errMsg && <div style={{color: 'red',textAlign: 'center'}}>{errMsg}</div>}
    </div>
    )
}