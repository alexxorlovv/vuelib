import Icon from './Icon'
import TypeApplication from './TypeApplication'
import Vue from 'vue'

class Application extends Vue {
    public name: string
    public description: string
    public icon: Icon
    public type: TypeApplication
    public isDefault: boolean
}

export default Application
