export async function fetchNews() {
    try {
        const response = await fetch("/api/news/v2/top-headlines?country=us&apiKey=0645a4d0f53a44c5b0a1cf1fabfbe8a6")
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        if (data.status !== "ok") {
            console.error("NewsAPI error:", data.message)
            return null
        }
        return data
    } catch (error) {
        console.error("Failed to fetch news:", error)
        return null
    }
}