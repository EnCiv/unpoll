/*const topic_associations={
   _id: '_id',
   round: number
   topicsIds: [],
   userId: string
}
*/
/*
100 users - user id’s 1 … 100
2 topics per users - topicIds - 100001 - 100200  

*/

//import * as ss from 'simple-statistics';
const ss = require('simple-statistics')

const data = [
	{
		_id: "000000000001",
		round: 1,
		userId: "00000000001",
		topicIds: [
			"100001", "100002"
		]
	},
	{
		_id: "000000000002",
		round: 1,
		userId: "00000000001",
		topicIds: [
			"100005", "100007"
		],
	},
	{
		_id: "000000000003",
		round: 1,
		userId: "00000000002",
		topicIds: [
			"100005", "100007", "100009"
		],
	},
	{
		_id: "000000000004",
		round: 1,
		userId: "00000000002",
		topicIds: [
			"100011", "100015", "100023"
		],
	},
	{
		_id: "000000000005",
		round: 1,
		userId: "00000000002",
		topicIds: [
			"100022", "100035",
		],
	},
	{
		_id: "000000000006",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100010", "100015",
		],
	},
	{
		_id: "000000000007",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100012", "100015",
		],
	},
	{
		_id: "000000000008",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100005", "100011",
		],
	},
	{
		_id: "000000000009",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100009", "100011",
		],
	},
	{
		_id: "000000000010",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100012", "100015",
		],
	},
	{
		_id: "000000000011",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100020", "100012",
		],
	},
	{
		_id: "000000000012",
		round: 1,
		userId: "00000000005",
		topicIds: [
			"100006", "100012",
		],
	},
	{
		_id: "000000000013",
		round: 1,
		userId: "00000000005",
		topicIds: [
			"100007", "100015",
		],
	},
	{
		_id: "000000000014",
		round: 1,
		userId: "00000000006",
		topicIds: [
			"100013", "100017",
		],
	},
	{
		_id: "000000000015",
		round: 1,
		userId: "00000000006",
		topicIds: [
			"100006", "100030",
		],
	},
	{
		_id: "000000000016",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100021", "100030",
		],
	},
	{
		_id: "000000000017",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100011", "100015",
		],
	},
	{
		_id: "000000000018",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100020", "100030",
		],
	},
	{
		_id: "000000000019",
		round: 1,
		userId: "00000000008",
		topicIds: [
			"100007", "100030",
		],
	},
	{
		_id: "000000000020",
		round: 1,
		userId: "00000000008",
		topicIds: [
			"100021", "100033",
		],
	},
]

function processAssociations(round) {
	arrayofAssociations = [
		{
			_id: "200000",
			topicIds: ["100005", "100007"],
			weight: 0.6666666 // not sure if relevant
		}
	]
	return arrayOfAssociations

}

/*
		topicIds: [
			"100011", "100015", "100023", "111111"
		],
		100011-100015
		100011-100023
		100011-111111
		100015-100023
		100015-111111
		100023-111111

*/

function combinatorial(acc, topicIds) { // note that topicIds will get eaten
	const l = topicIds.length
	if (l > 2) {
		let id = topicIds.shift()
		topicIds.forEach(secondId => {
			acc.push(id + "-" + secondId)
		})
		combinatorial(acc, topicIds)
	} else if (l == 2) {
		acc.push(topicIds[0] + "-" + topicIds[1]) // "100005-100007"
	}
}

function createPairs(associations) {
	let result = associations.reduce((acc, association) => {
		let topicIds = association.topicIds.slice().sort((a, b) => a < b ? -1 : a > b ? 1 : 0) // make sure its sorted with lowest first
		if (topicIds.length < 2) return acc
		combinatorial(acc, topicIds)
		return acc
	}, [])
	return result
}

var pairs = createPairs(data)
console.info("pairs", pairs)
//mode([0, 0, 1]);
var groupings = ss.mode(pairs)
console.info("groupings", groupings)