// PART1: generate date
var generate = require('./generate_data')
// Generate test data for users, statements, and groups
var users = [];
var statements = [];
var groups = [];
const TOTALUSERS = 100;
const NUMBERBOUNDARY = 20;
const USERSTATEMENTS = 2;
const OTHERSTATEMENTS = 18;
const TYPE1 = 49;
const TYPE2 = 49;

users = generate.generate_users(TOTALUSERS);
statements = generate.generate_statements(TOTALUSERS, USERSTATEMENTS, NUMBERBOUNDARY);
groups = generate.generate_groups(TOTALUSERS, USERSTATEMENTS, OTHERSTATEMENTS, TYPE1, TYPE2);

// console.log('Users:\n');
// console.log(users);
// console.log('\nStatements:');
// console.log(statements);
// console.log('\nGroups:');
// console.log(groups);

var groupings = [];

// get the agree groups results here
groupings = generate.calculateGroupings(statements, groups);

console.log('\nGroupRes:');
console.log(groupings);


// PART 2: clustering algroithm

// // Type1: DBSCAN
// var clustering = require('./clustering')
// var EPSILON = 1; // the maximum distance between two points to be considered as part of the same cluster
// var MINPTS = 5;  // the minimum number of points required to form a cluster
// var dbscanRes = [];
// var opticsRes = [];

// var hierarchicalRes = [];

// // dbscanRes = clustering.dbscan_res(statements, EPSILON, MINPTS);
// // opticsRes = clustering.optics_res(statements, EPSILON, MINPTS);
// hierarchicalRes = clustering.hierarchical_res(groups);

// // console.log('dbscanRes:\n');
// // console.log(dbscanRes);

// // console.log('opticsRes:\n');
// // console.log(opticsRes);

// console.log('hierarchicalRes:\n');
// console.log(hierarchicalRes);