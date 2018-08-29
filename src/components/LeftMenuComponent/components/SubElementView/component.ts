import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
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
      element: Object
    }
})

class SubElementView extends Vue {
  name: string = 'SubElementView'

@Watch('isClose')
  checkClose(val: boolean, oldVal: boolean){

  }

}

export default SubElementView

