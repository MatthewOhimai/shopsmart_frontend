export const setMenuState = (category) => {
    localStorage.setItem("category", category)
}

export const getMenuState = () => {
    return localStorage.getItem("category")
}

