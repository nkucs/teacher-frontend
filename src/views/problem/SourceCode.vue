<template>
  <div>
    <md-card>
      <md-card-actions>
        <div class="md-subhead">
          <span>mode: {{ cmOption.mode }}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>theme: {{ cmOption.theme }}</span>
        </div>
        <md-button
          class="md-icon-button"
          target="_blank"
          href="https://github.com/surmon-china/vue-codemirror/tree/master/examples/08-text-x-swift.vue">
          <md-icon>code</md-icon>
        </md-button>
      </md-card-actions>
      <md-card-media>
        <div class="codemirror">
          <!-- codemirror -->
          <codemirror v-model="code" :options="cmOption"></codemirror>
        </div>
      </md-card-media>
    </md-card>
  </div>
</template>

<script>
  // language
  import 'codemirror/mode/clike/clike.js'
  // theme css
  import 'codemirror/theme/base16-light.css'
  import { getSubmission } from '@/api/problem'


  export default {


    data() {
      return {
        code: null,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: 'text/x-c++src',
          lineWrapping: true,
          theme: 'base16-light'
        }
      }
    },

    methods: {
      loadSourceCode: function() {
        getSubmission({
          submission_id: this.$route.params.submission_id
        }).then(response => {
          // console.log(response)
          this.code = response['program']
        }).catch(function(error) {
          console.log(error)
        })
      }

    },
    mounted() {
      this.loadSourceCode()
    }
  }
</script>
