'use strict'

import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import InputElement from './input-element'
import PageHeader from './page-header'
import PercentDoneButton from './percent-done-button'
import TextAreaElement from './text-area-element'
import objectid from 'isomorphic-mongo-objectid'
import { createTopic, createQuestion } from './iota-db'

export const Ask = props => {
  const { majorLine, minorLine, asks, onDone, className, style, cardStore, unmobQuestionId } = props
  const classes = useStyles()
  const [count, setCount] = useState(0)
  const [topicCards] = useState(
    asks.map(ask => {
      // not useMemo here because we can't have it rerun and create new _ids
      const [topic, question] = Object.keys(ask)
      return {
        _id: objectid().toString(),
        description: ask[topic],
        subject: '',
        parentId: unmobQuestionId,
        webComponent: 'Topic',
      }
    })
  )
  const [questionCards] = useState(
    asks.map((ask, i) => {
      // not useMemo here because we can't have it rerun and create new _ids
      const [topic, question] = Object.keys(ask)
      return {
        _id: objectid().toString(),
        description: ask[question],
        subject: '',
        parentId: topicCards[i]._id,
        webComponent: 'Question',
      }
    })
  )

  function asksDone() {
    return (
      topicCards.reduce((a, crd) => (crd.description ? a + 1 : a), 0) +
      questionCards.reduce((a, crd) => (crd.description ? a + 1 : a), 0)
    )
  }

  const onDoneAddCards = done => {
    if (done) {
      topicCards.forEach(card => {
        card.subject = card.description
        createTopic(card)
      })
      questionCards.forEach((card, i) => {
        card.subject = `Question of ${topicCards[i].description}`
        createQuestion(card)
      })
    }
    onDone(done)
  }

  return (
    <div className={cx(className, classes.askOuter)} style={style}>
      <PageHeader majorLine={majorLine} minorLine={minorLine} key="header" />
      {asks &&
        asks.reduce((a, ask, i) => {
          // map doesn't work here because we need to put to things in the array and <></> doeesn't either
          const [topic, question] = Object.keys(ask)
          a.push(
            <InputElement
              name={'Topic ' + (i + 1)}
              defaultValue={ask[topic]}
              maxLength={50}
              className={classes.topic}
              onChange={e => (topicCards[i].description = e?.target?.value)}
              onDone={() => setCount(asksDone())}
              key={a.length + '-t-' + topic}
            />
          )
          a.push(
            <TextAreaElement
              name={'Question ' + (i + 1)}
              defaultValue={ask[question]}
              maxLength={280}
              className={classes.question}
              onChange={e => (questionCards[i].description = e?.target?.value)}
              onDone={() => setCount(asksDone())}
              key={a.length + '-q-' + question}
            />
          )
          return a
        }, [])}
      <div className={classes.doneButton} key="done">
        <PercentDoneButton
          percentComplete={count / (asks.length * Object.keys(asks[0]).length)}
          onClick={onDoneAddCards}
          key="percentDoneButton"
        />
      </div>
    </div>
  )
}
const useStyles = createUseStyles({
  askOuter: {
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  doneButton: {
    marginBottom: '2rem',
    //position: 'fixed',
    width: '100%',
    left: 0,
  },
  topic: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  question: {
    paddingBottom: '2rem',
  },
})

export default Ask
