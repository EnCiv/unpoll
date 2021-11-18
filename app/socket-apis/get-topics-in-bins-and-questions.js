'use strict'

import { Iota } from 'civil-server'

/*
const example = [
  {
    topicObjs: [
      {
        _id: '6019be3ca27514233cfe1ebd',
        parentId: '600f2e3d7be64409f0387718',
        subject: 'Topic of Unmob-Question',
        description: 'Drugs',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Topic',
        id: '6019be3ca27514233cfe1ebd',
      },
    ],
    questionObjs: [
      {
        _id: '6019be3da27514233cfe1ebf',
        parentId: '6019be3ca27514233cfe1ebd',
        subject: 'Question of Drugs',
        description: 'What are drugs illegal?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    topicObjs: [
      {
        _id: '600f4a12ae13a42504eb1fcc',
        parentId: '600f2e3d7be64409f0387718',
        subject: 'Topic of Unmob-Question',
        description: 'Polarization',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Topic',
        id: '600f4a12ae13a42504eb1fcc',
      },
    ],
    questionObjs: [
      {
        _id: '600f4a13ae13a42504eb1fce',
        parentId: '600f4a12ae13a42504eb1fcc',
        subject: 'Question of Polarization',
        description: 'How will you bring both sides back together?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '6019bdefa27514233cfe1eb5',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Poverty',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '6019bdefa27514233cfe1eb5',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '6019bdf0a27514233cfe1eb7',
        parentId: '6019bdefa27514233cfe1eb5',
        subject: 'Question of Poverty',
        description: 'What about a minimum wage?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '6019bee8a27514233cfe1ecc',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Traffic',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '6019bee8a27514233cfe1ecc',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '6019bee8a27514233cfe1ece',
        parentId: '6019bee8a27514233cfe1ecc',
        subject: 'Question of Traffic',
        description: 'How can we make new roads cheaper and faster to build?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '6019be89a27514233cfe1ec5',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Abortion',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '6019be89a27514233cfe1ec5',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '6019be89a27514233cfe1ec7',
        parentId: '6019be89a27514233cfe1ec5',
        subject: 'Question of Abortion',
        description: 'Is there a resolution to the Abortion issue that both sides can be proud of?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '600f931d63c84e2338410c03',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Democratic Improvement',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '600f931d63c84e2338410c03',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '600f931e63c84e2338410c05',
        parentId: '600f931d63c84e2338410c03',
        subject: 'Question of Democratic Improvement',
        description: 'What do you think about term limits?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '6019bee8a27514233cfe1ecd',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Roads',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '6019bee8a27514233cfe1ecd',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '6019bee9a27514233cfe1ecf',
        parentId: '6019bee8a27514233cfe1ecd',
        subject: 'Question of Roads',
        description: 'What do you propose we do about all the traffic?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '600f4a13ae13a42504eb1fcd',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'National Debt',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '600f4a13ae13a42504eb1fcd',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '600f4a13ae13a42504eb1fcf',
        parentId: '600f4a13ae13a42504eb1fcd',
        subject: 'Question of National Debt',
        description: 'How will we pay back all the debt we are mounting during the COVID-19 epidemic?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '600f45b8e9373a373c4ef4ec',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Healthcare',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '600f45b8e9373a373c4ef4ec',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '600f45b8e9373a373c4ef4ed',
        parentId: '600f45b8e9373a373c4ef4ec',
        subject: 'Question of Healthcare',
        description: 'How to we rework the system?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
  {
    leadTopicObj: {
      _id: '600f931d63c84e2338410c04',
      parentId: '600f2e3d7be64409f0387718',
      subject: 'Topic of Unmob-Question',
      description: 'Immigration',
      userId: '600f45650a44473b1813a375',
      webComponent: 'Topic',
      id: '600f931d63c84e2338410c04',
    },
    topicObjs: [],
    questionObjs: [
      {
        _id: '600f931e63c84e2338410c06',
        parentId: '600f931d63c84e2338410c04',
        subject: 'Question of Immigration',
        description: 'What is your position on immigration?',
        userId: '600f45650a44473b1813a375',
        webComponent: 'Question',
      },
    ],
  },
]
*/

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
        //leadTopicObj: topic,
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
async function main() {
  await Iota.connect({ uri: process.env.MONGODB_URI }, { useUnifiedTopology: true })
  getTopicsInBinsAndQuestions.call({ synuser: '123' }, '600f2e3d7be64409f0387718', 0, results => {
    console.log(JSON.stringify(results, null, 2))
  })
}
main()
*/
