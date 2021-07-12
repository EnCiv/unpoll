'use strict'

import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import SvgArrow from '../svgr/arrow'

export const ArrowButton = React.forwardRef((props, ref) => {
  const { name, onClick } = props
  const classes = useStyles(props)
  return (
    <button
      onClick={onClick}
      className={cx(classes.button)}
      ref={ref}
      >
      <span className={classes.buttonName}>{name || '    '}</span>
      <SvgArrow 
        className={cx(classes.arrow)}
      />
    </button>
  )
})

const useStyles = createUseStyles({
  arrow: {
    width: '2.813rem',
    marginLeft: '.939rem',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  buttonName: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  button: {
    width: '10.5rem',
    height: '3rem',
    border: '1px solid black',
    borderRadius: '1rem',
    boxShadow: '0px .25rem .625rem rgba(0, 0, 0, 0.25)',
    borderRadius: '.625rem',
    background: 'white',
    lineHeight: '1.172rem',
    color: '#1780fb',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export default ArrowButton
