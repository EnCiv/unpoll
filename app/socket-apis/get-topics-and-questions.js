'use strict'

import { Iota } from 'civil-server'

/*
const example = [
  {
      {
        _id: '6019be3ca27514233cfe1ebd',
        parentId: '600f2e3d7be64409f0387718',
        subject: 'Topic of Unmob-Question',
        description: 'Drugs',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Topic',
        id: '6019be3ca27514233cfe1ebd',
      },
      {
        _id: '6019be3da27514233cfe1ebf',
        parentId: '6019be3ca27514233cfe1ebd',
        subject: 'Question of Drugs',
        description: 'What are drugs illegal?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
      {
        _id: '600f4a12ae13a42504eb1fcc',
        parentId: '600f2e3d7be64409f0387718',
        subject: 'Topic of Unmob-Question',
        description: 'Polarization',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Topic',
        id: '600f4a12ae13a42504eb1fcc',
      },
      {
        _id: '600f4a13ae13a42504eb1fce',
        parentId: '600f4a12ae13a42504eb1fcc',
        subject: 'Question of Polarization',
        description: 'How will you bring both sides back together?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
      ...
 ]
*/

export default async function getTopicsAndQuestions(id, round, cb) {
  if (!this.synuser) return cb && cb() // if no user do nothing
  try {
    const results = await Iota.aggregate([
      { $match: { parentId: id, webComponent: 'Topic' } },
      { $sample: { size: 10 } },
      { $set: { id: { $toString: '$_id' } } },
      {
        $lookup: {
          from: 'iotas',
          localField: 'id',
          foreignField: 'parentId',
          as: 'qObjs',
        },
      },
    ])
    const topicsAndQuestions = []
    results.forEach(topic => {
      let questions = topic.qObjs
      delete topic.qObjs
      topicsAndQuestions.push(topic)
      topicsAndQuestions.push(...questions)
    })
    cb && cb(topicsAndQuestions)
  } catch (err) {
    logger.error('getTopicsAndQuestions', err)
    cb && cb()
  }
}
/*
async function main() {
  await Iota.connect({ uri: process.env.MONGODB_URI }, { useUnifiedTopology: true })
  getTopicsAndQuestions.call({ synuser: '123' }, '600f2e3d7be64409f0387718', 0, results => {
    console.log(JSON.stringify(results, null, 2))
  })
}
main()
*/
