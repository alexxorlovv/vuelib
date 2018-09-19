import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

function randomInteger(min: number, max: number): number {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function randomStr(m: number): string {
  var m = m || 9, s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < m; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
  return s;
};

@Component({
    components: {

    },
    props: {
    }
})

export default class ButtonsPage extends Vue {
  name: string = 'ButtonsPage'
  icons: Array<string> = ["home", "menu", "arrow-right", "arrow-down", "more", "delete"]
  sizes: Array<string> = ["small", "default", "large"]
  borders: Array<string> = ["box", "curved", "rounded"]
  types: Array<string> = ["fill", "outline"]
  iconPositions: Array<string> = ["left", "right", "top"]
  themes:Array<string> = [
    "danger",
    "focus",
    "brand",
    "success",
    "warning",
    "primary",
    "secondary",
    "metal",
    "info",
    "lighter",
    "darker"
  ]
  iconPosition: string = "left"
  theme: string = "primary"
  icon: string = "home"
  size: string = "default"
  border: string = "curved"
  type: string = "fill"
  content: string = ""
  randomButton(){
    this.content = randomStr(randomInteger(0, 25))
    this.theme = this.themes[randomInteger(0, this.themes.length - 1)]
    this.iconPosition = this.iconPositions[randomInteger(0, this.iconPositions.length - 1)]
    this.icon = this.icons[randomInteger(0, this.icons.length - 1)]
    this.size = this.sizes[randomInteger(0, this.sizes.length - 1)]
    this.border = this.borders[randomInteger(0, this.borders.length - 1)]
    this.type = this.types[randomInteger(0, this.types.length - 1)]
  }
  created() {
  }
  mounted() {
  }
}

