const DBSCAN = require('dbscan');

// assume you have the statements array and want to cluster on description values
const data = statements.map(s => [s.description]);

// configure the DBSCAN algorithm with epsilon and minPoints parameters
const dbscan = new DBSCAN();
dbscan.epsilon = 0.5; // the maximum distance between two points to be considered as part of the same cluster
dbscan.minPoints = 5; // the minimum number of points required to form a cluster

// run the clustering algorithm on the data
const clusters = dbscan.run(data);

// print out the resulting clusters
console.log(clusters);
