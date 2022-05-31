async function productSlider(){
    const container = document.querySelector('#product-slider')
    if (!container)
        return
        
    const init = () => {
        const thumbsContainer = container.querySelector('.thumbs-slider')
        const thumbsSlider = new Swiper(thumbsContainer.querySelector('.swiper'),{
            direction: 'vertical',
            speed: 350,
            slidesPerView: 4,
            navigation: {
                nextEl: thumbsContainer.querySelector('.thumbs-slider__arrow.next'),
                prevEl: thumbsContainer.querySelector('.thumbs-slider__arrow.prev')
            },
            breakpoints: {
                768: { slidesPerView: 5 }
            }
        })
        const mainSliderContainer = container.querySelector('.product-main-slider')
        const mainSlider = new Swiper(mainSliderContainer.querySelector('.product-main-slider__swiper'), {
            direction: 'horizontal',
            speed: 750,
            thumbs: {
                swiper: thumbsSlider
            },
            spaceBetween: 15,
            pagination: {
                el: mainSliderContainer.querySelector('.product-main-slider__pagination')
            },
            navigation: {
                prevEl: mainSliderContainer.querySelector('.product-main-slider__arrow.prev'),
                nextEl: mainSliderContainer.querySelector('.product-main-slider__arrow.next')
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                576: { direction: 'vertical' }
            }
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
productSlider()