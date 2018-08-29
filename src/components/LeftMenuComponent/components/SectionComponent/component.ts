import Vue from 'vue'
import Component from 'vue-class-component'
import ElementComponent from './../ElementComponent.vue'
import IconElement from '@elements/IconElement.vue'
@Component({
    components: {
      ElementComponent,
      IconElement
    },
    props: {
      section: Object,
      isOpen: Boolean,
      isHover: Boolean,
      isClose: Boolean,
      isCloseChildrenProp: Boolean
    }
})

class SectionComponent extends Vue {
  name: string = 'SectionComponent'

  closeChildrenHandler(){
    this.$emit("closeChildrenEvent")
  }
}

export default SectionComponent

