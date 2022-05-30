import {delegate} from '../utils/utils'

const isActive = (sortBtn) => {
    return sortBtn.classList.contains('active')
}
const filtersForm = document.querySelector('#filters')
const orderByInput = document.querySelector('#order-by')
const orderInput = document.querySelector('#order')

delegate('click', '[data-sort-option]', (event, btn) => {
    const currentOrder = btn.dataset.currentOrder
    const isBtnActive = isActive(btn)
    
    if ( isBtnActive ){
        if (currentOrder == 'ASC'){
            btn.classList.remove('asc')
            btn.dataset.currentOrder = 'DESC'
        }
        else if (currentOrder == 'DESC'){
            btn.classList.add('asc')
            btn.dataset.currentOrder = 'ASC'
        }
    }
    else{
        const parent = btn.closest('[data-sort-container]')
        const currentActive = parent.querySelector('[data-sort-option].active')
        if (currentActive)
            currentActive.classList.remove('active')
    
        btn.classList.add('active')
    }

    orderByInput.value = btn.dataset.orderBy
    orderInput.value = btn.dataset.currentOrder ? btn.dataset.currentOrder : btn.dataset.defaultOrder
    filtersForm.submit()
    console.log(orderInput.value, orderByInput.value)
})