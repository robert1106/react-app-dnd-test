export const request = async (url) => {
    const data = await fetch(url)
    return data.json()
}