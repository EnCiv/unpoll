'use strict';

import React, {useRef,useState, useEffect} from "react"

export default function UnmobTopics(props){
    const {user,subject,description}=props;
    if(!user)
        return (
            <div style={{width: '100vw', height: '100vh'}}>
                <div style={{textAlign: 'center'}}>{subject}</div>
                <div style={{textAlign: 'center'}}>{description}</div>
                <div style={{textAlign: 'center'}}>You must <a href="/join">join</a> to do this</div>
            </div>
        )

    const [topicBins,setTopicBins]=useState([])
    const [selectedTopics,setSelectedTopics]=useState({})
    useEffect(()=>{
        if(typeof socket!=='undefined')
        socket.emit('get-topics-in-bins-and-questions',props.unmobQuestion,0,setTopicBins)
    },[])

    return (
    <div style={{width: '100vw', height: '100vh'}}>
        <div style={{textAlign: 'center'}}>{subject}</div>
        <div style={{textAlign: 'center'}}>{description}</div>
        <div style={{textAlign: 'center', width: '30em', marginLeft: 'auto', marginRight: 'auto'}}>
            {topicBins.length && topicBins.map(topicBin=><div onClick={()=>{setSelectedTopics({...selectedTopics,[topicBin.leadTopicObj.description]: !selectedTopics[topicBin.leadTopicObj.description]})}}style={{textAlign: 'center', border: '1px solid black', margin: '.1em', background: selectedTopics[topicBin.leadTopicObj.description]?'grey':'white'}}>{topicBin.leadTopicObj.description}</div>)}
        </div>
    </div>
    )
}