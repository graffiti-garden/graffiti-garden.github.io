export default function({useCollection}) { return {

  props: ['word'],
  setup: (props)=> ({
    definitions: useCollection(()=> ({
      defines: props.word,
      definition: { $type: 'string' },
      timestamp: { $type: 'number' }
    }))
  }),

  template: `
    <p v-if="definitions.length">
      Most recent definition:
      {{ definitions.sortBy('-timestamp')[0].definition }}
    </p>
    <p v-else>
      undefined
    </p>`
}}
