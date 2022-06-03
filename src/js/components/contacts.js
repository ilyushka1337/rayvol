import Map from '../utils/map'

const contactsMap = () => {
    const mapContainer = document.querySelector('#contacts-map')
    if (!mapContainer)
        return false
    
    const init = () => {
        let points = [...mapContainer.querySelectorAll('[data-coords]')]
        let coords = points.map((point) => {
            let split = point.dataset.coords.split(',')

            return [ parseFloat(split[0]), parseFloat(split[1]) ]
        })
        
        const map = new Map({
            container: mapContainer,
            icon: {
                href: window.templateUrl + '/static/images/map-pin.svg',
                size: [50, 65],
                offset: [-25, -65],
            }
        })
        map.createMap(coords[0])

        coords.forEach((coord) => map.createPlacemark(coord))
    }

    let result = Map.loadAPI('fe887160-5c7c-4d9c-8cd7-7c555a69b0d9')
    if (result === true)
        init()
    else
        result.then(init)
}
contactsMap()