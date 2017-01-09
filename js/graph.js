function createNode(label, data = null) {
  var node = {
    label: label,
    data: data,
    neighbors: []
  }
  return node;
}

function createEdge(from_node, to_node, data = null, two_way = true) {
  var edge = {
    from: from_node,
    to: to_node,
    data: data
  }
  from_node.neighbors.push(edge)
  if(two_way) {
    to_node.neighbors.push(edge)
  }
  return edge;
}

//TODO: This is depth firts, do another with breadth first
//TODO: Big O Complexity
function traverseGraph(node, visit_node_callback, is_visited_callback, visit_edge_callback) {
  let visit_result = visit_node_callback(node)
  if(visit_result) {
    for(let n = 0; n < node.neighbors.length; n++) {
      let neighbor = node.neighbors[n]
      let edge_result = visit_edge_callback(neighbor)
      if(edge_result) {
        let to_node = neighbor.to
        if(!is_visited_callback(to_node)) {
          traverseGraph(to_node, visit_node_callback,is_visited_callback, visit_edge_callback)
        }
      }
    }
  }
}

//USAGE
var courses  = ["Mat", "Hist", "Geo", "Phy", "Que"]
var users = {}
var visited = {}
const MAX_FRIENDS_COUNT = 5
const MAX_LEVELS_COUNT = 3

function createUser(name) {
  let user = {
    name: name,
    courses: []
  }
  let node = createNode(name, user)
  users[name] = node
  return node
}

function addCourse(node, course_name) {
  node.data.courses.push(course_name)
}

function addFriend(user, friend) {
  createEdge(user, friend, null, false)
}

function getUser(name) {
  return users[name]
}

function getCourses(node) {
  return node.data.courses
}

function getFriends(node) {
  return node.data.friends
}

function printAllUsers(node) {
  traverseGraph(
    node,
    /*visit_node_callback(node)*/function(node) {
      console.log("NODE:")
      console.log(node.data)
      visited[node.data.name] = true
      return true
  }, /*is_visited_callback(node)*/function(node) {
    return node.data.name in visited
  },
/*visit_edge_callback(edge)*/function(edge) {
    console.log("EDGE:")
    console.log(edge.from)
    console.log(edge.to)
    return true
})
}

function setupNetwork() {
  console.log('Setup Network Start')

  var user_a = createUser("A")
  var user_b = createUser("B")
  var user_c = createUser("C")
  var user_d = createUser("D")
  var user_e = createUser("E")
  addFriend(user_a,user_b)
  addFriend(user_a,user_c)
  addFriend(user_c,user_b)
  addFriend(user_c,user_d)
  addFriend(user_d,user_e)
  addFriend(user_d,user_b)
  addFriend(user_e,user_a)

  addCourse(user_a, courses[0])
  addCourse(user_b, courses[0])
  addCourse(user_b, courses[1])
  addCourse(user_c, courses[2])
  addCourse(user_c, courses[3])
  addCourse(user_d, courses[3])
  addCourse(user_d, courses[4])
  addCourse(user_e, courses[3])
  addCourse(user_e, courses[4])

  console.log('Setup Network End')

  printAllUsers(user_a)
}

setupNetwork()
