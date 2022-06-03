export function delegate(eventName, elementSelector, handler,listener=document){
	if (!listener)
		return false;
		
	listener.addEventListener(eventName, function(e){
		for (let target = e.target; target && target != this; target = target.parentNode) {
			if (target.matches(elementSelector)) {
				handler.call(target, e, target);
				break;
			}
		}
	});
}
export function isCollapsed(element) {
	return element.classList.contains('is-collapsed');
}
function onSchedule(fn) {
	requestAnimationFrame(function() {
		requestAnimationFrame(function() {
		  fn();
		});
	});
}
export function slideOpen(element, toggle=false){
	if (toggle){
		toggle.classList.add('toggle-active')
	}
	element.style.height = `${element.scrollHeight}px`;
	onSchedule(function(){
		element.classList.remove('is-collapsed');
		element.addEventListener("transitionend", function onTransitionEnd() {
			element.removeEventListener("transitionend", onTransitionEnd);
			element.style.height = "";
		});  
	})
}
export function slideClose(element, toggle=false){
	if (toggle){
		toggle.classList.remove('toggle-active')
	}
	element.style.height = `${element.scrollHeight}px`;
	onSchedule(function() {
		element.classList.add('is-collapsed');
		element.style.height = "";
	});
}
export function slideToggle(element, toggle=false){
	isCollapsed(element) ? slideOpen(element, toggle) : slideClose(element, toggle);
}
export function isMobile(media = "(max-width: 1279px)"){
	return window.matchMedia(media).matches
}
export function isIndexPage(){
	return location.pathname == "/"
}
export function formatNumber(number){
	return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
}
export function toggleScroll(state=false){
	if (state == "hidden"){
		document.documentElement.classList.remove('overflow-auto')
		document.documentElement.classList.add('overflow-hidden')
	}
	else if(state == "auto"){
		document.documentElement.classList.remove('overflow-hidden')
		document.documentElement.classList.add('overflow-auto')
	}
	else{
		if (document.documentElement.classList.contains('overflow-hidden')){
			document.documentElement.classList.remove('overflow-hidden')
			document.documentElement.classList.add('overflow-auto')
		}
		else{
			document.documentElement.classList.remove('overflow-auto')
			document.documentElement.classList.add('overflow-hidden')
		}
	}
}
export function serializeObject(object, base=""){ 
	let s = "";
	for (let key in object) { 
		if (s != "") { 
			s += "&"; 
		}
		if (object[key].values){
			object[key].values.forEach((value) => {
				s += "&" + key + "=" + encodeURIComponent(value); 
			})
		}
		else
			s += (key + "=" + encodeURIComponent(object[key])); 
	} 
	return base+"?"+s
}
export function parseSearchParams(){
	let url = new URL(location.href)
	let search = url.searchParams
	let data = {}
	let i = 0
	for(const pair of search.entries()){
		let match = pair[0].match(/\[\]/i)
		if (match){
			let all = search.getAll(pair[0])
			data[pair[0]] = {}
			data[pair[0]].values = []
			all.forEach((value,i) => {
				data[pair[0]].values[i] = value
			})
		}
		else
			data[pair[0]] = pair[1]
	}

	return data
}
export function createObjectFromFormData(formData){
	let object = {}
	for (let key of formData.keys()){
		let value = formData.get(key)

		object[key] = value
	}
	return object
}
export function notTextKey(key){
	const cancelKeys = ['Meta', 'Control', 'Shift', 'Alt', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'CapsLock', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']

	return cancelKeys.includes(key)
}