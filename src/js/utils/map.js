export default class Map{
	constructor({container, icon}){
		if (!container)
			throw new Error("Контейнер не определён")

		this.container = container
		this.coords = []
		this.icon = icon
		this.createMap = this.createMap.bind(this)
		this.mapCreatedEvent = new CustomEvent('mapCreated', {bubbles: true})
	}

	static ymapIsReady = false

	static loadAPI(key){
		if (Map.ymapIsReady === true)
			return true

		return new Promise((resolve,reject) => {
			let script = document.createElement('script')
			script.src = `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`
			script.addEventListener('load', () => {
				ymaps.ready(() => {
					Map.ymapIsReady = true
					resolve("loaded")
				})
			})
			document.body.append(script)
		})
	}
	createMap(center = [55.755814, 37.617635], zoom = 15){
		this.ymap = new ymaps.Map(this.container, {
			center:		center,
			zoom:		zoom,
			controls:	['zoomControl', 'typeSelector', 'fullscreenControl']
		})
		this.container.dispatchEvent(this.mapCreatedEvent)
	}
	createPlacemark(coords){
		const placemark = new ymaps.Placemark(
			coords,
			{

			},
			{
				iconLayout: 'default#image',
	            iconImageHref:  this.icon.href,
	            iconImageSize: this.icon.size,
	            iconImageOffset: this.icon.offset
			}
		);
		this.ymap.geoObjects.add(placemark)
	}
	clearPlacemarks(){
		if (this.ymap)
			this.ymap.geoObjects.removeAll()
	}
	setCenter(center,zoom = 15){
		if (this.ymap){
			this.ymap.setCenter(center,zoom)
		}
	}
}