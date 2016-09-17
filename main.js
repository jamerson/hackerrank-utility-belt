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

function result(value) {
    console.log(value)
}

function processData(input) {
    var matrix = countAndMatrix(input, (value) => {
        return value
    })
    var radix = -1
    var current_radix = -1
    traverseMatrix(matrix, (item, x, y, matrix) => {
        var r_radix = -1
        var u_radix = -1
        if(item === '.') {
            var r_count = 0, l_count = 0, u_count = 0, d_count = 0
            // r_count = goToDirection(matrix, x, y, 'right', ['*'], (item, x, y, matrix) => {
            //     return false
            // })
            // l_count = goToDirection(matrix, x, y, 'left', ['*'], (item, x, y, matrix) => {
            //     return false
            // })
            // u_count = goToDirection(matrix, x, y, 'up', ['*'], (item, x, y, matrix) => {
            //     return false
            // })
            // d_count = goToDirection(matrix, x, y, 'down', ['*'], (item, x, y, matrix) => {
            //     return false
            // })
            // if((r_count === l_count && r_count === u_count && r_count === d_count)) {
            //     if(r_count > r_radix) {
            //         r_radix = r_count
            //     }
            // }

            r_count = 0, l_count = 0, u_count = 0, d_count = 0
            u_count = goToDirection(matrix, x, y, 'up', ['*'], -1, (item, row, col, matrix) => {
                //console.log(x, y, row, col)
                return false
            })
            //console.log(u_count)
            d_count = goToDirection(matrix, x, y, 'down', ['*'], u_count, (item, x, y, matrix) => {
                return false
            })
            //console.log(d_count)
            r_count = goToDirection(matrix, x, y, 'right', ['*'], u_count, (item, x, y, matrix) => {
                return false
            })
            //console.log(r_count)
            l_count = goToDirection(matrix, x, y, 'left', ['*'], u_count, (item, x, y, matrix) => {
                return false
            })
            //console.log(l_count)

            if((u_count === l_count && u_count === r_count && u_count === d_count)) {
                if(u_count > u_radix) {
                    u_radix = u_count
                }
            }
            current_radix = u_radix > r_radix ? u_radix:r_radix
            if(current_radix > radix)
                radix = current_radix
        }
    })
    console.log(radix)
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
