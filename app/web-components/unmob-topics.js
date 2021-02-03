'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

import FlipMove from 'react-flip-move'

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

  const controlRef = useRef()
  const [topicBins, setTopicBins] = useState([])
  const [selectedTopics, setSelectedTopics] = useState({})
  const [leadTopic, setLeadTopic] = useState('')
  const [controlPanelHeight, setControlPanelHeight] = useState(0)
  useEffect(() => {
    if (typeof socket !== 'undefined')
      socket.emit('get-topics-in-bins-and-questions', props.unmobQuestion, 0, setTopicBins)
  }, [])
  useLayoutEffect(() => {
    setControlPanelHeight(controlRef.current.getBoundingClientRect().height)
  })
  function associateTopics() {
    const round = 0 // in future round should increment
    const leadTopicBin = topicBins.find(topicBin => topicBin.leadTopicObj.description === leadTopic)
    const leadTopicObj = leadTopicBin.leadTopicObj
    let questionObjs = leadTopicBin.questionObjs
    let topicIds = [leadTopicBin.leadTopicObj._id]
    let topic_bin = { leadTopicObj, topicObjs: [], questionObjs }
    let newTopicBins = [topic_bin]
    topicBins.forEach(bin => {
      if (bin.leadTopicObj.description === leadTopic) {
        return
      } else if (selectedTopics[bin.leadTopicObj.description]) {
        topic_bin.topicObjs.push(bin.leadTopicObj)
        topic_bin.topicObjs = topic_bin.topicObjs.concat(bin.topicObjs)
        topic_bin.questionObjs = topic_bin.questionObjs.concat(bin.questionObjs)
        topicIds.push(bin.leadTopicObj._id)
      } else newTopicBins.push(bin)
    })
    setTopicBins(newTopicBins)
    setSelectedTopics({})
    setLeadTopic('')
    socket.emit('associate-topics', round, topicIds, () => console.info('associated', round, topicIds))
  }
  function markTopicAsLead(topicBin, e) {
    let newLeadTopic = leadTopic === topicBin.leadTopicObj.description ? '' : topicBin.leadTopicObj.description
    if (newLeadTopic && !selectedTopics[newLeadTopic])
      // if it's not selected, select it
      setSelectedTopics({ ...selectedTopics, [newLeadTopic]: true })
    setLeadTopic(newLeadTopic)
  }
  function markTopicAsSelected(topicBin, e) {
    setSelectedTopics({
      ...selectedTopics,
      [topicBin.leadTopicObj.description]: !selectedTopics[topicBin.leadTopicObj.description],
    })
  }
  function sortTopics() {
    let leadTopicBins = []
    let selectedTopicBins = []
    let ordinaryTopicBins = []
    for (let i = 0; i < topicBins.length; i++) {
      if (topicBins[i].leadTopicObj.description === leadTopic) leadTopicBins.push(topicBins[i])
      else if (selectedTopics[topicBins[i].leadTopicObj.description]) selectedTopicBins.push(topicBins[i])
      else ordinaryTopicBins.push(topicBins[i])
    }
    return leadTopicBins.concat(selectedTopicBins).concat(ordinaryTopicBins)
  }
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ width: '48em', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', padding: 0 }}>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
        <div style={{ textAlign: 'center' }}>{subject}</div>
        <div style={{ textAlign: 'center' }}>{description}</div>
        <div
          style={{
            textAlign: 'center',
            width: '46em',
            padding: '1em',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: rootBackgroundColor,
          }}
        >
          {(topicBins.length && (
            <FlipMove>
              {sortTopics().map(topicBin => (
                <TopicBin
                  onDoubleClick={e => markTopicAsLead(topicBin, e)}
                  onClick={e => markTopicAsSelected(topicBin, e)}
                  shape={
                    leadTopic === topicBin.leadTopicObj.description
                      ? 'lead'
                      : selectedTopics[topicBin.leadTopicObj.description]
                      ? 'selected'
                      : ''
                  }
                  topicBin={topicBin}
                  key={topicBin.leadTopicObj._id}
                />
              ))}
            </FlipMove>
          )) ||
            'loading...'}
          <div style={{ height: controlPanelHeight }} key="scrollBlank" />
        </div>
        <TopicControlPanel
          leadTopic={leadTopic}
          selectedTopics={selectedTopics}
          associateTopics={associateTopics}
          ref={controlRef}
        />
      </div>
    </div>
  )
}

