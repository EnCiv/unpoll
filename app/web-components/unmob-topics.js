'use strict'

import React, { useRef, useState, useEffect } from 'react'

export default function UnmobTopics(props) {
  const { user, subject, description } = props
  if (!user)
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>{subject}</div>
        <div style={{ textAlign: 'center' }}>{description}</div>
        <div style={{ textAlign: 'center' }}>
          You must <a href="/join">join</a> to do this
        </div>
      </div>
    )

  const [topicBins, setTopicBins] = useState([])
  const [selectedTopics, setSelectedTopics] = useState({})
  const [leadTopic, setLeadTopic] = useState('')
  useEffect(() => {
    if (typeof socket !== 'undefined')
      socket.emit('get-topics-in-bins-and-questions', props.unmobQuestion, 0, setTopicBins)
  }, [])
  const associateTopics = () => {
    const round = 0 // in future round should increment
    const leadTopicBin = topicBins.find(topicBin => topicBin.leadTopicObj.description === leadTopic)
    let topicIds = [leadTopicBin.leadTopicObj._id]
    topicBins.reduce((arr, bin) => {
      if (bin.leadTopicObj.description === leadTopic) return arr
      else if (selectedTopics[bin.leadTopicObj.description]) {
        arr.push(bin.leadTopicObj._id)
        return arr
      } else return arr
    }, topicIds)
    socket.emit('associate-topics', round, topicIds, () => console.info('associated', round, topicIds))
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>{subject}</div>
      <div style={{ textAlign: 'center' }}>{description}</div>
      <div
        style={{
          textAlign: 'center',
          width: '30em',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {topicBins.length &&
          topicBins.map(topicBin => (
            <div
              onDoubleClick={() => {
                let newLeadTopic =
                  leadTopic === topicBin.leadTopicObj.description ? '' : topicBin.leadTopicObj.description
                if (newLeadTopic && !selectedTopics[newLeadTopic])
                  // if it's not selected, select it
                  setSelectedTopics({ ...selectedTopics, [newLeadTopic]: true })
                setLeadTopic(newLeadTopic)
              }}
              onClick={() => {
                setSelectedTopics({
                  ...selectedTopics,
                  [topicBin.leadTopicObj.description]: !selectedTopics[topicBin.leadTopicObj.description],
                })
              }}
              style={{
                textAlign: 'center',
                border: '1px solid black',
                margin: '.1em',
                background:
                  leadTopic === topicBin.leadTopicObj.description
                    ? 'orange'
                    : selectedTopics[topicBin.leadTopicObj.description]
                    ? 'grey'
                    : 'white',
              }}
            >
              {topicBin.leadTopicObj.description}
            </div>
          ))}
        <div style={{ textAlign: 'center', padding: '.5em' }}>click on topics to associate similar topics</div>
        <div style={{ textAlign: 'center', padding: '.5em' }}>
          double click on a topic to make it the lead of a group
        </div>
        <div style={{ textAlign: 'center', padding: '.5em' }}>
          <button disabled={!leadTopic || !Object.keys(selectedTopics).length} onClick={associateTopics}>
            Group Topics
          </button>
        </div>
      </div>
    </div>
  )
}
