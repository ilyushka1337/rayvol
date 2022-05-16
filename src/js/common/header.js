import MicroModal from 'micromodal';
import Burger from '../utils/burger'
import {toggleScroll, delegate} from '../utils/utils'
import { modalConfig } from '../utils/modal'

const mainMenu = document.querySelector('#main-menu')
const mobileMenu = document.querySelector('#mobile-menu')
const header = document.querySelector('.header')

function toggleMainMenu(state = 'auto'){
    if (headerBurger.currentState == 'closed'){
        if (mobileMenu)
            mobileMenu.classList.remove('opened')
        if (mainMenu)
            mainMenu.classList.remove('opened')
        toggleScroll('auto')
        header.classList.remove('header--menu-opened')
    }
    else{
        if (mobileMenu)
            mobileMenu.classList.add('opened')
        if (mainMenu)
            mainMenu.classList.add('opened')
        toggleScroll('hidden')
        header.classList.add('header--menu-opened')
    }
}

let headerBurger = new Burger(document.querySelector('#header-burger'))
headerBurger.addAction(() => toggleMainMenu())

const insertBackBtn = () => {
    if (!mobileMenu)
        return

    const subMenus = [...mobileMenu.querySelectorAll('.sub-menu')]
    const tpl = `
    <li class="menu-item back">
        <svg viewBox="0 0 9 5">
            <use xlink:href='${window.templateUrl}/static/images/sprite.svg#arr'/>
        </svg>
        <span>Назад</span>
    </li>
    `

    subMenus.forEach((menu) => {
        menu.insertAdjacentHTML('afterbegin', tpl) 
    })
}
insertBackBtn()

const openSubMenu = (event, link) => {
    event.preventDefault()
    const subMenu = link.nextElementSibling
    subMenu.classList.add('active')
}
const closeSubMenu = (event, link) => {
    event.preventDefault()
    const subMenu = link.closest('.sub-menu')
    subMenu.classList.remove('active')
}
delegate('click', '.menu-item-has-children>a', openSubMenu, mobileMenu)
delegate('click', '.menu-item.back', closeSubMenu, mobileMenu)

const openOrderModal = () => {
    toggleMainMenu()
    MicroModal.show('modal-order', modalConfig)
}
delegate('click', 'a[href="#basket"]', openOrderModal)