var densityClustering = require('density-clustering');

var dbscan_res = function (statements, Epsilo, MinPts) {
    // cluster on description values
    var data = statements.map(s => [s.description]);

    // configure the DBSCAN algorithm with epsilon and minPts parameters
    var dbscan = new densityClustering.DBSCAN();
    // run the DBSCAN clustering algorithm on the data
    var clustersDBSCAN = dbscan.run(data, Epsilo, MinPts);
    console.log('dbscanRes:\n');
    console.log(clustersDBSCAN);

    return clustersDBSCAN;
}

var optics_res = function (statements, Epsilo, MinPts) {
    // cluster on description values
    // convert the statements array into a two-dimensional array data
    var data = statements.map(s => [s.description]);

    // configure the DBSCAN algorithm with epsilon and minPts parameters
    var optics = new densityClustering.OPTICS();
    // run the OPTICS clustering algorithm on the data
    var clustersOPTICS = optics.run(data, Epsilo, MinPts);
    // print out the resulting clusters
    var plot = optics.getReachabilityPlot();
    console.log('opticsRes:\n');
    console.log(clustersOPTICS, plot);

    return clustersOPTICS;
}

var cluster = require('hierarchical-clustering');

// var calculate_mean = function (set) {
//     var sum = 0;
//     for (let i = 0; i < set.length; i++) {
//         sum += set[i].description;
//     }
//     return sum / (set.length + 1);
// }
// Euclidean distance
function distance(a, b) {
    // var meanA = calculate_mean(a); // get the mean of set A
    // var meanB = calculate_mean(b); // get the mean of set B
    return Math.abs(a - b); // compute the absolute difference between the means of set A and set B as the distance

}

// Single-linkage clustering
function linkage(distances) {
    return Math.min.apply(null, distances);
}

var hierarchical_res = function (groups) {
    var data = groups.map(group => Array.from(group.groupings.flat())); // flatten the groupings data into an array of sets
    console.log('data:\n');
    console.log(data);
    // cluster on description values
    var levels = cluster({
        input: data,
        distance: distance,
        linkage: linkage,
    });

    var clusters = levels[levels.length - 1].clusters;
    console.log(clusters);
    clusters = clusters.map(function (cluster) {
        return cluster.map(function (index) {
            return data[index];
        });
    });
    console.log('hierarchical_Res:\n');
    console.log(clusters);
    return clusters;

}

module.exports = {
    dbscan_res,
    optics_res,
    hierarchical_res
}