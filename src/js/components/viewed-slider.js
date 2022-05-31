async function viewedSlider(){
    const container = document.querySelector('#viewed-slider')
    if (!container)
        return
        
    const init = () => {
        new Swiper(container.querySelector('.cards-slider__swiper'),{
            speed: 700,
            slidesPerView: 1,
            navigation: {
                nextEl: container.querySelector('.cards-slider__arrow.next'),
                prevEl: container.querySelector('.cards-slider__arrow.prev')
            },
            autoplay: {
                delay: 24000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
viewedSlider()