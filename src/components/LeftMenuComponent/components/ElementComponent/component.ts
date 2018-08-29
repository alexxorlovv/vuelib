import Vue from 'vue'
import Component from 'vue-class-component'
import SubElementComponent from './../SubElementComponent.vue'
import ElementView from './../ElementView.vue'
@Component({
    components: {
      SubElementComponent,
      ElementView
    },
    props: {
      isOpen: Boolean,
      isClose: Boolean,
      element: Object,
      isCloseChildrenProp: Boolean
    }
})

class ElementComponent extends Vue {
  name: string = 'ElementComponent';
  isCloseChildrenProp: boolean;

  closeChildrenHandler() {
    this.$emit("closeChildrenEvent")
  }
}

export default ElementComponent

