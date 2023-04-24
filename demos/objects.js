// Wait until connected
gf.events.addEventListener('connected', async ()=> {

  // Listen for objects in the context
  // of "me" for 1 second in the background.
  async function listener() {
    for await (const object of gf.objects([gf.me], AbortSignal.timeout(1000))) {
      if (Object.keys(object).length > 1) {
        console.log(`I got an object: ${JSON.stringify(object)}`)
      } else {
        console.log(`An object was deleted with ID ${object.id}`)
      }
    }
  }
  listener()

  // Add and then delete an object
  const myObject = gf.post({
    type: 'Note',
    content: 'Hello World!',
    context: [gf.me]
  })
  gf.remove(myObject)
})
