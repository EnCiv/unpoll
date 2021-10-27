'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import SelectedIcon from '../svgr/circle-check'
import PercentDoneButton from './percent-done-button'
import PageHeader from './page-header'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

export const CardListSelector = props => {
  const {
    cardStore,
    selectedCards,
    maxSelected = 2,
    onDone,
    majorLine = 'Select 2 topics that are most important to you.',
    minorLine,
    ...otherProps
  } = props
  const { methods, methodState } = cardStore
  const cards = methodState.cards
  if (typeof selectedCards === 'undefined') {
    console.error('CardListSelector: selectedCards must be defined by parent')
    return null
  }
  const classes = useStyles(props)
  const [count, setCount] = useState(selectedCards.length)
  function toggleSelect(card) {
    let index = selectedCards.indexOf(card)
    if (index < 0) {
      if (selectedCards.length < maxSelected) selectedCards.push(card)
    } else selectedCards.splice(index, 1)
    setCount(selectedCards.length) // force a rerender because we are changing the state of a passed in array
  }
  return (
    <>
      <div className={classes.list} key="card-list">
        <PageHeader majorLine={majorLine} minorLine={minorLine} />
        {cards.map(card => {
          if (card.cards) {
            if (card.cards.length) {
              return (
                <div key={card._id} className={classes.topic}>
                  <CardStack key={card._id} defaultShape="minimized-view" cards={card.cards} cardStore={cardStore} />
                  {selectedCards.includes(card) && (
                    <div className={classes.selected}>
                      <div className={classes.selectedInner}>
                        <SelectedIcon />
                      </div>
                    </div>
                  )}
                  <div className={classes.clickable} onClick={() => toggleSelect(card)} key={'clickable' + card._id} />
                </div>
              )
            }
            return null
          } else
            return (
              <div className={classes.topic} key={card._id}>
                <TopicCard topicObj={card} />
                {selectedCards.includes(card) && (
                  <div className={classes.selected}>
                    <div className={classes.selectedInner}>
                      <SelectedIcon />
                    </div>
                  </div>
                )}
                <div className={classes.clickable} onClick={() => toggleSelect(card)} key={'clickable' + card._id} />
              </div>
            )
        })}
      </div>
      <div className={classes.doneButton} key="done-button">
        <PercentDoneButton name="DONE" percentComplete={count / maxSelected} onClick={e => onDone && onDone(true)} />
      </div>
    </>
  )
}

const useStyles = createUseStyles({
  doneButton: {
    marginBottom: '2rem',
    //position: 'fixed',
    width: '100%',
    left: 0,
  },
  done: {
    position: 'fixed',
    bottom: '2rem',
    left: 0,
    width: '100%',
    height: 'auto',
  },
  clickable: {
    position: 'absolute',
    height: '6rem',
    width: '6rem',
    top: 0,
    left: 0,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  selected: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
  },
  selectedInner: {
    position: 'absolute',
    top: '2rem',
    marginLeft: '2rem',
    fontSize: '2rem',
    lineHeight: '1em',
    '& svg': {
      verticalAlign: 'middle',
    },
  },
  list: {
    padding: '1rem',
  },
  topic: {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginTop: '1rem',
    '&:first-child': {
      marginTop: 0,
    },
  },
})

export default CardListSelector
