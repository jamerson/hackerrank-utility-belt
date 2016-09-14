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

function countAndMatrix(input, callback) {
    var lines = splitLines(input)
    var array_size = parseInt(lines[0])
    var result = new Array(array_size)
    for(var i = 0; i < array_size; i++) {
        result[i] = new Array(array_size)
        for(var j = 0; j < array_size; j++) {
            result[i][j] = callback(lines[i+1].charAt(j))
        }
    }
    return result
}

function traverseMatrix(matrix, callback) {
    var r = matrix.length
    for(var i = 0; i < r; i++) {
        traverseLine(matrix, i,  callback)
    }
}

function traverseLine(matrix, line_num, callback) {
    var c = matrix[line_num].length
    for(var j = 0; j < c; j++) {
        callback(matrix[line_num][j], line_num, j, matrix)
    }
}

function goToDirection(matrix, x, y, direction, stop_at, callback) {
    var x_offset = 0
    var y_offset = 0

    switch(direction) {
        case 'up':
            x_offset = -1
            y_offset = 0
            break
        case 'down':
            x_offset = 1
            y_offset = 0
            break
        case 'left':
            x_offset = 0
            y_offset = -1
            break
        case 'right':
        default:
            x_offset = 0
            y_offset = 1
            break
    }

    var stop_flag = false
    x += x_offset
    y += y_offset
    while(x < matrix.length && x >= 0 && y < matrix.length && y >= 0 && stop_at.indexOf(matrix[x][y]) < 0 && !stop_flag) {
        stop_flag = callback(matrix[x][y], x, y, matrix)
        x += x_offset
        y += y_offset
    }
}

function result(value) {
    console.log(value)
}

function processData(input) {
    var matrix = countAndMatrix(input, (value) => {
        return value
    })
    traverseMatrix(matrix, (item, x, y, matrix) => {
        if(item === '.') {
            var r_count = 0
            goToDirection(matrix, x, y, 'right', ['*'], (item, x, y, matrix) => {
                var result = item === '*';
                if(!result)
                    r_count += 1
                return result
            })
            console.log(r_count)
        }
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
