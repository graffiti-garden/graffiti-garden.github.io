import * as Vue from "vue"
import { PrismEditor } from "vue-prism-editor"

const Renderer = {
  props: ['code', 'data'],

  render() {
    let hyperscript
    try {
      hyperscript = Vue.h({
        render: Vue.compile(this.code),
        data: ()=>(this.data)
      })
    } catch(e) {
      hyperscript = Vue.h('div', {
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
    },
    'language': {
      type: String,
      default: 'html'
    }
  },

  data () {
    return {
      code: '',
      hide: this.hideSource
    }
  },

  async created() {
    const request = new Request(`./demos/${this.path}.${this.language}`)
    const response = await fetch(request)
    this.code = await response.text()
  },

  methods: {
    highlighter(code) {
      return Prism.highlight(code,
        this.language == 'html'?
        Prism.languages.markup :
        Prism.languages.js)
    }
  },

  template: `
    <div class="demo">
      <fieldset v-if="render" :class="['demo-render', hide?'alone':'']">
        <legend>Demo</legend>
        <Renderer :code="code" :data="data"/>
        <button @click="hide=!hide" class="reveal-code">
          {{ hide? 'Show' : 'Hide' }} Source Code
        </button>
      </fieldset>
      <Transition name="stretch" :duration="700">
        <fieldset v-if="!hide" class="demo-code">
          <legend @click="render?hide=true:null">
            Source Code
          </legend>
          <PrismEditor v-model="code" :highlight="highlighter"/>
        </fieldset>
      </Transition>
    </div>`
}
