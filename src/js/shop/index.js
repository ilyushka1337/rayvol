import createRangeSlider from "../utils/range-slider"

const priceRange = document.querySelector('#price-range')
const rangeContainer = priceRange.querySelector('[data-js-range]')
const fromInput = priceRange.querySelector('[data-from-input]')
const toInput = priceRange.querySelector('[data-to-input]')

createRangeSlider(rangeContainer, fromInput, toInput)