import {startWatch, lazyLoad} from '../utils/lazy-load'

startWatch(document.querySelectorAll('[data-lazy]'),lazyLoad)