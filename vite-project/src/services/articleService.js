const API_URL = 'http://localhost:10000/articles'

export const articleService = {
  async fetchArticles(controller) {
    const response = await fetch(API_URL, {
      signal: controller?.signal
    })
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
    return await response.json()
  }
}