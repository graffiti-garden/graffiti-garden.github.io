export default {
  data: ()=> ({ word: '' }),

  template: `
    Search for a definition: <input v-model="word"/>

    <h1>{{word}}</h1>

    <slot :word="word"></slot>`
}
