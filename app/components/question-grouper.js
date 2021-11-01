'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import CardStore from './card-store'
import CardListGrouper from './card-list-grouper'

export function QuestionGrouper(props) {
  const { selectedCards, cardStore } = props
  const classes = useStyles(props)
  const topicIds = selectedCards[0].cards ? selectedCards[0].cards.map(card => card._id) : selectedCards[0]._id
  const selectedQuestions = useMemo(
    () => questionCards.reduce((a, card) => (topicIds.some(id => card.parentId === id) ? (a.push(card), a) : a), []),
    [selectedCards]
  )
  return (
    <>
      <div className={classes.panel}>
        <h1>{selectedCards[0].cards ? selectedCards[0].cards[0].description : selectedCards[0]}</h1>
      </div>
      <CardStore defaultValue={selectedQuestions}>
        <CardListGrouper />
      </CardStore>
    </>
  )
}

const useStyles = createUseStyles({
  panel: {
    '& h1': {
      margin: {
        left: '0',
        right: '0',
        top: '1rem',
        bottom: '0',
      },
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '1rem',
      lineHeight: '2rem',
      color: 'white',
    },
  },
})

export default PageHeader
