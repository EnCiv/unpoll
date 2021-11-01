'use strict'

// https://github.com/EnCiv/unpoll/issues/15

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import ActionCard from './action-card'
import useMethods from '../lib/use-methods'
import PageHeader from './page-header'

export const CardListGrouper = props => {
  const {
    className,
    style,
    store,
    onDone,
    majorLine = 'Select the topics you find similar enough to be combined (If any).',
    minorLine = 'Below are topics submited by you and other participans',
    ...otherProps
  } = props
  const { methods, methodState } = props[store]

  const [lState, lMethods] = useMethods(
    (dispatch, lState) => ({
      fromGroupRemoveId(group, id) {
        // before removing the id, check if we are ending the grouping
        const groupIndex = methodState.cards.findIndex(crd => crd.cards && crd._id === group) // might be ejecting cards from one group, while adding them to another
        if (methodState.cards[groupIndex].cards.length <= 1 && group === lState.group) dispatch({ group: '' })
        methods.fromGroupRemoveId(group, id)
      },
      toggleSelect(id) {
        if (!lState.group) {
          methods.toGroupAddId('', id)
          dispatch({ group: methodState.cards.find(crd => crd.cards && crd.cards[0]._id === id)?._id })
        } else methods.toGroupAddId(lState.group, id)
      },
      resetGroup(group) {
        if (lState.group === group || !group) dispatch({ group: '' })
      },
      setGroup(group) {
        if (!lState.group) dispatch({ group })
      },
    }),
    { group: '' }
  )

  const [groupMethods, neverSetGroupMethods] = useState(() => Object.assign({}, methods, lMethods))

  const classes = useStyles(props)

  return (
    <div className={cx(className, classes.list)} style={style}>
      <PageHeader majorLine={majorLine} minorLine={minorLine} />
      {methodState.cards.map(card => {
        if (card.cards)
          if (card.cards.length)
            return (
              <CardStack
                className={classes.topic}
                key={card._id}
                cardStore={{ ...props[store], methods: groupMethods }}
                group={card._id}
                defaultShape={'add-remove'}
                cards={card.cards}
              />
            )
          else return null
        else
          return (
            <TopicCard
              topicObj={card}
              className={classes.topic}
              key={card._id}
              onToggleSelect={lMethods.toggleSelect}
            />
          )
      })}
      <ActionCard
        className={classes.action}
        active={!lState.group && 'true'}
        name={lState.group ? 'Complete Group before continuing' : 'Continue'}
        onDone={onDone}
      />
    </div>
  )
}

const useStyles = createUseStyles({
  list: {
    padding: '1rem',
  },
  topic: {
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    marginTop: '1rem',
    '&:first-child': {
      marginTop: 0,
    },
  },
  action: {
    marginTop: '1rem',
  },
})

export default CardListGrouper
