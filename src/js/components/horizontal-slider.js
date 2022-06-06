import { isMobile, delegate } from '../utils/utils'

async function horizontalSlider(){
    if (isMobile())
        return

    const slider = document.querySelector('#horizontal-slider')
    if (!slider)
        return
        
    const init = () => {
        const swiperObj = new Swiper(slider,{
            speed: 500,
            mousewheel: true,
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                momentumRatio: 0.5,
                momentumVelocityRatio: 0.5
            }
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
horizontalSlider()

async function seoScroller(){
    const seoContainer = document.querySelector('#seo-scroller')
    if (!seoContainer)
        return

    const init = () => {
        const seoScroller = new Swiper(seoContainer, {
            direction: 'vertical',
            mousewheel: false,
            slidesPerView: 'auto',
            freeMode: true,
            nested: true,
            scrollbar: {
                el: seoContainer.querySelector('.swiper-scrollbar'),
                hide: false,
                draggable: true
            },
        })
        swiperScroll(seoScroller)
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')

    if (document.readyState == 'interactive')
        init()
    else
        document.addEventListener('DOMContentLoaded', init)
}
seoScroller()

async function swiperScroll(swiperController){
    const {default : normalizeWheel} = await import(/* webpackChunkName: "normalize-wheel" */ 'normalize-wheel-es')
    swiperController.el.addEventListener('wheel', event => {
        event.stopPropagation()

        const normalized = normalizeWheel(event)
        const max = 0
        const min = swiperController.snapGrid[swiperController.snapGrid.length-1] * -1
        const currentPosition = swiperController.getTranslate()
        const newPosition = currentPosition - normalized.pixelY

        if (newPosition > max)
            swiperController.setTranslate(max)
        else if (newPosition < min)
            swiperController.setTranslate(min)
        else
            swiperController.setTranslate(newPosition)
    })
}