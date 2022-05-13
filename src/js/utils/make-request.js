export default async function makeRequest(url, data=false, method="GET", returnRaw = false){
    let params = {
        method: method,
    }
    if (method == "POST")
        params.body = data

    let response = await fetch(url,params)
    let result
    if (returnRaw)
        result = await response
    else
        result = await response.json()
    return result
}