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
			"100011", "100015", "100013"
		],
	},
	{
		_id: "000000000005",
		round: 1,
		userId: "00000000002",
		topicIds: [
			"100002", "100005"
		],
	},
	{
		_id: "000000000006",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100010", "100015", "100003"
		],
	},
	{
		_id: "000000000007",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100012", "100015"
		],
	},
	{
		_id: "000000000008",
		round: 1,
		userId: "00000000003",
		topicIds: [
			"100005", "100011"
		],
	},
	{
		_id: "000000000009",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100001", "100002", "100009"
		],
	},
	{
		_id: "000000000010",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100012", "100015"
		],
	},
	{
		_id: "000000000011",
		round: 1,
		userId: "00000000004",
		topicIds: [
			"100002", "100012", "100015"
		],
	},
	{
		_id: "000000000012",
		round: 1,
		userId: "00000000005",
		topicIds: [
			"100006", "100012", "100009"
		],
	},
	{
		_id: "000000000013",
		round: 1,
		userId: "00000000005",
		topicIds: [
			"100007", "100015"
		],
	},
	{
		_id: "000000000014",
		round: 1,
		userId: "00000000006",
		topicIds: [
			"100003", "100007"
		],
	},
	{
		_id: "000000000015",
		round: 1,
		userId: "00000000006",
		topicIds: [
			"100006", "100003"
		],
	},
	{
		_id: "000000000016",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100011", "100003"
		],
	},
	{
		_id: "000000000017",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100011", "100015", "100009"
		],
	},
	{
		_id: "000000000018",
		round: 1,
		userId: "00000000007",
		topicIds: [
			"100011", "100013"
		],
	},
	{
		_id: "000000000019",
		round: 1,
		userId: "00000000008",
		topicIds: [
			"100007", "100009"
		],
	},
	{
		_id: "000000000020",
		round: 1,
		userId: "00000000008",
		topicIds: [
			"100011", "100013"
		],
	},
	{
		_id: "000000000021",
		round: 1,
		userId: "00000000009",
		topicIds: [
			"100012", "100015", "100009"
		],
	},
	{
		_id: "000000000022",
		round: 1,
		userId: "00000000009",
		topicIds: [
			"100002", "100012"
		],
	},
	{
		_id: "000000000023",
		round: 1,
		userId: "00000000009",
		topicIds: [
			"100006", "100012", "100002"
		],
	},
	{
		_id: "000000000024",
		round: 1,
		userId: "00000000010",
		topicIds: [
			"100007", "100015", "100002"
		],
	},
	{
		_id: "000000000025",
		round: 1,
		userId: "00000000010",
		topicIds: [
			"100013", "100007"
		],
	},
	{
		_id: "000000000026",
		round: 1,
		userId: "00000000011",
		topicIds: [
			"100006", "100003"
		],
	},
	{
		_id: "000000000027",
		round: 1,
		userId: "00000000011",
		topicIds: [
			"100011", "100003", "100002"
		],
	},
	{
		_id: "000000000028",
		round: 1,
		userId: "00000000012",
		topicIds: [
			"100011", "100015", "100002", "100004"
		],
	},
	{
		_id: "000000000029",
		round: 1,
		userId: "00000000012",
		topicIds: [
			"100011", "100013"
		],
	},
	{
		_id: "000000000030",
		round: 1,
		userId: "00000000012",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000031",
		round: 1,
		userId: "00000000013",
		topicIds: [
			"100011", "100013"
		],
	},
	{
		_id: "000000000032",
		round: 1,
		userId: "00000000013",
		topicIds: [
			"100012", "100015", "100009"
		],
	},
	{
		_id: "000000000033",
		round: 1,
		userId: "00000000014",
		topicIds: [
			"100002", "100012"
		],
	},
	{
		_id: "000000000034",
		round: 1,
		userId: "00000000014",
		topicIds: [
			"100006", "100012", "100002"
		],
	},
	{
		_id: "000000000035",
		round: 1,
		userId: "00000000014",
		topicIds: [
			"100007", "100015", "100002"
		],
	},
	{
		_id: "000000000036",
		round: 1,
		userId: "00000000015",
		topicIds: [
			"100013", "100007"
		],
	},
	{
		_id: "000000000037",
		round: 1,
		userId: "00000000015",
		topicIds: [
			"100006", "100003"
		],
	},
	{
		_id: "000000000038",
		round: 1,
		userId: "00000000016",
		topicIds: [
			"100011", "100003", "100002"
		],
	},
	{
		_id: "000000000039",
		round: 1,
		userId: "00000000016",
		topicIds: [
			"100011", "100015", "100002", "100004"
		],
	},
	{
		_id: "000000000040",
		round: 1,
		userId: "00000000017",
		topicIds: [
			"100011", "100013"
		],
	},
	{
		_id: "000000000041",
		round: 1,
		userId: "00000000017",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000042",
		round: 1,
		userId: "00000000018",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000043",
		round: 1,
		userId: "00000000019",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000044",
		round: 1,
		userId: "00000000019",
		topicIds: [
			"100011", "100015", "100002", "100004"
		],
	},
	{
		_id: "000000000045",
		round: 1,
		userId: "00000000020",
		topicIds: [
			"100013", "100007"
		],
	},
	{
		_id: "000000000046",
		round: 1,
		userId: "00000000020",
		topicIds: [
			"100006", "100003"
		],
	},
	{
		_id: "000000000047",
		round: 1,
		userId: "00000000021",
		topicIds: [
			"100012", "100015"
		],
	},
	{
		_id: "000000000048",
		round: 1,
		userId: "00000000021",
		topicIds: [
			"100010", "100015", "100013"
		],
	},
	{
		_id: "000000000049",
		round: 1,
		userId: "00000000021",
		topicIds: [
			"100012", "100015"
		],
	},
	{
		_id: "000000000050",
		round: 1,
		userId: "00000000022",
		topicIds: [
			"100005", "100011"
		],
	},
	{
		_id: "000000000051",
		round: 1,
		userId: "00000000022",
		topicIds: [
			"100001", "100002", "100009"
		],
	},
	{
		_id: "000000000052",
		round: 1,
		userId: "00000000022",
		topicIds: [
			"100012", "100015", "100005"
		],
	},
	{
		_id: "000000000053",
		round: 1,
		userId: "00000000023",
		topicIds: [
			"100012", "100015", "100005"
		],
	},
	{
		_id: "000000000054",
		round: 1,
		userId: "00000000024",
		topicIds: [
			"100012", "100015", "100005"
		],
	},
	{
		_id: "000000000055",
		round: 1,
		userId: "00000000025",
		topicIds: [
			"100012", "100015", "100005"
		],
	},
	{
		_id: "000000000056",
		round: 1,
		userId: "00000000025",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000057",
		round: 1,
		userId: "00000000026",
		topicIds: [
			"100007", "100003", "100002"
		],
	},
	{
		_id: "000000000058",
		round: 1,
		userId: "00000000027",
		topicIds: [
			"100007", "100003", "100002"
		],
	}
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

var groupings = ss.mode(pairs)
console.info("groupings", groupings)

var map = pairs.reduce(function (obj, b) {    // Counts frequency of each grouping
	obj[b] = ++obj[b] || 1;
	return obj;
}, {});
console.info("map", map)

var myArguments = [map];                      // Sort map from high to low
var sortedArguments = [];

function highest(myArguments) {
	return myArguments.sort(function (a, b) {
		return b - a;
	});
}
sortedArguments = highest(myArguments);
console.info("sortedArguments", sortedArguments)