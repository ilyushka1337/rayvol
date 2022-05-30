export default class Tabs{
    constructor(container){
        if (!container)
            return

        this.container = container
        this.activeClass = 'active'
        this.tabLine = this.container.querySelector('[data-tab-line]')
        this.links = [...this.container.querySelectorAll('[data-tab-target]')]
        this.links.forEach(link => link.addEventListener('click', this.onClick))
        this.currentTab = false
        this.init()
        window.addEventListener('resize', this.onResize)
    }
    init(){
        const currentLink = this.links.find(link => link.classList.contains( this.activeClass ))
        this.calcAndApply(currentLink)
        this.currentTab = document.querySelector(`#${currentLink.dataset.tabTarget}`)
    }
    onResize = () => {
        const currentLink = this.links.find(link => link.classList.contains( this.activeClass ))
        this.calcAndApply(currentLink)
    }
    onClick = (event) => {
        const newLink = event.target
        const currentLink = this.links.find(link => link.classList.contains( this.activeClass ))
        currentLink.classList.remove( this.activeClass )
        newLink.classList.add( this.activeClass )
        
        this.calcAndApply(newLink)
        this.switchTab(newLink.dataset.tabTarget)
    }
    calcTransform(targetLink){
        const scale = targetLink.clientWidth / this.tabLine.clientWidth
        const translate = targetLink.offsetLeft

        return { scale, translate }
    }
    applyTransform(transform){
        this.tabLine.style.transform = `scaleX(${transform.scale})`
        this.tabLine.style.left = `${transform.translate}px`
    }
    calcAndApply(targetLink){
        const transform = this.calcTransform(targetLink)
        this.applyTransform(transform)
    }
    switchTab(targetID){
        if (this.currentTab)
            this.currentTab.classList.remove(this.activeClass)

        const newTab = document.querySelector(`#${targetID}`)
        newTab.classList.add(this.activeClass)
        this.currentTab = newTab
    }
}