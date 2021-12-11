const serialize = function (url, obj) {
    let str = []
    for (let p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
        }
    return url + str.join("&")
}

export default serialize