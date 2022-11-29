
export default function({useCollection}) { return {

  props: ['word'],
  setup: (props)=> useCollection(()=> ({
    defines: props.word,
    definition: { $type: 'string' },
    timestamp: { $type: 'number' }
  })),
