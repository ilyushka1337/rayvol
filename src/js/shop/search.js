import debounce from "lodash-es/debounce";
import { notTextKey, serializeObject } from "../utils/utils";


function headerSearch(){
    const searchContainer = document.querySelector('[data-header-search]')
    if (!searchContainer)
        return

    const resultsContainer = searchContainer.querySelector('[data-search-results]')
    const searchInput = searchContainer.querySelector('[data-search-input]')

    const parser = new DOMParser();

    const onSearchChange = (event) => {
        if (notTextKey(event.key) && !searchInput.value)
            return
        
        const query = {
            AJAX_CALL: 'Y',
            bxajaxid: '0222bf5b4f82257e8f20e6c586eeb89d',
            sessid: window.sessID,
            q: searchInput.value,
            how: 'r'
        };
        fetch(`/${ serializeObject(query) }`).then(async response => {
            const html = await response.text()

            const doc = parser.parseFromString(html, "text/html");
            const results = doc.querySelector('#results').innerHTML
            insertResult(results)
        })
    }
    const insertResult = (html) => {
        resultsContainer.innerHTML = html
        resultsContainer.classList.remove('hidden')
    }

    searchInput.addEventListener('keyup', debounce(onSearchChange, 300))
}
headerSearch()