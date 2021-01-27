'use strict'

import { Iota } from 'civil-server'

export default async function getTopicsInBinsAndQuestions(id, round, cb) {
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
    const topicBins = []
    results.forEach(topic => {
      let questions = topic.qObjs
      delete topic.qObjs
      const topic_bin = {
        leadTopicObj: topic,
        topicObjs: [topic],
        questionObjs: questions,
      }
      topicBins.push(topic_bin)
    })
    cb && cb(topicBins)
  } catch (err) {
    logger.error('getTopicsInBinsAndQuestions', err)
    cb && cb()
  }
}
/*
async function main(){
    await Iota.connect({ uri: process.env.MONGODB_URI }, { useUnifiedTopology: true })
    getTopicsInBinsAndQuestions.call({synuser: "123"},"600f2e3d7be64409f0387718",0,results=>{
        console.log(results)
    })
}
main()
*/
