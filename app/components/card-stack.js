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
  const { className, style, defaultShape = 'open', displacement = 0.1, cardStore, group, cards = [] } = props
  const classes = useStyles(props)

  const [refs, neverSetRefs] = useState({ action: undefined, controls: undefined, instruct: undefined })
  const [lastRefDone, setLastRefDone] = useState(false)
  const [allRefsDone, setAllRefsDone] = useState(false) // don't apply transitions until all refs are done

  function refsInOrder() {
    let keys = []
    cards.forEach(card => keys.push(card._id))
    keys.push('instruct', 'controls', 'action')
    let newRefs = {}
    keys.forEach(key => (newRefs[key] = refs[key]))
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
    let realCards = 0 // don't calculate space between cards with no hight
    while (keys[n] !== iKey && n < keys.length) {
      const h = refHeight(keys[n++])
      height += h
      if (h > 0) realCards++
    }
    return `calc(${height}px + ${n >= keys.length ? realCards - 1 : realCards} * 1rem)`
  }

  // can't send actions to parent from within reducer, so save them as sideeffects and let them run after
  const [sideEffects, neverSetSideEffects] = useState([])
  useEffect(() => {
    while (sideEffects.length) sideEffects.shift()()
  }, [sideEffects.length])

  const [lstate, lmethods] = useMethods(
    (dispatch, lstate) => ({
      toggleAddRemove() {
        if (lstate.shape === 'add-remove') {
          dispatch({ shape: 'open' })
          props.cardStore.methods.resetGroup(props.group)
        } else {
          dispatch({ shape: 'add-remove' })
          props.cardStore.methods.setGroup(props.group)
        }
      },
      refresh() {
        dispatch({ refresh: lstate.refresh + 1 })
      },
      transitionEnd() {
        dispatch({ transitionCount: lstate.transitionCount + 1 })
      },
      minimize() {
        if (lstate.shape === 'open-view') {
          dispatch({ shape: 'minimized-view-start' })
          sideEffects.push(() => setTimeout(() => dispatch({ shape: 'minimized-view' }), 475))
        } else dispatch({ shape: 'minimized' })
      },
      open() {
        switch (lstate.shape) {
          case 'minimized-view-start':
            return dispatch({ shape: 'open-view' })
          case 'minimized-view':
            return dispatch({ shape: 'open-view' })
          case 'open-view':
            dispatch({ shape: 'minimized-view-start' })
            sideEffects.push(() => setTimeout(() => dispatch({ shape: 'minimized-view' }), 475))
            return
          case 'minimized':
            return dispatch({ shape: 'open' })
          default:
            return dispatch({ shape: 'minimized' })
        }
      },
      ejectAllCards() {
        if (cards.length) {
          let card = cards[cards.length - 1]
          props.cardStore.methods.fromGroupRemoveId(group, card._id)
          sideEffects.push(() => setTimeout(lmethods.ejectAllCards, 1000)) //allow user to experience the card in its now position after the transition before starting the next transition
        }
      },
      changeLeadTopic() {
        dispatch({ shape: 'change-lead' })
      },
      toggleCard(id) {
        switch (lstate.shape) {
          case 'change-lead':
            props.cardStore.methods.changeLead(props.group, id)
            props.cardStore.methods.resetGroup(props.group)
            sideEffects.push(() => setTimeout(() => dispatch({ shape: 'minimized' }), 1000))
            return
          case 'add-remove':
            // eject the child
            return props.cardStore.methods.fromGroupRemoveId(group, id)
          case 'open':
          case 'minimized':
          case 'open-view':
          case 'minimized-view-start':
          case 'minized-view':
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
            lstate.staticSetRefs[key] = node => {
              if (!node && refs[key]) {
                console.info('node is null for:', key)
                //delete refs[i]
                //if (allRefsDone) dispatch({ type: "refresh" }) // refresh because a child has been deleted
              } else if (refs[key] !== node) {
                refs[key] = node
                if (allRefsDone) lmethods.refresh() // refresh because a child has been added
              }
              // else don't setRefs cause your cause a loop
            }
          }
        })
        // do not call dispatch - we are changing lState directly because we don't want to cause a rerender
      },
      reversedRefresh() {
        dispatch({ reversedCount: lstate.reversedCount + 1 })
      },
    }),
    { shape: defaultShape, refresh: 0, transitionCount: 0, staticSetRefs: [], reversedCount: 0 }
  )
  lmethods.updateStaticSetRefs() // it's quick if nothing to do but initial, and anytime a card is added this needs to be done

  useEffect(lmethods.updateStaticSetRefs, [cards, cardStore])

  useEffect(lmethods.transitionEnd, [cards, cardStore])
  // shapes: minimized, open, add-remove, change-lead, open-view, minimized-view, minimized-view-start

  useEffect(lmethods.refresh, [lstate.shape]) // if shape changes refresh cause we need to calculate hight again after display: none takes effect

  const last = cards.length - 1

  // without this, on initial render user will see the children drawn in reverse order, and then they will move into the correct order
  if (typeof window !== 'undefined')
    useLayoutEffect(() => {
      if (allRefsDone) return
      if (lastRefDone) {
        setAllRefsDone(true)
        return
      }
      let keys = Object.keys(refs)
      keys.length === cards.length + 3 && keys.every(key => !!refs[key]) && setLastRefDone(true)
    }, [refs, lastRefDone])

  const shapeOfChild = i => {
    if (i == last) {
      switch (lstate.shape) {
        case 'change-lead':
        case 'add-remove':
          return 'firstChildLikeInner'
        case 'open':
        case 'open-view':
        case 'minimized':
        case 'minimized-view-start':
        case 'minimized-view':
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

  function checkFor0(height) {
    if (height <= 0) {
      sideEffects.push(lmethods.reversedRefresh)
    }
    return height
  }

  const reversed = useMemo(() => {
    console.info('reversed updated')
    return cards
      ? cards
          .map((card, i) => (
            <div
              style={{
                top:
                  lstate.shape === 'minimized' ||
                  lstate.shape === 'minimized-view-start' ||
                  lstate.shape === 'minimized-view'
                    ? 0
                    : `calc( ${aboveHeight(card._id)} ${
                        lstate.shape === 'change-lead' || lstate.shape === 'add-remove' ? ' + 1rem' : ''
                      })`,
                maxHeight:
                  lstate.shape === 'minimized' ||
                  lstate.shape === 'minimized-view-start' ||
                  lstate.shape === 'minimized-view' // or bigger cards will hang out under the first card
                    ? refHeight(cards[0]._id)
                    : checkFor0(refHeight(card._id)),
              }}
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
                <TopicCard topicObj={card} onToggleSelect={lmethods.toggleCard} />
              </div>
            </div>
          ))
          .reverse()
      : []
  }, [cards, cardStore, allRefsDone, lstate.shape, lstate.reversedCount]) // reversed so the first child will be rendered last and on top of the other children -
  // memo to prevent rerender loop on state change
  // allRefsDone to rerender them in position (aboveHeight) after their heights are known
  // shape to change position when shape changes
  // lstate.reversedCount so that after new cards are added, their maxHeight will get updated (and they will grow on screen)

  // the wrapper div will not shrink when the children stack - so we force it
  const wrapperHeight =
    lstate.shape === 'minimized' || lstate.shape === 'minimized-view-start' || lstate.shape === 'minimized-view'
      ? `calc( ${refHeight(cards[0]._id)}px + 2rem)`
      : `calc( ${aboveHeight('all')} + ${lstate.shape === 'open-view' ? '1rem' : '0px'} )` || undefined // don't set maxheight if 0, likely on the first time through

  return (
    <div
      style={{ ...style, height: wrapperHeight }}
      className={cx(className, classes.wrapper, allRefsDone && classes.transitionsEnabled)}
    >
      <div className={cx(classes.borderWrapper, classes[lstate.shape])}>
        <div
          style={{ top: aboveHeight('instruct') }}
          className={cx(classes.instruct, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          ref={lstate.staticSetRefs['instruct']}
          key="instruct"
        >
          <div className={classes.instructTxt}>
            {lstate.shape === 'add-remove'
              ? 'Tap on cards to add or remove them'
              : lstate.shape === 'change-lead'
              ? 'Pick the topick which best represents the group'
              : ''}
          </div>
        </div>
        <div
          style={{
            top:
              lstate.shape === 'minimized' ||
              lstate.shape === 'minimized-view-start' ||
              lstate.shape === 'minimized-view'
                ? `calc( ${refHeight(cards[0]._id) - refHeight('action')}px + 2rem )`
                : aboveHeight('action'),
          }}
          className={cx(classes.subChild, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          key="action"
          ref={lstate.staticSetRefs['action']}
        >
          <ActionCard
            className={cx(
              classes.action,
              classes.flatTop,
              classes[lstate.shape],
              allRefsDone && classes.transitionsEnabled
            )}
            active={cards.length > 1 ? 'true' : 'false'}
            name={lstate.shape === 'open' ? 'Change Lead Topic' : 'Group Topics'}
            onDone={lmethods.changeLeadTopic}
          />
        </div>
        <div
          ref={lstate.staticSetRefs['controls']}
          style={{
            top:
              lstate.shape === 'minimized' ||
              lstate.shape === 'minimized-view-start' ||
              lstate.shape === 'minimized-view'
                ? `calc( ${refHeight(cards[0]._id) - refHeight('controls')}px + 1rem )`
                : aboveHeight('controls'),
            maxHeight:
              lstate.shape === 'minimized' ||
              lstate.shape === 'minimized-view-start' ||
              lstate.shape === 'minimized-view' // or the cards below the top won't look evenly distributed
                ? refHeight(cards[0]._id)
                : undefined,
          }}
          className={cx(classes.subChild, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}
          key="controls"
        >
          <div className={cx(classes.controls, classes[lstate.shape], allRefsDone && classes.transitionsEnabled)}>
            {[
              <SvgTrashCan onClick={lstate.shape === 'open' ? lmethods.ejectAllCards : undefined} />,
              <SvgPencil onClick={lstate.shape === 'open' ? lmethods.toggleAddRemove : undefined} />,
              <SvgCaret onClick={lmethods.minimize} />,
            ].map(item => (
              <div className={classes.controlsItem}>{item}</div>
            ))}
          </div>
        </div>
        {reversed}
        <div
          style={{
            top:
              lstate.shape === 'minimized' ||
              lstate.shape === 'minimized-view-start' ||
              lstate.shape === 'minimized-view'
                ? 0
                : lstate.shape === 'change-lead' || lstate.shape === 'add-remove'
                ? '1rem'
                : 0,
          }}
          className={cx(classes.topControls, classes[lstate.shape])}
          key="last"
        >
          <div className={classes.controlsItem} />
          <div className={classes.controlsItem} />
          <div className={cx(classes.controlsItem)}>
            <SvgCaretDown
              className={classes.pointerEvents}
              style={{
                transition: '0.5s linear all',
                transform:
                  lstate.shape === 'minimized' ||
                  lstate.shape === 'minimized-view-start' ||
                  lstate.shape === 'minimized-view'
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
              }}
              onClick={lmethods.open}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  wrapper: {
    pointerEvents: 'none', // there are children that will have pointer events - don't interfere
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
    overflow: 'hidden',
    borderBottom: 'none',
    borderTop: 'none',
    '&$minimized': {
      border: 'none',
    },
    '&$minimized-view': {
      border: 'none',
    },
    '&$minimized-view-start': {
      border: 'none',
    },
    '&$change-lead': {
      borderTop: '1px solid white',
      borderBottom: '1px solid white',
    },
    '&$add-remove': {
      borderTop: '1px solid white',
      borderBottom: '1px solid white',
    },
    '&$open-view': {
      borderBottom: '1px solid white',
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
  minimized: {}, // a shape
  open: {}, // a shape
  'add-remove': {}, // a shape
  'change-lead': {}, // a shape
  'open-view': {}, // a shape
  'minimized-view-start': {}, // a shape
  'minimized-view': {},
  transitionsEnabled: {},
  controls: {
    pointerEvents: 'auto',
    background: '#000000',
    '&$minimized': {
      backgroundColor: '#949494',
      borderRadius: '0 0 1rem 1rem',
    },
    '&$minimized-view': {
      backgroundColor: '#949494',
      borderRadius: '0 0 1rem 1rem',
    },
    '&$minimized-view-start': {
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
    },
    '&$open-view': {
      display: 'none',
    },
    '&$minimized-view-start': {
      display: 'none',
    },
  },
  topControls: {
    position: 'absolute',
    background: 'transparent',
    '&$minimized': {
      display: 'table',
    },
    '&$minimized-view': {
      display: 'table',
    },
    '&$minimized-view-start': {
      display: 'table',
    },
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
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
    },
  },
  flatTop: {
    borderRadius: '0 0 1rem 1rem',
    '&$minimized': {
      backgroundColor: '#4C4C4C',
    },
    '&$minimized-view': {
      backgroundColor: '#4C4C4C',
    },
    '&$minimized-view-start': {
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
    '&$minimized-view': {
      borderRadius: '1rem',
    },
    '&$minimized-view-start': {
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
    '&$minimized-view': {
      marginLeft: 0,
      marginRight: 0,
    },
    '&$minimized-view-start': {
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
    '&$minimized-view': {
      marginLeft: 0,
      marginRight: 0,
    },
    '&$minimized-view-start': {
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
    '&$minimized-view': {
      marginLeft: 0,
      marginRight: 0,
    },
    '&$minimized-view-start': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  pointerEvents: {
    pointerEvents: 'all',
  },
  action: {
    '&$change-lead': {
      display: 'none',
    },
    '&$open-view': {
      display: 'none',
    },
    '&$minimized-view-start': {
      display: 'none',
    },
  },
  instruct: {
    display: 'none',
    position: 'absolute',
    width: '100%',

    color: 'white',
    '&$add-remove': {
      display: 'block',
    },
    '&$change-lead': {
      display: 'block',
    },
    '&$transitionsEnabled': {
      transition: '0.5s linear all',
    },
  },
  instructTxt: {
    textAlign: 'center',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    position: 'relative',
    display: 'inline-block',
  },
})

export default CardStack
