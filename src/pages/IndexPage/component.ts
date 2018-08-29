import Vue from 'vue'
import BaseLayout from '@layouts/BaseLayout.vue'
import Component from 'vue-class-component'

@Component({
    components: {
      BaseLayout
    },
    props: {

    }
})

class IndexPage extends Vue {
  name: string = "IndexPage"
}

export default IndexPage

