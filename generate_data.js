const ObjectID = require('isomorphic-mongo-objectid/src/isomorphic-mongo-objectid');

var users = [];
var statements = [];
var groups = [];

var generate_users = function (total_users) {
    for (let i = 0; i < total_users; i++) {
        var userId = ObjectID().toString();
        users.push(userId);
    }
    return users;
}

var generate_statements = function (total_users, user_statements, number_boundary) {
    for (let i = 0; i < total_users; i++) {
        var user_Id = users[i];

        // Generate 2 statements for each user
        for (let j = 0; j < user_statements; j++) {
            var statement = {
                _id: ObjectID(),
                description: Math.floor(Math.random() * number_boundary),
                userId: user_Id,
            };
            statements.push(statement);
        }
    }

    return statements;
}


var generate_groups = function (total_users, user_statements, other_statements, type1, type2) {
    const diff1Groupings = Math.floor(total_users * type1 / 100);
    const diff2Groupings = Math.floor(total_users * (type1 + type2) / 100);

    // Generate groups for user
    for (let i = 0; i < total_users; i++) {

        // select 2 statements from this user and 18 statements from other users 
        const user_Id = users[i];
        const userStatements = statements.filter((statement) => statement.userId === user_Id);
        const otherStatements = statements.filter((statement) => statement.userId !== user_Id);
        const allStatements = [];
        // save all statements
        const statementsPoll = [];
        // remove duplicate statements
        const userStatementIds = new Set();
        for (let j = 0; j < user_statements; j++) {
            allStatements.push(userStatements[j]._id);
            statementsPoll.push(userStatements[j]);
            userStatementIds.add(userStatements[j]._id);
        }
        for (let j = 0; j < other_statements; j++) {
            const otherStatement = otherStatements[Math.floor(Math.random() * otherStatements.length)];
            if (!userStatementIds.has(otherStatement._id)) {
                allStatements.push(otherStatement._id);
                statementsPoll.push(otherStatement);
                userStatementIds.add(otherStatement._id);
            } else {
                j--;
            }
        }
        for (let j = 2; j < userStatements.length; j++) {
            if (!userStatementIds.has(userStatements[j]._id)) {
                allStatements.push(userStatements[j]._id);
                statementsPoll.push(userStatements[j]);
                userStatementIds.add(userStatements[j]._id);
            }
        }
        for (let j = allStatements.length; j < 20; j++) {
            const otherStatement = otherStatements[Math.floor(Math.random() * otherStatements.length)];
            if (!userStatementIds.has(otherStatement._id)) {
                allStatements.push(otherStatement._id);
                statementsPoll.push(otherStatement);
                userStatementIds.add(otherStatement._id);
            } else {
                j--;
            }
        }

        // generate groups for each user
        const groupings = [];
        let array = statementsPoll.sort(function (a, b) { return a.description - b.description });

        // console.log("UserID=\n");
        // console.log(user_Id);
        // console.log("ARRAY:\n");

        // for (let k = 0; k < array.length; k++) {
        //     console.log(statementsPoll[k]._id + " " + statementsPoll[k].userId + " " + statementsPoll[k].description + " ");
        // }


        let currentGroup = new Set();
        currentGroup.add(array[0]);

        // choose the user type
        if (i < diff1Groupings) {
            // type1
            for (let j = 1; j < statementsPoll.length; j++) {
                const prevNum = Array.from(currentGroup)[currentGroup.size - 1].description;
                if (statementsPoll[j].description - prevNum <= 1) {
                    currentGroup.add(statementsPoll[j]);
                } else {
                    groupings.push(currentGroup);
                    currentGroup = new Set();
                    currentGroup.add(statementsPoll[j]);
                }
            }
            // Add the last group
            groupings.push(currentGroup);

        } else if (diff1Groupings <= i && i < diff2Groupings) {
            // type2
            for (let j = 1; j < statementsPoll.length; j++) {
                const prevNum = Array.from(currentGroup)[currentGroup.size - 1].description;
                if (statementsPoll[j].description - prevNum <= 2) {
                    currentGroup.add(statementsPoll[j]);
                } else {
                    groupings.push(currentGroup);
                    currentGroup = new Set();
                    currentGroup.add(statementsPoll[j]);
                }
            }
            // Add the last group
            groupings.push(currentGroup);
        }


        // console.log("GROUPINGS:\n");
        // console.log(groupings);

        // save groups date
        groups.push({
            _id: ObjectID(),
            userId: user_Id,
            groupings: groupings,
            allStatements: allStatements,
        });
    }

    return groups;

}

// Define a function to generate pairs of statement IDs
var generatePairs = function (statements) {
    const pairs = [];
    for (let i = 0; i < statements.length; i++) {
        for (let j = i + 1; j < statements.length; j++) {
            pairs.push([statements[i]._id, statements[j]._id]);
        }
    }

    // console.log('\npairs:');
    // console.log(pairs);

    return pairs;
}

var calculatePairAgreement = function (pair, groups) {
    let agreeCount = 0;
    let totalCount = 0;
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i].groupings;
        // console.log('\nThis group:');
        // console.log(group);
        let foundA = false;
        let foundB = false;
        for (let j = 0; j < group.length; j++) {
            const statements = Array.from(group[j]);
            // console.log('\nThis statement:');
            // console.log(statements);
            for (let k = 0; k < statements.length; k++) {
                if (statements[k]._id == pair[0]) {
                    foundA = true;
                }
                if (statements[k]._id == pair[1]) {
                    foundB = true;
                }
            }
        }
        if (foundA && foundB) {
            agreeCount++;
        }
        if (foundA || foundB) {
            totalCount++;
        }
    }
    // console.log('\nThis pair:');
    // console.log(pair);
    // console.log('\nThis agreeCount:');
    // console.log(agreeCount);
    // console.log('\nThis totalCount:');
    // console.log(totalCount);
    // console.log('\nagree rate:');
    var res = agreeCount / totalCount;
    // console.log(res);
    return totalCount > 0 && agreeCount / totalCount > 0.1;
}

var calculateGroupings = function (statements, groups) {
    const pairs = generatePairs(statements);
    const groupedPairs = new Set();
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].sort();
        if (!groupedPairs.has(pair)) {
            if (calculatePairAgreement(pair, groups)) {
                groupedPairs.add(pair);
            }
        }
    }
    const groupings = [];
    for (const pair of groupedPairs) {
        let foundGroup = false;
        for (let i = 0; i < groupings.length; i++) {
            const group = groupings[i];
            if (group.includes(pair[0]) || group.includes(pair[1])) {
                group.push(pair[0], pair[1]);
                foundGroup = true;
                break;
            }
        }
        if (!foundGroup) {
            groupings.push([pair[0], pair[1]]);
        }
    }
    return groupings;
}


module.exports = {
    generate_users,
    generate_statements,
    generate_groups,
    generatePairs,
    calculateGroupings,
}