function createNode(data) {
  return {
    data: data
  }
}

function createLinkedList(doubly_linked = false, compare_callback = null) {
  return {
    head: null,
    tail: null,
    compare_callback: compare_callback,
    doubly_linked: doubly_linked,
    append: function(data) {
      let node = createNode(data)
      if(!this.head) {
        this.head = this.tail = node
        node.next = null
        node.prev = null
      } else {
        this.tail.next = node
        if(doubly_linked) {
          node.prev = this.tail
        }
        node.next = null
        this.tail = node
      }
    },
    push: function(data) {
      let node = createNode(data)
      if(!this.head) {
        this.head = this.tail = node
        node.next = null
        node.prev = null
      } else {
        if(doubly_linked) {
          this.head.prev = node
        }
        node.next = this.head
        this.head = node
      }
    },
    add: function(data) {
      if(this.compare_callback) {
        let node = createNode(data)
        if(!this.head) {
          this.head = this.tail = node
          node.next = null
          node.prev = null
        } else {
          let current_node = this.head
          let prev_node = null
          let found = false
          while(current_node && !found) {
            if(this.compare_callback(node.data, current_node.data) < 1) {
              found = true
            } else {
              prev_node = current_node
              current_node = current_node.next
            }
          }
          if(!found) {
            this.tail.next = node
            if(doubly_linked) {
              node.prev = this.tail
            }
            this.tail = node
          } else {
            node.next = current_node
            if(doubly_linked) {
              current_node.prev = node
            }
            if(prev_node) {
              prev_node.next = node
              if(doubly_linked) {
                node.prev = prev_node
              }
            }
            if(current_node === this.head) {
              this.head = node
            }
          }
        }
      } else {
        this.append(data)
      }
    },
    delete: function(match_callback) {
      let current_node = this.head
      let prev_node = null
      let found = false
      while(current_node && !found) {
        found = match_callback(current_node.data)
        if(!found) {
          prev_node = current_node
          current_node = current_node.next
        }
      }
      if(found) {
        if(prev_node) {
          prev_node.next = current_node.next
          if(doubly_linked && current_node.next) {
            current_node.next.prev = prev_node
          }
        }
        if(current_node === this.head) {
          this.head = current_node.next
          if(doubly_linked) {
            current_node.prev = this.head
          }
        }
        if(current_node === this.tail) {
          this.tail = prev_node
        }
      }
    },
    deleteAt: function(index) {
      let current_index = -1
      delete(function(data) {
        current_index += 1
        return current_index === index
      })
      // let current_node = this.head
      // let prev_node = null
      // let found = false
      // let current_index = 0
      // while(current_node && !found) {
      //   if(current_index === index) {
      //     found = true
      //   } else {
      //     prev_node = current_node
      //     current_node = current_node.next
      //     current_index += 1
      //   }
      //   if(found) {
      //     if(prev_node) {
      //       prev_node.next = current_node.next
      //       if(doubly_linked && current_node.next) {
      //         current_node.next.prev = prev_node
      //       }
      //     }
      //     if(current_node === this.head) {
      //       this.head = current_node.next
      //       if(doubly_linked) {
      //         current_node.prev = this.head
      //       }
      //     }
      //     if(current_node === this.tail) {
      //       this.tail = prev_node
      //     }
      //   }
      // }
    },
    pop: function() {
      let data = null
      if(this.head) {
        data = this.head.data
        if(this.head === this.tail) {
          this.head = this.tail = null
        } else {
          let new_head = this.head.next
          this.head = new_head
          if(doubly_linked) {
            new_head.prev = null
          }
        }
      }
      return data
    },
    traverse: function(visit_node_callback) {
      let current_node = this.head
      let result_visit = true
      while(current_node && result_visit) {
        result_visit = visit_node_callback(current_node.data)
        current_node = current_node.next
      }
    }
  }
}

//USAGE

function searchInLinkedList(name, linked_list) {
  let found = null
  linked_list.traverse(function(node) {
    if(node.data.name === name) {
      found = node.data
    }

    return found === null
  })
  return found
}

const DOUBLY_LINKED = true
let linked_list = createLinkedList(DOUBLY_LINKED)

function createNodeData(name) {
  return {
    name: name
  }
}

linked_list.append(createNodeData("A"))
linked_list.append(createNodeData("B"))
linked_list.push(createNodeData("C"))

linked_list.traverse(function(data) {
  console.log(data)
  return true
})

console.log(linked_list.pop())
console.log(linked_list.pop())
console.log(linked_list.pop())
console.log(linked_list.pop())


let sorted_linked_list = createLinkedList(DOUBLY_LINKED, function(data1, data2) {
  return parseInt(data1) - parseInt(data2)
})

sorted_linked_list.append(5)
sorted_linked_list.append(10)
sorted_linked_list.append(15)

sorted_linked_list.add(8)
sorted_linked_list.add(1)
sorted_linked_list.add(20)
sorted_linked_list.add(21)
sorted_linked_list.add(0)
sorted_linked_list.add(-1)

sorted_linked_list.traverse(function(data) {
  console.log(data)
  return true
})

let sorted_linked_list2 = createLinkedList(DOUBLY_LINKED, function(data1, data2) {
  return parseInt(data1) - parseInt(data2)
})

sorted_linked_list2.append(1)
sorted_linked_list2.append(2)
sorted_linked_list2.append(3)
sorted_linked_list2.append(4)

// sorted_linked_list2.deleteAt(0)
// sorted_linked_list2.deleteAt(1)
// sorted_linked_list2.deleteAt(1)

sorted_linked_list2.delete(function(data) {
  return data === 2
})

sorted_linked_list2.traverse(function(data) {
  console.log(data)
  return true
})
