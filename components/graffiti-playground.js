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
        <Transition name="fade">
          <button v-if="hide" @click="hide=false" class="reveal-code">
            Show Source Code
          </button>
        </Transition>
      </fieldset>
      <Transition name="stretch">
        <fieldset v-if="!hide" class="demo-code">
          <legend @click="hide=true">
            Source Code
          </legend>
          <PrismEditor v-model="code" :highlight="highlighter"/>
        </fieldset>
      </Transition>
    </div>`
}
