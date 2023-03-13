import { h, compile } from "vue"
import { PrismEditor } from "vue-prism-editor"

const Renderer = {
  props: ['code', 'data'],

  render() {
    let hyperscript
    try {
      hyperscript = h({
        render: compile(this.code),
        data: ()=>(this.data)
      })
    } catch(e) {
      hyperscript = h('div', {
        class: 'error',
        innerHTML: e.toString()
      })
    }
    return hyperscript
  },

  errorCaptured(e) {
    console.log(e)
    return false
  }
}

export default {
  components: { Renderer, PrismEditor },

  props: {
    'path': String,
    'render': {
      type: Boolean,
      default: true
    },
    'data': {
      type: Object,
      default: {}
    },
    'hideSource': {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      code: '',
      hide: this.hideSource
    }
  },

  async created() {
    const request = new Request(`./demos/${this.path}.html`)
    const response = await fetch(request)
    this.code = await response.text()
  },

  methods: {
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.markup)
    }
  },

  template: `
    <div class="demo">
      <fieldset v-if="render" class="demo-render">
        <legend>Demo</legend>
        <Renderer :code="code" :data="data"/>
      </fieldset>
      <fieldset class="demo-code" @click="hide=false">
        <legend>
          Source Code
        </legend>
        <PrismEditor v-if="!hide" v-model="code" :highlight="highlighter"/>
        <button v-else>
          Show Source Code
        </button>
      </fieldset>
    </div>`
}