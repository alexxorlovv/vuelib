


interface ElementMenu
{

}

interface SectionMenu
{

}
interface IStringMap<T> { [key: string]: T; };


interface RouteMenu
{
  title: string
  link: string
  icon?: string
  counter?: number
  counterTheme?: string
  isActiveLink?: boolean
}

interface OptionsMenu
{
  position: string
  sectionName?: string
  sort?: number
}

class VerticalMenuRender
{
  protected route: object
  protected top: Array<ElementMenu>
  protected bottom: Array<ElementMenu>
  protected sections: IStringMap<SectionMenu>
  protected options: OptionsMenu
  protected types: {[key: string]: boolean} = {bottom: true, top: true, section: true}

  construct(route: RouteMenu, options: OptionsMenu) {
    if (this.types[options.position]) throw "VerticalMenuRender: options.positions invalid name:"+options.position

    if (options.position === "section" && !options.sectionName) {
      throw "VerticalMenuRender: options.positions: section - not found 'sectionName' property in options"
    }
    this.options = options
    this.route = route
  }

  render() {
    let result: any = {top:[], bottom:[], sections: []}
  }
}
