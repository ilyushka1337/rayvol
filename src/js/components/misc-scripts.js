import {startWatch, lazyLoad} from '../utils/lazy-load'
import Tabs from '../utils/tabs'
import { delegate, slideToggle } from '../utils/utils'

startWatch(document.querySelectorAll('[data-lazy]'),lazyLoad)

async function stainAnimation(){
    const target = document.querySelector('.stain__icon path')
    if (!target)
        return

    const init = () => {
        const t1 = animate({
           targets: '.stain__icon path',
           duration: 9000,
           props: {
              d: {
                 interpolate: (left, right) => {
                    return interpolate([left, right], { 
                        precision: 2,
                        origin: {
                           x: 6,
                           y: 14,
                           absolute: true
                        }
                    })
                 },
                 easing: 'cubic-bezier(.5,0,.5,1)',
                 value: [
                    '#stain1 path', 
                    '#stain2 path',
                    '#stain3 path',
                 ]
              }
           }
        })
        t1.play({
           alternate: true,
           destroy: false,
           repeat: Infinity
        })
    }

    const {interpolate, animate} = await import(/* webpackChunkName: "svg-morph" */ './svg-morph')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load',init)
}
stainAnimation()

delegate('click', '[data-collapse-target]', (event, btn) => {
    const target = document.querySelector(btn.dataset.collapseTarget)
    if (!target)
        return

    btn.classList.toggle('opened')
    slideToggle(target)
})

const productTabs = new Tabs(document.querySelector('#product-tabs'))