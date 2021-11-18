'use strict'

import React, { useEffect, useState, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import InputElement from './input-element'
import PageHeader from './page-header'
import PercentDoneButton from './percent-done-button'
import TextAreaElement from './text-area-element'
import { cloneDeep } from 'lodash'

export const Ask = props => {
  const { majorLine, minorLine, asks, onDone, className, style } = props
  const classes = useStyles()
  const [count, setCount] = useState(0)
  const askCount = useMemo(
    () => asks.reduce((askCount, ask) => ask.reduce((askCount, item) => ++askCount, askCount), 0),
    [asks]
  )
  // an array of arrays of the same shape as asks, of default values
  const [values, setValues] = useState(
    asks.reduce(
      (values, ask) => (
        values.push(ask.reduce((items, item) => (items.push(item.defaultValue || ''), items), [])), values
      ),
      []
    ),
    []
  )

  function asksDone() {
    return values.reduce((d, ask) => ask.reduce((d, value) => (value && ++d, d), d), 0)
  }

  const onDoneAddCards = e => {
    onDone(true, values)
  }

  return (
    <div className={cx(className, classes.askOuter)} style={style}>
      <PageHeader majorLine={majorLine} minorLine={minorLine} key="header" />
      {asks &&
        asks.reduce(
          (a, ask, i) =>
            // map doesn't work here because we need to put multiple things in the array and <></> doeesn't either
            ask.reduce((a, item, j) => {
              const InputChooser = item.maxLength > 79 ? TextAreaElement : InputElement
              a.push(
                <InputChooser
                  name={item.name}
                  defaultValue={item.defaultValue}
                  maxLength={item.maxLength}
                  className={classes.topic}
                  onChange={e => {
                    let _values = cloneDeep(values)
                    if (e && e.target) _values[i][j] = e.target.value
                    setValues(_values)
                  }}
                  onDone={() => setCount(asksDone())}
                  key={a.length + '-' + item.name.replace(/\s+/g, '-')}
                />
              )
              return a
            }, a),
          []
        )}
      <div className={classes.doneButton} key="done">
        <PercentDoneButton percentComplete={count / askCount} onClick={onDoneAddCards} key="percentDoneButton" />
      </div>
    </div>
  )
}
const useStyles = createUseStyles({
  askOuter: {
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  doneButton: {
    marginBottom: '2rem',
    //position: 'fixed',
    width: '100%',
    left: 0,
  },
  topic: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  question: {
    paddingBottom: '2rem',
  },
})

export default Ask
