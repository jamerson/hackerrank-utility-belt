function processData(input) {
    var lines = input.split('\n')
    var T = parseInt(lines[0])

    for(var i = 1; i <= T; i++) {
        var K = parseInt(lines[i])

        var f1 = 1;
        var f2 = 2;
        var min_factor = null
        var min_fib = false
        for(var j = 2; j <= K && !min_factor; j++) {
            if(K%j === 0) {
                min_factor = j
            }
        }

        while(!min_fib) {
            //console.log(f2, min_factor, f2 % min_factor)
            if(f2 % min_factor === 0) {
                min_fib = f2
            }
            var ftemp = f2
            f2 = f2 + f1
            f1 = ftemp
        }

        console.log(min_fib, min_factor)
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
