'use strict'

// https://github.com/EnCiv/unpoll/issues/4

import React, { useState, useLayoutEffect, useMemo, useEffect, useReducer } from 'react'
import ReactDom from 'react-dom'
import useMethods from '../lib/use-methods'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import SvgTrashCan from '../svgr/trash-can'
import SvgPencil from '../svgr/pencil'
import SvgCaret from '../svgr/caret'
import SvgCaretDown from '../svgr/caret-down'
import ActionCard from './action-card'
import TopicCard from './topic-card'

const offsetHeight = 1.25
const Blue = '#418AF9'

export function CardStack(props) {
  const { className, style, defaultShape = "open", displacement = 0.1, cardStore, group, groupMethods, cards = [] } = props
  const classes = useStyles(props)

  const [refs, neverSetRefs] = useState({ action: undefined, controls: undefined, instruct: undefined })
  const [lastRefDone, setLastRefDone] = useState(false)
  const [allRefsDone, setAllRefsDone] = useState(false) // don't apply transitions until all refs are done

  function refsInOrder() {
    let keys = []
    cards.forEach(card => keys.push(card._id))
    keys.push('instruct', 'controls', 'action')
    let newRefs = {}
    keys.forEach(key => newRefs[key] = refs[key])
    return newRefs
  }

  function refHeight(n) {
    const node = refs[n] && ReactDom.findDOMNode(refs[n])
    return node ? node.getBoundingClientRect().height : 0
  }
  // sum height of all children above i
  // 'all' or any name not in the list will return the hight of all elements in the list
  function aboveHeight(i) {
    let iKey = i + '' // keys must be strings
    const refs = refsInOrder()
    const keys = Object.keys(refs)
    let height = 0
    let n = 0
    while (keys[n] !== iKey && n < keys.length) height += refHeight(keys[n++]) * (n < keys.length ? offsetHeight : 1)
    return height
  }

  // can't send actions to parent from within reducer, so save them as sideeffects and let them run after
  const [sideEffects, neverSetSideEffects] = useState([])
  useEffect(() => {
    while (sideEffects.length)
      sideEffects.shift()()
  }, [sideEffects.length])

  const [lstate, lmethods] = useMethods((dispatch, lstate) => ({
    toggleAddRemove() {
      if (lstate.shape === 'add-remove') {
        dispatch({ shape: 'open' })
        props.groupMethods.resetGroup(props.group)
      } else {
        dispatch({ shape: 'add-remove' })
        props.groupMethods.setGroup(props.group)
      }
    },
    refresh() {
      dispatch({ refresh: lstate.refresh + 1 })
    },
    transitionEnd() {
      dispatch({ transitionCount: lstate.transitionCount + 1 })
    },
    minimize() {
      dispatch({ shape: "minimized" })
    },
    open() {
      dispatch({ shape: "open" })
    },
    ejectAllCards() {
      if (cards.length) {
        let card = cards[cards.length - 1];
        props.groupMethods.fromGroupRemoveId(group, card._id)
        sideEffects.push(() => setTimeout(lmethods.ejectAllCards, 1000)) //allow user to experience the card in its now position after the transition before starting the next transition
      }
    },
    changeLeadTopic() {
      dispatch({ shape: 'change-lead' })
    },
    toggleCard(id) {
      switch (lstate.shape) {
        case "change-lead":
          props.groupMethods.changeLead(props.group, id)
          props.groupMethods.resetGroup(props.group)
          sideEffects.push(() => setTimeout(() => dispatch({ shape: 'minimized' }), 1000))
          return
        case "add-remove":
          // eject the child
          return props.groupMethods.fromGroupRemoveId(group, id)
        case "open":
        case "minimized":
          return // just ignore it
        default:
          throw new Error()
      }
    },
    updateStaticSetRefs() {
      let keys = []
      cards.forEach(card => keys.push(card._id))

      keys.push('instruct', 'controls', 'action')
      keys.forEach(key => {
        if (!lstate.staticSetRefs[key]) {
          lstate.staticSetRefs[key] =
            node => {
              if (!node && refs[key]) {
                console.info("node is null for:", key)
                //delete refs[i]
                //if (allRefsDone) dispatch({ type: "refresh" }) // refresh because a child has been deleted
              }
              else if (refs[key] !== node) {
                refs[key] = node
                if (allRefsDone) lmethods.refresh() // refresh because a child has been added
              }
              // else don't setRefs cause your cause a loop
            }
        }
      }
      )
      // do not call dispatch - we are changing lState directly because we don't want to cause a rerender
    }
  }), { shape: defaultShape, refresh: 0, transitionCount: 0, staticSetRefs: [] })
  lmethods.updateStaticSetRefs() // it's quick if nothing to do but initial, and anytime a card is added this needs to be done

  useEffect(lmethods.updateStaticSetRefs, [cards, cardStore])

  useEffect(lmethods.transitionEnd, [cards, cardStore])
  // shapes: minimized, open, add-remove, change-lead

  useEffect(lmethods.refresh, [lstate.shape]) // if shape changes refresh cause we need to calculate hight again after display: none takes effect


  const last = cards.length - 1

  // without this, on initial render user will see the children drawn in reverse order, and then they will move into the correct order
  useLayoutEffect(() => {
    if (allRefsDone) return
    if (lastRefDone) {
      setAllRefsDone(true)
      return
    }
    let keys = Object.keys(refs);
    keys.length === (cards.length + 3) &&
      keys.every(key => !!refs[key]) &&
      setLastRefDone(true)
  }, [refs, lastRefDone])


  const shapeOfChild = i => {
    if (i == last) {
      switch (lstate.shape) {
        case 'change-lead':
        case 'add-remove':
          return 'firstChildLikeInner'
        case 'open':
        case 'minimized':
          return 'firstChild'
      }
    }
    if (i == 0) return 'lastChild'
    return 'innerChild'
  }

  const shapeOfChildById = id => {
    const i = cards.findIndex(card => card._id === id)
    if (i < 0) return 'innerChild' // child may be being removed
    return shapeOfChild(last - i)
  }

  const reversed = useMemo(
    () => {
      console.info("reversed updated")
      return cards ?
        cards.map((card, i) => (
          <div
            style={{ top: lstate.shape === 'minimized' ? 0 : `calc( ${aboveHeight(card._id)}px ${(lstate.shape === "change-lead" || lstate.shape === "add-remove") ? " + 1rem" : ""})` }}
            className={cx(
              classes.subChild,
              classes[shapeOfChildById(card._id)],
              classes[lstate.shape],
              allRefsDone && classes.transitionsEnabled
            )}
            key={card._id}
            onTransitionEnd={lmethods.transitionEnd}
          >
            <div ref={lstate.staticSetRefs[card._id]} key={card._id}>
              <TopicCard topicObj={card}
                onToggleSelect={lmethods.toggleCard}
              />
            </div>
          </div>))
          .reverse() : []
    },
    [cards, cardStore, allRefsDone, lstate.shape]
  ) // reversed so the first child will be rendered last and on top of the other children -
  // memo to prevent rerender loop on state change
  // allRefsDone to rerender them in position (aboveHeight) after their heights are known
  // shape to change position when shape changes

  // the wrapper div will not shrink when the children stack - so we force it
  const wrapperHeight =
    lstate.shape === 'minimized'
      ? refHeight('action') * 1 + (displacement * 2)
      : aboveHeight("all") || undefined // don't set maxheight if 0, likely on the first time through

  return (
    <div style={{ ...style, height: wrapperHeight }} className={cx(className, classes.wrapper, allRefsDone && classes.transitionsEnabled)}>
      <div className={cx(classes.borderWrapper, classes[lstate.shape])}>
        <div style={{ top: aboveHeight('instruct') }}
          className={cx(classes.instruct, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          ref={lstate.staticSetRefs["instruct"]}
          key="instruct"
        >
          {lstate.shape === "add-remove" ? "Tap on cards to add or remove them" : lstate.shape === "change-lead" ? "Pick the topick which best represents the group" : ""}
        </div>
        <div
          style={{
            top:
              lstate.shape === 'minimized'
                ? refHeight('action') * displacement
                : aboveHeight('action'),
          }}
          className={cx(classes.subChild, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          key="action"
          ref={lstate.staticSetRefs['action']}
        >
          <ActionCard
            className={cx(classes.action, classes.flatTop, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
            active={cards.length > 1 ? "true" : "false"}
            name={lstate.shape === "open" ? "Change Lead Topic" : "Group Topics"}
            onDone={lmethods.changeLeadTopic} />
        </div>
        <div
          ref={lstate.staticSetRefs['controls']}
          style={{
            top:
              lstate.shape === 'minimized'
                ? refHeight('action') * displacement
                : aboveHeight('controls') + 'px',
          }}
          className={cx(classes.subChild, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          key="controls"
        >
          <div className={cx(classes.controls, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}>
            {[<SvgTrashCan onClick={lmethods.ejectAllCards} />, <SvgPencil onClick={lmethods.toggleAddRemove} />, <SvgCaret onClick={lmethods.minimize} />].map(item => <div className={classes.controlsItem}>{item}</div>)}
          </div>
        </div>
        {reversed}
        <div className={cx(classes.topControls, classes[lstate.shape])} key="last">
          <div className={classes.controlsItem} />
          <div className={classes.controlsItem} />
          <div className={cx(classes.controlsItem, classes.pointerEvents)}><SvgCaretDown onClick={lmethods.open} /></div>
        </div>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  wrapper: {
    pointerEvents: "none", // there are children that will have pointer events - don't interfere
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  },
  borderWrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    border: '1px solid white',
    borderRadius: '1rem',
    height: '100%',
    backgroundColor: 'black',
    borderBottom: 'none',
    borderTop: 'none',
    '&$minimized': {
      border: 'none',
    },
    '&$change-lead': {
      borderTop: '1px solid white',
      borderBottom: '1px solid white'
    },
    '&$add-remove': {
      borderTop: '1px solid white',
      borderBottom: '1px solid white'
    }
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
  minimized: {}, // a shape 
  'open': {}, // a shape
  'add-remove': {}, // a shape
  'change-lead': {}, // a shape
  transitionsEnabled: {},
  controls: {
    pointerEvents: 'auto',
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
    width: '100%',
    '&$add-remove': {
      display: 'none',
    },
    '&$change-lead': {
      display: 'none',
    }
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
  flatTop: {
    borderRadius: '0 0 1rem 1rem',
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
  firstChildLikeInner: {
    marginLeft: '1rem',
    marginRight: '1rem',
    borderRadius: '1rem',
    '&$minimized': {
      marginLeft: 0,
      marginRight: 0,
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
  pointerEvents: {
    pointerEvents: 'all'
  },
  action: {
    '&$change-lead': {
      display: 'none'
    }
  },
  instruct: {
    display: 'none',
    position: 'relative',
    textAlign: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    color: "white",
    '&$add-remove': {
      display: "inline-block"
    },
    '&$change-lead': {
      display: "inline-block"
    },
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  }
})

export default CardStack
