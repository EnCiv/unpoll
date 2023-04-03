const ObjectID = require('isomorphic-mongo-objectid/src/isomorphic-mongo-objectid');

// Generate test data for users, statements, and groups
const users = [];
const statements = [];
const groups = [];
const TOTALSTATEMENTS = 1000;
const NUMBERBOUNDARY = 100;
const USERSTATEMENTS = 2;
const OTHERSTATEMENTS = 18;
const TYPE1 = 49;
const TYPE2 = 49;

// Generate statement data of 1000 users
for (let i = 0; i < TOTALSTATEMENTS; i++) {
    const userId = ObjectID().toString();
    users.push(userId);

    // Generate 2 statements for each user
    for (let j = 0; j < USERSTATEMENTS; j++) {
        const statement = {
            _id: ObjectID(),
            description: Math.floor(Math.random() * NUMBERBOUNDARY),
            userId: userId,
        };
        statements.push(statement);
    }
}
// console.log('Users:\n');
// console.log(users);
// console.log('\nStatements:');
// console.log(statements);


const diff1Groupings = Math.floor(TOTALSTATEMENTS * TYPE1 / 100);
const diff2Groupings = Math.floor(TOTALSTATEMENTS * (TYPE1 + TYPE2) / 100);

// Generate groups for user
for (let i = 0; i < TOTALSTATEMENTS; i++) {

    // select 2 statements from this user and 18 statements from other users 
    const user_Id = users[i];
    const userStatements = statements.filter((statement) => statement.userId === user_Id);
    const otherStatements = statements.filter((statement) => statement.userId !== user_Id);
    const allStatements = [];
    // save all statements
    const statementsPoll = [];
    // remove duplicate statements
    const userStatementIds = new Set();
    for (let j = 0; j < USERSTATEMENTS; j++) {
        allStatements.push(userStatements[j]._id);
        statementsPoll.push(userStatements[j]);
        userStatementIds.add(userStatements[j]._id);
    }
    for (let j = 0; j < OTHERSTATEMENTS; j++) {
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
    console.log("UserID=\n");
    console.log(user_Id);
    console.log("ARRAY:\n");
    for (let k = 0; k < array.length; k++) {
        console.log(statementsPoll[k]._id + " " + statementsPoll[k].userId + " " + statementsPoll[k].description + " ");
    }
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


    console.log("GROUPINGS:\n");
    console.log(groupings);

    // save groups date
    groups.push({
        _id: ObjectID(),
        userId: user_Id,
        groupings: groupings,
        allStatements: allStatements,
    });

}


// type1: 49%   within 1
// type2: 49%   within 2
// type3: 2%



// Print out test data

// console.log('\nGroups:');
// console.log(groups);