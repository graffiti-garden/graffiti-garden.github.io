<script setup>
import Renderer from './PlaygroundRenderer.vue'
import { ref, onErrorCaptured, onBeforeMount } from 'vue'
import Prism from 'prismjs'
import { PrismEditor } from 'vue-prism-editor'

const props = defineProps({
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
})

const code = ref('')
const hide = ref(props.hideSource)

onBeforeMount(async ()=> {
  const response = await import(`../demos/${props.path}.${props.language}?raw`)
  code.value = response.default
})

function highlighter(code) {
  return Prism.highlight(code,
    props.language == 'html'?
      Prism.languages.markup :
      Prism.languages.js)
}

onErrorCaptured(e=> {
  console.log("from playground")
  console.error(e)
  return false
})
</script>

<template>
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
  </div>
</template>