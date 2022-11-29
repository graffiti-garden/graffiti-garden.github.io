export default function({useCollection}) { return {

  components: {
    LikeButton: {
      props: ['likeMap', 'word', 'by'],
      setup: (props)=> ({
        likes: useCollection(()=> ({
          likes: {
            defines: props.word,
            by: props.by
          }
        }))
      }),

      watch: {
        likes: {
          handler(newLikes) {
            this.likeMap[this.by] = newLikes.authors.length
          },
          immediate: true
        }
      },

      methods: {
        toggleLike() {
          if (this.likes.mine.length) {
            this.likes.removeMine()
          } else {
            this.likes.update({
              likes: {
                defines: this.word,
                by: this.by
              }
            })
          }
        }
      },

      template: `
        <input type="checkbox"
        :id="'like'+by"
        :checked="likes.mine.length"
        @click="toggleLike">
        <label :for="'like'+by">Like</label>
      `
    }
  },

  props: ['word'],
  setup: (props)=> ({
    definitions: useCollection(()=> ({
      defines: props.word,
      definition: { $type: 'string' },
      timestamp: { $type: 'number' }
    }))
  }),

  data: ()=> ({ likeMap: {} }),

  computed: {
    oneDefinitionPerAuthor() {
      const groups = this.definitions.groupBy('_by')
      console.log(groups)
      for (const id in groups) {
        groups[id] = groups[id].sortBy('-timestamp')
      }
      // For each ID, last writer wins
      return Object.keys(groups).map(id=> groups[id][0])
    },

    mostLiked() {
      return [...this.oneDefinitionPerAuthor].sort(
        (a, b)=> this.likeMap[b._by] - this.likeMap[a._by])[0]
    }
  },

  template: `
    All definitions:
    <ol>
      <li v-for="definition in oneDefinitionPerAuthor">
        {{ definition.definition }}
        <LikeButton :likeMap="likeMap" :word="definition.defines" :by="definition._by"/>

        Number of likes:
        {{likeMap[definition._by]}}
      </li>
    </ol>

    <p v-if="definitions.length">
      Most liked definition: {{mostLiked.definition}}
    </p>`
}}

