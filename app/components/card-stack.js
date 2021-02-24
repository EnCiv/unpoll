'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect, createRef } from 'react'
import ReactDom from 'react-dom'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

// see https://github.com/facebook/react/issues/17407 for more info on how we are doing refs to children

export function CardStack(props) {
  const { shape } = props
  const classes = useStyles(props)
  const reversed = React.Children.toArray(props.children).reverse()
  const last = reversed.length - 1
  const refsMap = useRef(new Map()).current // this really a memo
  useLayoutEffect(() => {
    refsMap.forEach(node => console.info(ReactDom.findDOMNode(node).clientHeight))
  })
  return (
    <div>
      {reversed.map((child, i) => {
        const newChild = React.cloneElement(child, {
          ref: node => {
            console.info(child.key)
            node ? refsMap.set(child.key, node) : refsMap.delete(child.key)
          },
        })
        if (i === last) return <div className={classes.firstChild}>{newChild}</div>
        else
          return (
            <div className={cx(classes.subChild, classes[shape])}>
              <div className={cx(classes.subChildWrapper, classes[shape])}>{newChild}</div>
            </div>
          )
      })}
    </div>
  )
}

const useStyles = createUseStyles({
  firstChild: {},
  subChild: {
    overflow: 'hidden',
    maxHeight: '200px',
    '&$minimized': {
      maxHeight: '60px',
    },
  },
  subChildWrapper: {
    '&$minimized': {
      bottom: '41px',
    },
  },
  minimized: {},
})

export default CardStack