const TopicBin = React.forwardRef((props, ref) => {
  const { topicBin, shape, ...otherProps } = props
  const { leadTopicObj, topicObjs } = topicBin
  const classes = useStyles(props)
  if (topicObjs && topicObjs.length) {
    return (
      <div className={classes.topicsWrapper} ref={ref} key={leadTopicObj._id}>
        <TopicObj topicObj={leadTopicObj} shape={shape ? 'lead' : ''} {...otherProps} key={leadTopicObj._id} />
        {topicObjs.map(topicObj => (
          <TopicObj topicObj={topicObj} shape={shape === 'selected' ? '' : 'minimized'} key={topicObj._id} />
        ))}
      </div>
    )
  } else return <TopicObj topicObj={leadTopicObj} shape={shape} {...otherProps} key={leadTopicObj._id} ref={ref} />
})

const TopicObj = React.forwardRef((props, ref) => {
  const { topicObj, shape, ...otherProps } = props
  const classes = useStyles(props)
  return (
    <div className={cx(classes.topic, shape)} {...otherProps} ref={ref} key={topicObj._id}>
      {topicObj.description || '    '}
    </div>
  )
})

const useStyles = createUseStyles({
  topicsWrapper: {
    textAlign: 'center',
    border: '1px solid black',
    margin: '.1em',
  },
  topic: {
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    //border: '1px solid black',
    borderRadius: '1rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    margin: '2rem 0',
    background: 'white',
    fontSize: '2em',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    padding: '2rem',
    '&:hover': {
      cursor: 'pointer',
    },
    '&.minimized': {
      overflow: 'hidden',
      maxHeight: '1px',
      color: 'gray',
      backgroundColor: 'gray',
      border: 'none',
      padding: 0,
      margin: 0,
    },
    '&.lead': {
      backgroundColor: 'orange',
    },
    '&.selected': {
      backgroundColor: selectedBackgroundColor,
      color: selectedColor,
    },
  },
})

const TopicControlPanel = React.forwardRef((props, ref) => {
  const { leadTopic, selectedTopics, associateTopics } = props
  const classes = useControlStyles(props)
  const selectedTopicsCount = Object.keys(selectedTopics).length
  return (
    <div className={classes.controlPanel} ref={ref}>
      <div className={classes.statement}>Above are some topics suggested by other voters</div>
      <div className={classes.instruction}>Click on topics to associate them</div>
      <div className={classes.instruction}>Double click on one to make it group lead</div>
      <button className={classes.button} disabled={!leadTopic || !selectedTopicsCount} onClick={associateTopics}>
        <div className={classes.buttonSub}>No Topics to be Combined?</div>
        {selectedTopicsCount ? 'Group Topics' : 'Skip'}
      </button>
    </div>
  )
})

const useControlStyles = createUseStyles({
  controlPanel: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '4em 4em 0 0',
    boxShadow: '0px 0px 1em rgba(0, 0, 0, 0.25)',
    margin: 0,
    width: '48em',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: '1em',
    paddingTop: '1em',
  },
  instruction: {
    fontFamily: 'Roboto',
    fontSize: '2em',
    lineHeight: '1em',
    padding: 0,
    marginLeft: '1em',
    marginRight: '1em',
    paddingBottom: '0.25em',
  },
  statement: {
    fontFamily: 'Roboto',
    fontSize: '1rem',
    color: 'white',
    opacity: '0.6',
    paddingTop: '1em',
    paddingBottom: '1em',
  },
  button: {
    backgroundColor: Blue,
    border: 'none',
    borderRadius: '1rem',
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: '2em',
    width: '90%',
    marginTop: '1em',
    paddingBottom: '1rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  buttonSub: {
    opacity: '0.6',
    fontSize: '1rem',
    paddingTop: '1rem',
  },
})
/**
 * Class TopicBins
 *
 * associateTopics
 * disassociateTopics
 * showSubTopics
 * hideSubTopics
 *
 *
 *
 */
