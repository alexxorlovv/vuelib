import Vue from 'vue'
import Component from 'vue-class-component'
import ElementView from './../ElementView.vue'
import SubElementView from './../SubElementView.vue'
import { Watch } from 'vue-property-decorator'
import IconElement from '@elements/IconElement.vue'

@Component({
    components: {
      ElementView,
      SubElementView,
      IconElement
    },
    props: {
      isOpen: Boolean,
      isClose: Boolean,
      isHover: Boolean,
      element: Object,
      isCloseChildrenProp: Boolean,
      isSubElement: Boolean
    }
})
class SubElementComponent extends Vue {
  name: string = 'SubElementComponent'
  dropdown: boolean = false
  isInit = false
  isCloseChildrenProp: boolean
  isCloseChildren: boolean = false
  isOpen: boolean

    beforeEnter(el:any) {
      if(this.isOpen) {
        //el.classList.add('collapse-transition');
        //addClass(el, 'collapse-transition');
        if (!el.dataset) el.dataset = {};

        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;

        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }

    }

    enter(el:any) {
      if(this.isOpen) {
        el.dataset.oldOverflow = el.style.overflow;
        //console.log(el.scrollHeight)
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
      }

    }

    afterEnter(el:any) {
      if(this.isOpen){
        // for safari: remove class then reset height is necessary
        //el.classList.remove('collapse-transition');

        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
      }
    }

    beforeLeave(el:any) {
      if(this.isOpen) {
        if (!el.dataset) el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      }
    }

    leave(el:any) {
      if(this.isOpen) {
        if (el.scrollHeight !== 0) {
            // for safari: add class after set height, or it will jump to zero height suddenly, weired
           // el.classList.add('collapse-transition');
            //console.log(el.classList)
            //addClass(el, 'collapse-transition');
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }
      }

    }

    afterLeave(el:any) {
        if(this.isOpen) {
          //el.classList.remove('collapse-transition');
          //removeClass(el, 'collapse-transition');
          el.style.height = '';
          el.style.overflow = el.dataset.oldOverflow;
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

    }
    leaveCancelled(el:any){
      //console.log('leaveCancelled')
    }


  get collapse(){
    if(!this.isOpen) {
      return false
    } else {
      return this.dropdown
    }
  }

  closeChildrenHandler() {
    this.isCloseChildren = true
    this.$nextTick(()=>{
      this.isCloseChildren = false
    })
  }

  mouseStart(e: MouseEvent) {
    console.dir("mouse-start")
    if(!this.dropdown) {
      this.openDropdown(e, true)
    }
  }
  mouseEnd(e: MouseEvent) {
    console.dir("mouse-end")
    if(this.dropdown) {
      this.closeDropdown(e, true)
    }
  }
  closeDropdown(e: MouseEvent, hover: Boolean){
    this.dropdown = false
    this.closeChildrenHandler()
  }
  openDropdown(e: MouseEvent, hover: Boolean){
    // if(!hover && this.isOpen) {
    //   var elemBase:any = e.srcElement
    //   // if(elem.nodeName === "IMG") {
    //   //   elem = elem.parentElement
    //   // }

    //   var elem:any = elemBase.parentElement.parentElement.parentElement.parentElement.parentElement.lastChild
    //   elem.style.display = "block"
    //   elem = elemBase.parentElement.parentElement.parentElement.parentElement.parentElement.lastChild
    //   console.log(elem.offsetHeight)
    //   elem.style.height = elem.offsetHeight+"px"
    //   //elem.style.display = ""


    // }
    //this.$root.$emit('bv::hide::tooltip')
    this.dropdown = true
    this.isInit = true
    this.$emit("closeChildrenEvent")
  }

  toogleDropdown(e: MouseEvent) {
    this.dropdown ? this.closeDropdown(e, false) : this.openDropdown(e, false)
  }

  @Watch('isCloseChildrenProp')
  CloseChildrenWatch(isCloseChildrenPropValue: boolean, oldVal: boolean){
    if(isCloseChildrenPropValue && !this.isInit) {
      this.dropdown = false
      this.closeChildrenHandler()
    }
    if(this.isInit) {
      this.isInit = false
    }
  }

  @Watch('isClose')
  closeWatch(isCloseValue: boolean, oldVal: boolean){
    if(isCloseValue) {
      this.dropdown = false
    }
  }

}
export default SubElementComponent
