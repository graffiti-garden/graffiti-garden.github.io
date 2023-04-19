export default {

  setup() {
    const $gf = Vue.inject('graffiti')
    const { objects: myObjects } = $gf.useObjects(['my-cool-context'])
    return { myObjects }
  },

  template: '{{ myObjects }}'

}