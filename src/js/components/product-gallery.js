async function productGallery(){
    const slider = document.querySelector('#product-gallery')
    if (!slider)
        return false

    const init = () => {
        const thumbsSwiper = new Swiper(slider.querySelector('.product-gallery__thumbs'), {
            slidesPerView: 'auto',
            navigation: {
                prevEl: slider.querySelector('.product-gallery__arrow.prev'),
                nextEl: slider.querySelector('.product-gallery__arrow.next')
            }
        })
        const mainSwiper = new Swiper(slider.querySelector('.product-gallery__main'), {
            speed: 750,
            autoplay: {
                delay: 4500,
            },
            thumbs: {
                swiper: thumbsSwiper
            }
        })
    }

    const {default: Swiper} = await import(/* webpackChunkName: "swiper" */ './swiper')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
productGallery()