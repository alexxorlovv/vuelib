import Vue from 'vue'
import Component from 'vue-class-component'
import IconElement from '@elements/IconElement.vue'

@Component({
    components: {
      IconElement
    },
    props: {
      isOpen: Boolean,
      isFocus: Boolean,
      isLink:Boolean,
      isClose: Boolean,
      element:Object,
      isSubElement: Boolean
    }
})

class ElementView extends Vue {
  name: string = 'ElementView'
}

export default ElementView

