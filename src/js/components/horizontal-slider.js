import { isMobile } from '../utils/utils'

async function horizontalSlider(){
    if (isMobile())
        return false

    const slider = document.querySelector('#horizontal-slider')
    if (!slider)
        return false
        
    const init = () => {
        const swiperObj =  new Swiper(slider,{
            mousewheel: true,
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                momentumRatio: 0.5,
                momentumVelocityRatio: 0.5
            },
            // enabled: !isMobile("(max-width: 1023px)")
        })
        // window.addEventListener('resize', () => {
        //     isMobile("(max-width: 1023px)") ? swiperObj.disable() : swiperObj.enable()
        // })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
horizontalSlider()