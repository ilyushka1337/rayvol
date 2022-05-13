async function horizontalSlider(){
    const slider = document.querySelector('#horizontal-slider')
    if (!slider)
        return false

    const init = () => {
        new Swiper(slider,{
            slidesPerView: 'auto',
            freeMode: {
                enabled: true,
                momentumRatio: 0.5,
                momentumVelocityRatio: 0.5
            },
            mousewheel: true,
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
horizontalSlider()