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
    store,
    selectedCards,
    setSelectedCards,
    maxSelected = 2,
    onDone,
    topicCard,
    majorLine = 'Select 2 topics that are most important to you.',
    minorLine,
    ...otherProps
  } = props
  const { methods, methodState } = props[store]
  const cards = methodState.cards
  if (typeof selectedCards === 'undefined') {
    console.error('CardListSelector: selectedCards must be defined by parent')
    return null
  }
  const classes = useStyles(props)
  function toggleSelect(card) {
    let index = selectedCards.indexOf(card)
    if (index < 0) {
      if (selectedCards.length < maxSelected) setSelectedCards(selectedCards.concat([card]))
    } else {
      let _selectedCards = selectedCards.slice()
      _selectedCards.splice(index, 1)
      setSelectedCards(_selectedCards)
    }
  }
  // the cards might change, and if one of the selected cards is not there anymore we need to unselect it
  useEffect(() => {
    let _selectedCards = []
    for (const card of selectedCards) {
      if (methodState.cards.some(crd => crd._id === card._id)) _selectedCards.push(card)
    }
    if (_selectedCards.length !== selectedCards.length) setSelectedCards(_selectedCards)
  }, [props[store]]) //methodState.cards never changes but cardStore will change when there are changes
  return (
    <>
      <div className={classes.list} key="card-list">
        <PageHeader majorLine={majorLine} minorLine={minorLine} />
        {cards.map(card => {
          if (card.cards) {
            if (card.cards.length) {
              return (
                <div key={card._id} className={classes.topic}>
                  <CardStack key={card._id} defaultShape="minimized-view" cards={card.cards} cardStore={props[store]} />
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
        <PercentDoneButton
          name="DONE"
          percentComplete={selectedCards.length / maxSelected}
          onClick={e => onDone && onDone(true)}
        />
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
