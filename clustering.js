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

const { agnes } = require('ml-hclust');

var hierarchical_res = function (statements) {
    // cluster on description values
    var data = statements.map(s => [s.description]);
    const tree = agnes(data, {
        method: 'ward',
    });
    console.log('hierarchical_Res:\n');
    console.log(tree);
    return tree;

}

module.exports = {
    dbscan_res,
    optics_res,
    hierarchical_res
}