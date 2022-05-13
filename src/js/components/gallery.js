const initGallery = async () => {
    const galleries = document.querySelectorAll('[data-tobii-gallery]')
    if (galleries.length == 0)
        return

    const init = () => {
        new Tobii({
            selector: '[data-tobii-gallery]',
            zoom: false,
            draggable: true
        })
    }

    let link = `<link rel="stylesheet" href="${window.templateUrl}/static/css/tobii.css"></link>`
    document.body.insertAdjacentHTML('beforeend', link)
    const {default: Tobii} = await import(/* webpackChunkName: "gallery" */ '@midzer/tobii')

    if (document.readyState == 'complete')
        init
    else
        window.addEventListener('load', init)
}
initGallery()