'use strict'

import { Iota } from 'civil-server'

export default async function associateTopics(round, topicIds, cb) {
  if (!this.synuser) return cb && cb() // if no user do nothing
  const userId = this.synuser.id
  let associations = []
  let leadTopicId = topicIds.shift()
  topicIds.forEach(topicId => {
    associations.push({
      subject: 'associate topics',
      description: 'associate topics',
      component: {
        component: 'associate-topics',
        round,
        leadTopicId,
        topicId,
      },
      userId,
    })
  })
  try {
    for await (const topicAssociation of associations) {
      await Iota.create(topicAssociation)
    }
    cb && cb(true)
  } catch (err) {
    logger.error('associateTopics', err)
    cb && cb()
  }
}
