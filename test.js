const numbers = [5, 9, 11, 6, 3, 8, 20, 22, 17, 16, 25, 24, 27, 28, 31, 34, 30, 29, 35, 38];

const groups = [];

let currentGroup = new Set();

let array = numbers.sort(function (a, b) { return a - b });
console.log(array);
currentGroup.add(array[0]);
for (let i = 1; i < numbers.length; i++) {
    const prevNum = Array.from(currentGroup)[currentGroup.size - 1];
    if (numbers[i] - prevNum <= 1) {
        currentGroup.add(numbers[i]);
    } else {
        groups.push(currentGroup);
        currentGroup = new Set();
        currentGroup.add(numbers[i]);
    }
}

// Add the last group
groups.push(currentGroup);

console.log(groups);
