function get_line(control) {
    var line = control.cur_line()
    var result = line.split(' ')
    return result
}
function get_block(control) {
    var n = control.cur_line()
    var result = {
        grid: new Array(n),
        size: n
    }
    for(var i = 0; i < n; i++) {
        result.grid[i] = get_line(control)
    }
    return result
}

function get_t(control) {
    control.pos = 0
    control.t = parseInt(control.cur_line())
    control.blocks = new Array(control.t)
    for(var i = 0; i < control.t; i++) {
        control.blocks[i] = get_block(control)
    }
}

function in_limit(n, x, y) {
    var result = false;

    if(x >= 0 && x < n && y >= 0 && y < n) {
        result = true
    }

    return result
}

function rvisit(block, x, y) {
    var n = block.size
    //console.log(x, y)
    if(block.grid[x][y] === '1') {
        block.grid[x][y] = '2'
        if(in_limit(n, x - 1, y - 1)) {
            //console.log('d')
            rvisit(block, x - 1, y - 1)
        }
        if(in_limit(n, x - 1, y)) {
            //console.log('e')
            rvisit(block, x - 1, y)
        }
        if(in_limit(n, x - 1, y + 1)) {
            //console.log('f')
            rvisit(block, x - 1, y + 1)
        }
        if(in_limit(n, x, y - 1)) {
            //console.log('g')
            rvisit(block, x, y - 1)
        }
        if(in_limit(n, x, y + 1)) {
            //console.log('h')
            rvisit(block, x, y + 1)
        }
        if(in_limit(n, x + 1, y - 1)) {
            //console.log('a')
            rvisit(block, x + 1, y - 1)
        }
        if(in_limit(n, x + 1, y)) {
            //console.log('b')
            rvisit(block, x + 1, y)
        }
        if(in_limit(n, x + 1, y + 1)) {
            //console.log('c')
            rvisit(block, x + 1, y + 1)
        }
    }
}
function processData(input) {
    var control = {
        lines: input.split('\n'),
        pos: 0,
        cur_line: function() {
            return this.lines[this.pos++]
        }
    }

    get_t(control)

    var result = 0

    for(var i = 0; i < control.blocks.length; i++) {
        var block = control.blocks[i]
        block.result = 0
        for(var j = 0; j < block.size; j++) {
            //console.log('x', j)
            for(var k = 0; k < block.size; k++) {
                //console.log('y', k)
                if(block.grid[j][k] === '1') {
                    block.result += 1
                    rvisit(block, j, k)
                }
            }
        }
    }
    for(var i = 0; i < control.blocks.length; i++) {
        var block = control.blocks[i]
        console.log(block.result)
    }

}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
