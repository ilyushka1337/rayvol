const pjaxInit = async () => {
    const links = document.querySelector('[data-pjax-links]')
    if (!links)
        return

    const init = () => {
        new Pjax({
            areas: [
                '#container, #pagination',
            ],
            filter: (link) => {
                return link.matches('[data-pjax-links] a')
            }
        })
    }
    const {default: Pjax} = await import(/* webpackChunkName: "pjax-api" */ 'pjax-api')
    if (document.readyState == 'complete')
        init()
    else
        window.addEventListener('load', init)
}
pjaxInit()