'use strict'

import React, { useState, useLayoutEffect, useMemo } from 'react'
import ReactDom from 'react-dom'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import SvgTrashCan from '../svgr/trash-can'
import SvgPencil from '../svgr/pencil'
import SvgCaret from '../svgr/caret'
import SvgCaretDown from '../svgr/caret-down'

const offsetHeight = 1.25
const Blue = '#418AF9'

export function CardStack(props) {
  const { shape, displacement = 0.1 } = props
  const classes = useStyles(props)
  const reversed = useMemo(
    () =>
      React.Children.toArray(props.children)
        .reverse()
        .map((child, i) => <div ref={node => doSetRefs(i, node)}>{child}</div>),
    [props.children]
  ) // reversed so the first child will be rendered last and on top of the other children -
  // memo of cloneElement to prevent rerender loop on state change
  const last = reversed.length - 1
  const [refs, setRefs] = useState([])
  const [lastRefDone, setLastRefDone] = useState(false)
  const [allRefsDone, setAllRefsDone] = useState(false) // don't apply transitions until all refs are done
  const doSetRefs = (i, node) => {
    if (!node) delete refs[i]
    else refs[i] = node
    if (node || refs[i]) setRefs([...refs])
  }
  const [controlsHeight, setControlsHeight] = useState(0)

  /****
   * These are not used right now - but we might need them when we get to variable height cards
  

  function refHeight(n) {
    const node = refs[n] && ReactDom.findDOMNode(refs[n])
    return node ? node.getBoundingClientRect().height : 0
  }

  // sum height of all children above i
  function aboveHeight(i) {
    let height = 0
    let n = 0
    while (n < i) height += refHeight(n++) * offsetHeight
    return height + controlsHeight
  }

  // sum height of all children below i, and reduce to displacement if minimized
  function belowHeight(i) {
    let height = 0
    let n = i + 1
    while (n < refs.length) height += refHeight(n++) * (shape === 'minimized' ? displacement : offsetHeight)
    return height
  }
***/

  // without this, on initial render user will see the children drawn in reverse order, and then they will move into the correct order
  useLayoutEffect(() => {
    if (allRefsDone) return
    if (lastRefDone) {
      setAllRefsDone(true)
      return
    }
    refs.length === reversed.length &&
      refs.every(node => ReactDom.findDOMNode(node).clientHeight) &&
      setLastRefDone(true)
  }, [refs, lastRefDone])

  const shapeOfChild = i => {
    if (i == last) return 'firstChild'
    if (i == 0) return 'lastChild'
    return 'innerChild'
  }

  // the wrapper div will not shrink when the children stack - so we force it
  const wrapperHeight =
    shape === 'minimized'
      ? controlsHeight + controlsHeight * displacement * 2
      : (reversed.length + 1) * controlsHeight * offsetHeight + controlsHeight || undefined // don't set maxheight if 0, likely on the first time through
  return (
    <div style={{ height: wrapperHeight }} className={cx(classes.wrapper, allRefsDone && classes.transitionsEnabled)}>
      <div className={cx(classes.borderWrapper, shape && classes[shape])}>
        <div
          style={{
            top:
              shape === 'minimized'
                ? controlsHeight * 2 * displacement
                : (reversed.length + 1) * controlsHeight * offsetHeight + 'px',
          }}
          className={cx(classes.subChild, classes[shape], allRefsDone && classes.transitionsEnabled)}
        >
          <div className={cx(classes.action, shape && classes[shape], allRefsDone && classes.transitionsEnabled)}>
            Change Lead Topic
          </div>
        </div>
        <div
          ref={e => e && setControlsHeight(e.clientHeight)}
          style={{
            top:
              shape === 'minimized'
                ? controlsHeight * displacement
                : reversed.length * controlsHeight * offsetHeight + 'px',
          }}
          className={cx(classes.subChild, classes[shape], allRefsDone && classes.transitionsEnabled)}
        >
          <div className={cx(classes.controls, shape && classes[shape], allRefsDone && classes.transitionsEnabled)}>
            {[<SvgTrashCan />, <SvgPencil />, <SvgCaret />].map(item => <div className={classes.controlsItem}>{item}</div>)}
          </div>
        </div>
        {reversed.map((newChild, i) => (
          <div
            style={{ top: shape === 'minimized' ? 0 : (last - i) * controlsHeight * offsetHeight + 'px' }}
            className={cx(
              classes.subChild,
              classes[shapeOfChild(i)],
              classes[shape],
              allRefsDone && classes.transitionsEnabled
            )}
          >
            {newChild}
          </div>
        ))}
        <div className={cx(classes.topControls, classes[shape])}>
          {[null, null, <SvgCaretDown />].map(item => <div className={classes.controlsItem}>{item}</div>)}
        </div>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  wrapper: {
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  },
  borderWrapper: {
    position: 'relative',
    border: '1px solid white',
    borderRadius: '1rem',
    height: '100%',
    backgroundColor: 'black',
    borderBottom: 'none',
    borderTop: 'none',
    '&$minimized': {
      border: 'none',
    },
  },
  subChild: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  },
  subChildWrapper: {},
  minimized: {},
  transitionsEnabled: {},
  controls: {
    background: '#000000',
    '&$minimized': {
      backgroundColor: '#949494',
      borderRadius: '0 0 1rem 1rem',
    },
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
    display: 'table',
    tableLayout: 'fixed',
    width: '100%'
  },
  topControls: {
    position: 'absolute',
    background: 'transparent',
    '&$minimized': {
      display: 'table'
    },
    display: 'none',
    tableLayout: 'fixed',
    width: '100%'
  },
  controlsItem: {
    fontSize: '2rem',
    color: 'white',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '2rem',
    '& svg:hover': {
      cursor: 'pointer',
    }
  },
  action: {
    textAlign: 'center',
    alignItems: 'center',
    verticalAlign: 'middle',
    margin: 0,
    background: Blue,
    color: 'white',
    fontSize: '2em',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    padding: '2rem',
    borderRadius: '0 0 1rem 1rem',
    '&:hover': {
      cursor: 'pointer',
    },
    '&$minimized': {
      backgroundColor: '#4C4C4C',
    },
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  },
  firstChild: {
    position: 'absolute',
    borderRadius: '1rem 1rem 0 0',
    '&$minimized': {
      borderRadius: '1rem',
    },
  },
  innerChild: {
    marginLeft: '1rem',
    marginRight: '1rem',
    borderRadius: '1rem',
    '&$minimized': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  lastChild: {
    marginLeft: '1rem',
    marginRight: '1rem',
    borderRadius: '1rem',
    '&$minimized': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
})

export default CardStack
