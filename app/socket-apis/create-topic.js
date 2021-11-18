'use strict'

import { Iota } from 'civil-server'
/*
const example = {
  _id: { $oid: '600f4a12ae13a42504eb1fcc' },
  parentId: '600f2e3d7be64409f0387718',
  subject: 'Topic of Unmob-Question',
  description: 'Polarization',
  userId: '600f45650a44473b1813a375',
  webComponent: 'Topic',
}
 */

export default async function createTopic(obj, cb) {
  if (!this.synuser) return cb && cb() // if no user do nothing
  if (typeof obj._id === 'string') obj._id = Iota.ObjectID(obj._id)
  obj.userId = this.synuser.id
  if (!obj.parentId) {
    logger.error('createTopic without parent Id', obj)
    return cb && cb()
  }
  if (!obj.webComponent) obj.webComponent = 'Topic'
  try {
    const result = await Iota.create(obj)
    cb && cb(result)
  } catch (err) {
    logger.error('createTopic', err)
    cb && cb()
  }
}
