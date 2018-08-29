import Vue from 'vue'
import Component from 'vue-class-component'
import {mapMutations, mapState} from 'vuex'
import { State, Mutation, namespace } from 'vuex-class'

const menu = namespace('menu')

const sortHandlers = {
  basic: function(a: any, b: any) {
    if (a.sort < b.sort) return 1
    if (a.sort > b.sort) return -1
    return 0
  }
}

const defaultValue: {[key: string]: any} = {top: [], bottom: [], sections: {}}
const renders = {
  verticalMenu: {
  menuData: defaultValue,
  defaultValue: defaultValue,
  sortHandler: function(result: any, isRecursive:boolean = false) {
    if(isRecursive === false) {
      if(result.top) {
        result.top = this.sortHandler(result.top, true);
      }
      if(result.bottom){
        result.bottom = this.sortHandler(result.bottom, true);
      }
      if(result.sections) {
        for(let sectionName in result.sections) {
          result.sections[sectionName] = this.sortHandler(result.sections[sectionName], true)
        }
      }
    } else {
      result = result.sort((a: any, b: any)=> {
        if (a.sort < b.sort) return 1
        if (a.sort > b.sort) return -1
        return 0
      })
      for(let i in result) {
        if(result[i].sub.length > 0) {
          result[i].sub = this.sortHandler(result[i].sub, true)
        }
      }
    }
    return result;
  },
    handlerRander: function (route: any, list: any, children: any, parentRoute: any, rootList: any) {

      let root: any = rootList ? rootList: list;

      let menu: any = {}
      let meta: any = route.meta
      let options: any = meta.menu.verticalMenu
      let position:any = options.position

      menu.link = meta.link
      menu.text = meta.title
      menu.sort = options.sort ? options.sort : -1
      menu.icon = meta.icon ? meta.icon : false
      menu.counter = meta.counter ? meta.counter : false
      menu.counterTheme = meta.counterTheme ? meta.counterTheme : false
      menu.isActiveLink = meta.isActiveLink ? meta.isActiveLink : false

      menu.sub = children ? children: []


      if (position === "section") {
        if (!options.sectionName) {
          throw "VerticalMenuRender: position:section not found sectionName";
        }
        if (!root['sections'][options.sectionName]) {
          root['sections'][options.sectionName] = []
        }
        root['sections'][options.sectionName].push(menu)
        return true;
      }
      if (position === "bottom") {
        root['bottom'].push(menu)
        return true;
      }
      if ((!position && !parentRoute) || position === "top") {
        root['top'].push(menu)
        return true;
      }
      list.push(menu)
      return true;

    }
  }
}

@Component({
    components: {
        //hello: HelloComponent
    },
    props: {

    }
})
export default class Main extends Vue {
  @menu.State('menuList') menuList: any
  @menu.State('isLoaded') isLoaded: any
  @menu.Mutation('addMenu') addMenu: any
  @menu.Mutation('loaded') loaded: any

  name: string = "Main"
  renders: any = renders
  rendersRouters :any = {}

  renderLink(link:any, rootLink:any) {
    if (link[0] === '/') {
      return link;
    } else {
      if(!rootLink) {
        throw "Render Link: rootlink null and link not rooted - "+link;
      }
      return rootLink+link;
    }
  }


  renderRouteElement(route: any, list: any, rootList: any = false, parentRoute: any = false) {
    let root: any = rootList ? rootList : list
    let children: any = false
    route.meta.link = this.renderLink(route.path, parentRoute ? parentRoute.path: false)

    if(route.children) {
      if(route.children.length > 0) {
        children = this.renderRoutesList(route.children, root, route)
      }
    }

    for (let renderName in route.meta.menu) {
      // if (route.meta.menu[renderName].render) {
      //   this.rendersRouters[route.meta.menu[renderName].render] = renderName;
      //   renderName = route.meta.menu[renderName].render;
      // } else {
      //   this.rendersRouters[renderName] = renderName
      // }
      let render: any = this.renders[renderName]
      //Тоесть render отсутствует в списке доступных
      //Значит это косяк
      if (!render) {
        throw `RenderMenu '${renderName}': not-found.`;
      }

      if(!root[renderName]) {
        root[renderName] = Object.assign({}, render.defaultValue);
      }

      if(rootList && !list[renderName]) {
        list[renderName] = []
      }

      let childrenRender: any = false
      if(children) {
        if(children[renderName]) {
          childrenRender = children[renderName]
        }
      }

      let rootRender: any = false
      if(rootList) {
          rootRender = rootList[renderName] ? rootList[renderName] : false
      }

     // (route: any, list: any, children: any, parentRoute: any, rootList: any)
      render.handlerRander(route, list[renderName], childrenRender, parentRoute, rootRender)

    }

  }
  renderRoutesList(routes: Array<any>, rootList: any = false, parentRoute: any = false) {
    let list: any = {}
    for(let route of routes) {
      if(!route.meta.menu) continue;
      this.renderRouteElement(route, list, rootList, parentRoute)
    }
    if (!parentRoute) {

      for(let renderName in list) {
        if(this.renders[renderName].sortHandler) {
          list[renderName] = this.renders[renderName].sortHandler(list[renderName])
        }
      }
    }
    return list;
  }
  created() {
    let result = this.renderRoutesList(this.$router.options.routes)
    console.log(result)
   // console.log(routes);
    //let elem:any = { name: "VerticalMenu", data:[]}
    for(let renderName in result) {
      let elem = {name: renderName, data: result[renderName]}
      this.addMenu(elem)
    }

  }

 // {
//   title: "Menu Name",
//   icon: "base/menu",
//   counter: 1,
//   counterTheme: "brand"
//   isActiveLink: true
//   menu: {
//     verticalMenu: {
//       sort:0,
//       position: "section",
//       sectionName: "Accounts"
//     }
//   }
// }


  mounted(){
  }
}
