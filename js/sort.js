//run: avg = worst = O(N2)
//mem = O(1)
function bubbleSort(input) {
  if(input.length === 1) return input
  for(let i = 1; i < input.length; i++) {
    for(let j = 1; j < input.length; j++) {
      if(input[j-1] > input[j]) {
        let temp = input[j]
        input[j] = input[j-1]
        input[j-1] = temp
      }
    }
  }
  return input
}

//USAGE
// console.log(bubbleSort([9,8,7,6,5,4,3,2,1]))
//
// console.log(bubbleSort([100]))
//
// console.log(bubbleSort([1,2,3]))
//
// console.log(bubbleSort([5,5]))
//
// console.log(bubbleSort([1,0,6]))
//
// console.log(bubbleSort([10,-5,3]))

function swapped_array(input) {
  return [input[1], input[0]]
}

function handle_terminals(input) {
  let result = null
  if(input.length === 2) {
    result = swapped_array(input)
  } else {
    result = mergeSort(input)
  }
  return result
}

//run: avg = worst = O(NlogN)
//mem = Depends
function someSort(input) {
  let result = null
  if(input.length === 2) {
    let temp = input[1]
    input[1] = input[0]
    input[0] = temp
    result = input
  } else if(input.length > 2) {
    let half_pos = Math.ceil(input.length/2)
    let left_array = input.slice(0,half_pos)
    let right_array = input.slice(half_pos)
    let left_result, right_result
    left_result = someSort(left_array)
    right_result = someSort(right_array)
    result = left_result.concat(right_result)
  } else
    result = input
  return result
}

//USAGE
console.log(someSort([2,1]))
console.log(someSort([3,2,1]))

function partition(input, start, end)
function quickSort(input) {
  //partitionh
  //quickSort left
  //quickSort right
}
