import { isMobile, delegate } from '../utils/utils'

async function horizontalSlider(){
    if (isMobile())
        return

    const slider = document.querySelector('#horizontal-slider')
    if (!slider)
        return
        
    const init = () => {
        const swiperObj = new Swiper(slider,{
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
        seoContainer.addEventListener('wheel', (event) => event.stopPropagation())
        const seoScroller = new Swiper(seoContainer, {
            direction: 'vertical',
            mousewheel: true,
            slidesPerView: 'auto',
            freeMode: true,
            nested: true,
            scrollbar: {
                el: seoContainer.querySelector('.swiper-scrollbar'),
                hide: false,
                draggable: true
            },
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
seoScroller()