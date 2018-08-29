import Vue from "vue"
import Component from "vue-class-component"
import MenuItemComponent from "./../MenuItemComponent.vue"
import ListElement from "@elements/ListElement.vue"
import ListItemElement from "@elements/ListItemElement.vue"
import ArrowElement from "@elements/ArrowElement.vue"
import { Watch } from 'vue-property-decorator'

@Component({
  components: {
    MenuItemComponent,
    ListElement,
    ListItemElement,
    ArrowElement
  },
  props: {
    isHover: {
      type: Boolean,
      required: false,
      default: false
    },
    theme: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    },
    isFirst: {
      type: Boolean,
      required: false,
      default: false
    },
    isOpen: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    placement: {
      type: String,
      required: false,
      default: "left"
    },
    isFirstChild: {
      type: Boolean,
      required: false,
      default: false
    },
    isClose: {
      type: Boolean,
      required: false,
      default: false
    },
    isCloseChildrenProp: Boolean,
    isDiactiveMenu: Boolean,
    firstOpen: Boolean

  }
})
export default class MenuItemListComponent extends Vue {
  public name: string = "MenuItemListComponent"
  public isOpen: boolean
  public elements: any
  public isCloseChildren: boolean = false
  public isInit: boolean = false
  public isFirst: boolean
  constructor() {
    super();
  }
  fullCloseEventHandler(focus?: boolean){
    this.$emit("fullCloseEvent", focus)
  }
  firstOpenEventHandler(){
    if(this.isFirst){
      this.$emit("firstOpenEvent")
    }
  }
  firstCloseEventHandler() {
    if (this.isFirst) {
      this.$emit("firstCloseEvent")
    }
  }
  /* Ловим событие от Item что какой то компонент открылся, Посылаем всем Item что им нужно закрытся */
  closeChildrenHandler() {
    if(this.isFirst) {
      this.isInit = true
      this.$emit("closeChildrenEvent")
    }
    this.isCloseChildren = true
    this.$nextTick(() => {
      this.isCloseChildren = false
    })
  }

  diactiveMenuHandler() {
    this.$emit("diactiveMenuEvent")
  }
  activeMenuHandler() {
    if(!this.isFirst) {
      this.$emit("activeMenuEvent")
    }
  }

  parentCloseEventHandler(){
    this.$emit("parentCloseEvent")
  }


  @Watch('isCloseChildrenProp')
  CloseChildrenWatch(isCloseChildrenPropValue: boolean, oldVal: boolean) {
    if (isCloseChildrenPropValue && !this.isInit) {
      this.closeChildrenHandler()
    }
    if (this.isInit) {
      this.isInit = false
    }
  }
  created() {

  }


  //Если пришло событие о том что что нужно сделать все элементы не активными
  // Посылаем действие потомкам что нужно убрать активность если есть далее - передаем эстафету родителю

  //Если пришло событие о том что нужно сделать элемент активным
  // Если мы не являемся First - то:
  // Вызываем событие о том что нужно сделать его активным для родителя
}
