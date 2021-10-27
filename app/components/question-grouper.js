'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'

export function QuestionGrouper(props) {
  const { selectedCards, cardStore } = props
  const classes = useStyles(props)
  return (
    <div className={classes.panel}>
      <h1>{majorLine}</h1>
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

export default PageHeader
