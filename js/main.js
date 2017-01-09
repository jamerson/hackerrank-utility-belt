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

//Creates a NxN matrix and call a function for each element before saving it to the array
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

function traverseArray(array, size, callback) {
    for(var i = 0; i < size; i++) {
        callback(array[i], i, array)
    }
}

function goToDirection(matrix, x, y, direction, stop_at, max_count, callback) {
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

    if(max_count <= 0) {
        max_count = matrix.length
    }

    var stop_flag = false
    x += x_offset
    y += y_offset
    var result_count = 0
    while(x < matrix.length && x >= 0 && y < matrix.length && y >= 0 && stop_at.indexOf(matrix[x][y]) < 0 && !stop_flag && result_count < max_count) {
        stop_flag = callback(matrix[x][y], x, y, matrix)
        x += x_offset
        y += y_offset
        result_count += 1
    }

    return result_count
}


function convertToarray(line) {
    return line.split(' ')
}

function processData(input) {
    var lines = splitLines(input)
    var n = parseInt(lines[0])
    var array1 = convertToarray(lines[1])
    var array2 = convertToarray(lines[2])
    var min_idx = n + 1
    var res = 2001
    traverseArray(array1, n, (it1, idx1) => {
        traverseArray(array2,n ,(it2, idx2) => {
            if(it2 === it1) {
                var temp = Math.abs(idx2 - idx1)
                if(temp <= min_idx) {
                    if(min_idx == temp) {
                        if(it1 < res) {
                            res = it1
                        }
                    } else  {
                        min_idx = temp
                        res = it1
                    }

                }
            }
        })
    })
    console.log(res)
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
