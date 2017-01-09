function isAlpha(char) {
    return ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'].indexOf(char.toLowerCase()) >= 0
}

let corrects = ["a"]

function isRightWord(word) {
    return corrects.indexOf(word.toLowerCase()) >= 0
}

function processData(input) {
    let alphaStartPosition = -1, phraseStartPosition = -1, phraseEndPosition = -1, found = false, correctCount = 0
    for(let i = 0; i < input.length; i++) {
        let char = input[i]
        if(!isAlpha(char) || i === input.lenght - 1) {
            if(alphaStartPosition) {
                if(!isRightWord(input.substring(alphaStartPosition, i))) {
                    phraseStartPosition = -1
                } else {
                    correctCount += 1
                }
                alphaStartPosition = -1
            }
        } else {
            if(alphaStartPosition < 0) alphaStartPosition = i
            if(phraseStartPosition < 0) phraseStartPosition = i
        }

        if(correctCount === corrects.length) {
            phraseEndPosition = i
            found = true
            console.log(input.substring(phraseStartPosition, phraseEndPosition))
        }
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
