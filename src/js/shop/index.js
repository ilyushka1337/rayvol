import createRangeSlider from "../utils/range-slider"
import Cookies from 'cookies-js'

const fitlersRange = () => {
    const priceRange = document.querySelector('#price-range')
    if (!priceRange)
        return

    const rangeContainer = priceRange.querySelector('[data-js-range]')
    const fromInput = priceRange.querySelector('[data-from-input]')
    const toInput = priceRange.querySelector('[data-to-input]')
    
    createRangeSlider(rangeContainer, fromInput, toInput)
}
fitlersRange()

const addToViewed = () => {
    const productPage = document.querySelector('#product-page')
    if (!productPage)
        return

    const id = parseInt(productPage.dataset.id)
    let viewed = JSON.parse(Cookies.get('viewed') || '[]')
    const index = viewed.findIndex(elem => elem == id)
    console.log(viewed)

    if (index >= 0)
        return

    viewed.push(id)
    Cookies.set('viewed', JSON.stringify(viewed))
}
addToViewed()