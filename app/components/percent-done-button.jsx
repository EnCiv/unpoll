'use strict'

import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  button: props => {
    const percentComplete = props.percentComplete * 100
    return {
      padding: '1em 2.5em',
      background: `linear-gradient(90deg, #418AF9 ${percentComplete}%, #C2C2C2 ${percentComplete}%)`,
      borderRadius: '0.5rem',
      color: 'white',
      border: 'none',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:active': {
        filter: 'brightness(.7)',
      },
    }
  },
})

export function PercentDoneButton(props) {
  const { onClick, name, percentComplete } = props
  const classes = useStyles(props)
  return (
    <button type="button" onClick={(e) => onClick && percentComplete >= 1 && onClick(e)} className={classes.button}>
      {name}
    </button>
  )
}

PercentDoneButton.defaultProps = { name: 'DONE', percentComplete: 0 }

export default PercentDoneButton
