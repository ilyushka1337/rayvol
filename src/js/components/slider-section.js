async function mainSlider(){
    const slider = document.querySelector('#main-slider')
    if (!slider)
        return false

    const init = () => {
        new Swiper(slider.querySelector('.swiper'),{
            speed: 750,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: slider.querySelector('.slider-arrow.prev'),
                nextEl: slider.querySelector('.slider-arrow.next'),
            },
            pagination: {
                el: slider.querySelector('.slider-pagination'),
                clickable: true
            },
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
mainSlider()