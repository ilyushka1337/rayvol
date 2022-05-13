import makeRequest from "../utils/make-request"
import {delegate} from "../utils/utils"
import PhoneField from '../utils/phone-mask'

function initTelMask(){
    let inputs = document.querySelectorAll('input[type="tel"]')
    
    inputs.forEach(input => {
        new PhoneField(input)
    })
}
initTelMask()

export function toggleFormStatusElement(container, type, action="add", classes=''){
	if (action=="add")
		switch (type){
			case 'preloader':
				container.insertAdjacentHTML('beforeend',
				`
				<div class="form-status ${classes}">
					<div class="preloader">
						<div class="preloader__item preloader__item-1"></div>
						<div class="preloader__item preloader__item-2"></div>
						<div class="preloader__item preloader__item-3"></div>
						<div class="preloader__item preloader__item-4"></div>
						<div class="preloader__item preloader__item-5"></div>
						<div class="preloader__item preloader__item-6"></div>
						<div class="preloader__item preloader__item-7"></div>
						<div class="preloader__item preloader__item-8"></div>
					</div>
				</div>
				`)
				break;
			case 'mail-sent':
				container.insertAdjacentHTML('beforeend',
				`
				<div class="form-status ${classes}">
					<div class="order-result">
						<svg class="order-result__icon order-result__icon--ok" viewBox="0 0 60 42">
							<use xlink:href='${window.templateUrl}/static/images/sprite.svg#ok'/>
						</svg>
						<p class="h1-title pt-sans order-result__title">Заявка отправлена</p>
						<div class="order-result__btn btn btn--default-height" data-micromodal-close>Хорошо</div>
					</div>
				</div>
				`)
				break;
			case 'ok':
				container.insertAdjacentHTML('beforeend',
				`
				<div class="form-status ${classes}">
					<svg class="form-status__ok-icon" viewBox="0 0 60 42">
						<use xlink:href='${window.templateUrl}/static/images/sprite.svg#ok'/>
					</svg>
				</div>
				`)
				break;
		}
	else
		container.querySelector('.form-status').remove()
}


const horizontalFormSubmit = (event, form) => {
	event.preventDefault()

	let btn = form.querySelector('[data-submit-btn]')
	btn.disabled = true
	toggleFormStatusElement(btn, 'preloader', 'add', 'form-status--smaller')

	const callback = ({form ,data, result}) => {
		console.log(result)

		toggleFormStatusElement(btn, 'preloader', 'remove')
		clearErrors(form)

		switch (result.status){
			case "success":
				toggleFormStatusElement(btn, 'ok', 'add', 'form-status--smaller')
				setTimeout(() => {
					btn.disabled = false
					toggleFormStatusElement(btn, 'ok', 'remove')
				},4000)
	
				let formID = data.get('form-id')
				pushEventToMetrics(`mail-sent: ${formID}`)
				break
	
			case "not-valid":
				btn.disabled = false
				showErrors(form, result.errors)
				break
	
			default:
				if (result.message)
					console.log(result.message)
				break
		}
	}

	formSubmit({
		form,
		action: 'feedback',
		callback
	})
}
delegate("submit", "[data-horizontal-form]", horizontalFormSubmit)

function customVariantForm(){
	const file = new FileField({
		container: document.querySelector('#modal-custom-variant [data-file-field]')
	})

	const customVariantSubmit = (event, form) => {
		event.preventDefault()
		clearErrors(form)
		file.clearErrors()
		
		const callback = ({form ,data, result}) => {
			console.log(result)
			toggleFormStatusElement(form, 'preloader', 'remove')
			switch (result.status){
				case 'success':
					toggleFormStatusElement(form, 'mail-sent', 'add')
					setTimeout(() => {
						toggleFormStatusElement(form, 'mail-sent', 'remove')
					},4000)
		
					let formID = data.get('form-id')
					pushEventToMetrics(`mail-sent: ${formID}`)
					break;

				case 'not-valid':
					if (result.errors)
						showErrors(form,result.errors)

					if ( result.file.status == 'not-valid' ){
						if (result.file.errors.forbidden_format == true)
							file.showError('forbidden_format')
						if (result.file.errors.exceeds_maxsize == true)
							file.showError('exceeds_maxsize')

						file.deleteFile()
					}

					break;
			}
		}
	
		toggleFormStatusElement(form, 'preloader', 'add')
	
		formSubmit({
			form,
			action: 'custom_variant',
			callback
		})
	}

	delegate("submit", "[data-custom-variant-form]", customVariantSubmit)
}


export async function formSubmit({form, action, callback}){
	if (!form)
		throw new Error('Форма не определена')

	let data = new FormData(form)
	data.append('action', action)
	data.append('href', window.location.href)

	let result = await makeRequest(`/wp-admin/admin-ajax.php`, data, "POST")
	callback({form,data,result})
}

export function pushEventToMetrics($eventName){
	if (typeof dataLayer == 'undefined') return false

	dataLayer.push({'event': $eventName})
}

export function showErrors(form, errors){
	for (const key in errors){
		let field = form.querySelector(`[name="${key}"]`)
		if (!field)
			continue

		if (typeof errors[key] == "string")
			showError(field, errors[key])
		else
			showError(field, errors[key][0])
	}
}

export function showError(field,text){
	field.insertAdjacentHTML('beforebegin', `<p class="form-elem-error">${text}</p>`)
	field.classList.add('form-text-input--error')
}

export function clearErrors(form){
	let errors = form.querySelectorAll('.form-elem-error')
	if (!errors)
	return false
	
	let inputs = form.querySelectorAll('.form-text-input--error')
	inputs.forEach(input => input.classList.remove('form-text-input--error'))
	errors.forEach(error => error.remove())
}