export function lazyLoad(element){
	if (element.nodeName == "PICTURE"){
		let sources = element.querySelectorAll('[data-srcset]')
		sources.forEach(function(source){
			source.srcset = source.dataset.srcset
		})

		let img = element.querySelector('[data-src]')
		if (img)
			img.src = img.dataset.src
	}
	else{
		if (element.dataset.src)
			element.src=element.dataset.src
	    else if (element.dataset.bg)
	        element.style.backgroundImage=`url('${element.dataset.bg}')`
	}
	element.classList.remove('loading')
}


export function startWatch(elements, handler, margin="35% 0% 35%", threshold=0){
	if (!elements)
		return false

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			if(entry.isIntersecting) {
				observer.unobserve(entry.target)
				handler(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(callback, {rootMargin: margin, threshold: threshold });
	for (let i = 0; i < elements.length; i++){
		observer.observe(elements[i])
	}
}