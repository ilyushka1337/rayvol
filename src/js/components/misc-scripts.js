import {startWatch, lazyLoad} from '../utils/lazy-load'
import { delegate, slideToggle } from '../utils/utils'

startWatch(document.querySelectorAll('[data-lazy]'),lazyLoad)

delegate('click', '[data-collapse-target]', (event, btn) => {
    const target = document.querySelector(btn.dataset.collapseTarget)
    if (!target)
        return

    btn.classList.toggle('opened')
    slideToggle(target)
})