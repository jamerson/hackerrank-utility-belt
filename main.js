const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;
    processData(data);
});
////

function splitLines(input) {
    return input.split('\n')
}

function countAndLines(input, callback) {
    var lines = splitLines(input)

    var n = parseInt(lines[0])
    for(var i = 0; i < n; i++) {
        callback(lines[i + 1], i)
    }
}

function puts(value) {
    console.log(value)
}

function result(value) {
    console.log(value)
}

function processData(input) {
    countAndLines(input, (line, index) => {
        var count = parseInt(line)
        result(count % 2 === 0?'Yes':'No')
    })
}

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
// });
//
// process.stdin.on("end", function () {
//    processData(_input);
// });
