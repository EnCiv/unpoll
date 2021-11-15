'use strict'

import React, { useState, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import SvgCircle from '../svgr/white-circle'
import SvgCircleCheck from '../svgr/white-circle-check'

export function CheckButton(props) {
  const { className, style, onDone } = props
  const classes = useStyles()
  const [checked, setChecked] = useState(false)
  const check = useCallback(e => {
    setChecked(true)
    onDone && onDone(true, true)
  })
  const uncheck = useCallback(e => {
    setChecked(false)
    onDone && onDone(false, false)
  })
  return checked ? (
    <SvgCircleCheck className={cx(className, classes.circleCheck)} onClick={uncheck} style={style} />
  ) : (
    <SvgCircle className={cx(className, classes.circle)} onClick={check} style={style} />
  )
}

export default CheckButton

const useStyles = createUseStyles({
  circle: {
    fontSize: '2rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  circleCheck: {
    fontSize: '2rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})
