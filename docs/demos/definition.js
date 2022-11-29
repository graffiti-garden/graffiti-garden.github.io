export default function({myID, useCollection}) { return {

  props: ['word'],
  setup: (props)=> ({
    definitions: useCollection(()=> ({
      defines: props.word,
      definition: { $type: 'string' },
      _by: myID
    }))
  }),

  data: ()=> ({input: ''}),

  computed: {
    currentDefinition() {
      return this.definitions.length?
        this.definitions.sortBy('-timestamp')[0] :
        { defines: this.word }
    }
  },

  methods: {
    submitDefinition() {
      if (!this.input) return
      this.currentDefinition.definition = this.input
      this.currentDefinition.timestamp = Date.now()
      this.definitions.update(this.currentDefinition)
      this.input = ''
    }
  },

  template: `
    <p v-if="definitions.length">
      {{ currentDefinition.definition }}
    </p>
    <p v-else>
      undefined
    </p>

    <form @submit.prevent="submitDefinition">
      <input v-model="input"/>
      <input type="submit" value="submit definition"/>
    </form>`
}}
