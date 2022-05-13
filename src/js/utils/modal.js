import MicroModal from 'micromodal';
import {toggleScroll} from "../utils/utils"

let diff = window.innerWidth-document.documentElement.clientWidth
if (window.innerWidth > document.documentElement.clientWidth)
	diff = 0

const modalShowEvent = new CustomEvent("modalShow", {bubbles: true})
const modalCloseEvent = new CustomEvent("modalClose", {bubbles: true})

function modalShow(modal){
	toggleScroll("hidden")
	document.body.style.paddingRight = `${diff}px`
	modal.dispatchEvent(modalShowEvent)
}
function modalClose(modal){
	const animEnd = () =>{
		toggleScroll("auto")
		document.body.style.paddingRight="0px"
		modal.dispatchEvent(modalCloseEvent)
	}
	modal.addEventListener('animationend', animEnd, {once: true})
}

export const modalConfig = {
	onShow: modalShow,
	onClose: modalClose,
	awaitOpenAnimation: true,
	awaitCloseAnimation: true,
	disableFocus: true,
}

MicroModal.init(modalConfig)