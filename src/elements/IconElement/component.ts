import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
    components: {
    },
    props: {
      src: {
        type: String,
        required: true
        },
      classIcon: {
        type: String,
        required: false,
        default: "nulled-icon"
      },
      width: {
        type: String,
        required: false
      },
      height: {
        type: String,
        required:false
      }
    }
})

class IconElement extends Vue {
  name: string = "IconElement"
  height?: string;
  width?: string;

  get styles() {
    let styles: any = {}
    if(this.height) {
      styles.height = this.height
    }
    if(this.width) {
      styles.width = this.width
    }
    return styles
  }
}

export default IconElement

