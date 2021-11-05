'use strict'

import React from 'react'
import objectid from 'isomorphic-mongo-objectid'
import { createTopic, createQuestion } from './iota-db'

export const IotaDbInput = props => {
  const { onDone, children, ...otherProps } = props
  const { unmobQuestionId } = props // needs to be passed down to the children

  const onDoneAddCards = (done, values) => {
    if (done) {
      for (const row in values) {
        const [tDescription, qDescription] = values[row]
        const tCard = {
          _id: objectid().toString(),
          description: tDescription,
          subject: 'Topic of ' + unmobQuestionId,
          parentId: unmobQuestionId,
          webComponent: 'Topic',
        }
        const qCard = {
          _id: objectid().toString(),
          description: qDescription,
          subject: 'Question of ' + tDescription,
          parentId: tCard._id,
          webComponent: 'Question',
        }
        createTopic(tCard)
        createQuestion(qCard)
      }
    }
    onDone(done)
  }

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      ...otherProps,
      onDone: onDoneAddCards,
    })
  )
}

export default IotaDbInput
