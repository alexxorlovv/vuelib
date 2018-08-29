import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    components: {
        //hello: HelloComponent
    },
    props: {

    }
})

class AuthLayout extends Vue {
    name: string = 'AuthLayout'
}

export default AuthLayout
