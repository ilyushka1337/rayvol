import noUiSlider from 'nouislider';

function createRangeSlider(container, fromInput = false, toInput = false){
    if (!container)
        return false

    const from = parseInt(container.dataset.from)
    const to = parseInt(container.dataset.to)

    const slider = noUiSlider.create(container, {
        start: [from, to],
        connect: true,
        step: 10,
        range: {
            'min': from,
            'max': to
        }
    });

    if (fromInput || toInput){
        slider.on('update', (values, handle, unencoded, tap, positions, noUiSlider) => {
            const from = Math.ceil(unencoded[0])
            const to = Math.ceil(unencoded[1])

            if (fromInput)
                fromInput.value = from
            if (toInput)
                toInput.value = to
        })
    }
    if (fromInput)
        fromInput.addEventListener('change', (event) => {
            const value = parseInt(fromInput.value)
            slider.set([value, null], true, true)
        })
    if (toInput)
        toInput.addEventListener('change', (event) => {
            const value = parseInt(toInput.value)
            slider.set([null, value], true, true)
        })

    return slider
}

export default createRangeSlider