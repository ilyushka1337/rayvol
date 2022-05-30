async function productSlider(){
    const container = document.querySelector('#product-slider')
    if (!container)
        return
        
    const init = () => {
        const thumbsContainer = container.querySelector('.thumbs-slider')
        const thumbsSlider = new Swiper(thumbsContainer.querySelector('.swiper'),{
            direction: 'vertical',
            slidesPerView: 'auto',
            navigation: {
                nextEl: thumbsContainer.querySelector('.thumbs-slider__arrow.next'),
                prevEl: thumbsContainer.querySelector('.thumbs-slider__arrow.prev')
            }
        })
        const mainSlider = new Swiper(container.querySelector('.product-main-slider__swiper'), {
            direction: 'horizontal',
            thumbs: {
                swiper: thumbsSlider
            },
            breakpoints: {
                576: {
                    direction: 'vertical'
                }
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