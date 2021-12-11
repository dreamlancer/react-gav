export const getItem = async (item) => {
    try {
        return await localStorage.getItem(item)
    } catch (error) {
        throw error
    }
}


export const setItem = (item, value) => {
    try {
        localStorage.setItem("item", JSON.stringify(value))
    } catch (error) {
        throw error
    }
}