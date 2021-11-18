'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo } from 'react'
import { createUseStyles } from 'react-jss'

export default function TopicHeader(props) {
  const { card } = props
  const classes = useStyles(props)
  return (
    <div className={classes.panel}>
      <h1>{card.cards ? card.cards[0].description : card.description}</h1>
    </div>
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
