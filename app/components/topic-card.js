'use strict'

// https://github.com/EnCiv/unpoll/issues/9s

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import Accordion from 'react-proactive-accordion'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

export const TopicCard = React.forwardRef((props, ref) => {
  const { topicObj, shape, onToggleSelect, ...otherProps } = props
  const classes = useStyles(props)
  return (
    <div
      active={shape !== 'minimized' ? "true" : "false"}
      className={cx(classes.topic, shape)}
      {...otherProps}
      ref={ref}
      key={topicObj._id}
    >
      {topicObj.description || '    '}
      {onToggleSelect && <div className={classes.clickable} onClick={() => onToggleSelect(topicObj._id)} key={'clickable' + topicObj._id} />}
    </div>
  )
})

const useStyles = createUseStyles({
  topic: {
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
    //border: '1px solid black',
    //borderRadius: '1rem',
    //boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    margin: 0,
    background: 'white',
    fontSize: '2em',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    padding: '2rem',
    '&:hover': {
      //cursor: 'pointer',
    },
    '&.minimized': {
      //overflow: 'hidden',
      //maxHeight: '1px',
      //color: 'gray',
      //backgroundColor: 'gray',
      //border: 'none',
      //padding: 0,
      //margin: 0,
    },
    '&.lead': {
      backgroundColor: 'orange',
    },
    '&.selected': {
      backgroundColor: selectedBackgroundColor,
      color: selectedColor,
    },
  },
  clickable: {
    pointerEvents: 'auto',
    position: 'absolute',
    height: '100%',
    width: '15%',
    top: 0,
    left: 0,
    '&:hover': {
      cursor: 'pointer'
    }
  },
})

export default TopicCard
