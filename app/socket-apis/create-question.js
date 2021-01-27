'use strict'

import {Iota} from 'civil-server'

export default async function createQuestion(obj, cb) {
  if (!this.synuser) return cb() // if no user do nothing
  obj.userId = this.synuser.id
  if(!obj.parentId) {
      logger.error("createTopic without parent Id",obj)
      return cb()
  }
  if(!obj.webComponent) obj.webComponent="Question"
  try {
    const result = await Iota.create(obj)
    cb(result)
  } catch (err) {
    logger.error('createTopic', err)
  }
}