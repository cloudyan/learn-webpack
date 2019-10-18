
// test: es module
export function eslog(v) {
  console.log(v);
}

export function xx() {
  console.log('xx')
}

export default {
  hello() {
    console.log('I am es module')
  }
}

class People {
  constructor (name) {
    this.name = name
  }

  sayName () {
    console.log(`Hello there, I'm ${this.name}`)
  }
}
const lily = new People('Lily')
lily.sayName()
