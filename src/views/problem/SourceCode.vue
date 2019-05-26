<template>
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
</template>

<script>
  // language
  import 'codemirror/mode/clike/clike.js'
  // theme css
  import 'codemirror/theme/base16-light.css'

  import axios from 'axios'


  export default {


    data() {
      // 在这里改变code即可

      var code =
        `
//
//  Sample.cpp
//
//  You shouldn't this code

void print() {
  std::cout << "hello, world" << std::endl;
}
`
      return {
        code,
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
      getoadSourceCode: function() {
        axios.get('/teacher/submission/get-submission/?submission-id=1')
          .then(function(response) {
            this.code = response['code']
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
</script>
