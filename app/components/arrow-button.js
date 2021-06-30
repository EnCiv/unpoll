'use strict'

import React from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import SvgArrow from '../svgr/arrow'

const Blue = '#1480FF'

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
    marginLeft: '15px',
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
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    border: '1px solid black',
    borderRadius: '1rem',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    margin: 0,
    borderRadius: '10px',
    background: 'white',
    lineHeight: '18.75px',
    color: '#1780fb',
    // fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export default ArrowButton
