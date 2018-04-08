[{
  id:'/#ertyu',
  name:'jake',
  room: 'chatroom'
}]

//addUser
//removeUser
//getUser(id)
//getUserList(room)

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

class Users {

  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id)
    }
    //return user that was removed
    return user;
  }

  getUser(id) {
    // will return the user or undefine
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    // var users = this.users.filter((user) => {
    //   return user.room === room;
    // });
    //
    // var namesArray = users.map((user) => {
    //   return user.name;
    // });
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};
