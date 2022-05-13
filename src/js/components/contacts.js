import Map from '../utils/map'

const contactsMap = () => {
    const mapContainer = document.querySelector('#contacts-map')
    if (!mapContainer)
        return false

    let points = [...mapContainer.querySelectorAll('[data-coords]')]
    let coords = points.map((point) => {
        let split = point.dataset.coords.split(',')

        return [ parseFloat(split[0]), parseFloat(split[1]) ]
    })
    
    const init = () => {
        const map = new Map({
            container: mapContainer
        })
        map.createMap(coords[0])

        coords.forEach((coord) => {
            let placemark = map.createPlacemark(coord)
            map.drawPlacemark(placemark)
        })
    }

    let result = Map.loadAPI('f368790b-c922-4e04-a4b9-a6c4a9a7ad2a')
    if (result === true)
        init()
    else
        result.then(init)
}
contactsMap()