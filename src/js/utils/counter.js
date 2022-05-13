import {delegate} from './utils'

const counter = () => {
    delegate('click', '[data-counter-action]', (event, btn) => {
        const action = btn.dataset.counterAction
        const counter = btn.closest('[data-counter]')
        const input = counter.querySelector('[data-counter-count]')
        const max = input.max
        const min = input.min
        const value = input.value

        let newValue = value;
        if (action == 'increment'){
            newValue++
            newValue = newValue > max ? max : newValue
        }
        else{
            newValue--
            newValue = newValue < min ? min : newValue
        }

        input.value = newValue
        input.dispatchEvent(new CustomEvent('counter-change', {bubbles: true}))
    })
}
counter()