<script setup>
import { computed, h, compile, onErrorCaptured } from "vue"

const props = defineProps(['code', 'data'])

onErrorCaptured(e=> {
  console.error(e)
  return false
})

const hyperscript = computed(()=> {
  try {
    return h({
      render: compile(props.code),
      data: ()=>(props.data)
    })
  } catch(e) {
    return h('div', {
      class: 'error',
      innerHTML: e.toString()
    })
  }
})
</script>

<template>
  <hyperscript/>
</template>