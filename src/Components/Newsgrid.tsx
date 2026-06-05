

import {fetchNews} from "../Services/Fetchapi"
import {useEffect, useState} from 'react'

interface Article {
  title: string
  description: string | null
  url: string
  urlToImage: string | null
}

export default function NewsGrid({ searchQuery, storiesEnabled }: { searchQuery: string; storiesEnabled: boolean }) {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string|null>(null)

 

    useEffect(()=>{
        async function loadNews(){
            const data = await fetchNews()
            if(data){
                setArticles(data.articles)
                setLoading(false)
            }else{
                setError("Failed to fetch news")
                setLoading(false)
            }   
        }
        loadNews()
    },[])
    if(loading){
        return (
            <div className="flex justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }
    if(error){
        return (
            <div className="flex justify-center">
                <p className="text-gray-500">{error}</p>
            </div>
        )
    }
    function redirectNews(url:string){
        window.location.href = url
    }

    const filteredArticles = articles.filter(article =>
        {
            const query = searchQuery.toLowerCase();
            return (
                article.title.toLowerCase().includes(query) ||
                article.description?.toLowerCase().includes(query)
            );
        }
    );
    return (
        <>
        {
            storiesEnabled && (
                <div className="flex flex-col items-center justify-center">
               {filteredArticles.length === 0 && searchQuery && (
            <p className="text-gray-500 mt-4">No articles found for "{searchQuery}"</p>
        )}
            <div className="w-3/4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 cursor-pointer">
        {filteredArticles.map((article,index)=>(
                <div key={index} className="card border rounded-2xl overflow-hidden transition duration-200 bg-slate-800 hover:border-slate-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <img src={article.urlToImage?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAMFBMVEXz9Pa5vsq1usfv8PPGytTW2eD4+frh5Oi9ws3r7fDl5+zo6u7Jzdbe4ebBxdDS1d3ITdXMAAAB5ElEQVR4nO2Z2ZaDIBAFlS0IKP//txFNoqJxYQ6NM3PrWaVOo5cGqwoAAAAAAAAAAAAAAAAAAAAAAAAAfwxuHilYntvL16xOgWmpsoq5NK/BTeY0k+liPY+MZl0YQKcQbnT55pOH57c8gaHaOptY1YTJbJJuNZnNaphdZW7GpRNCntakM2v1GCBnQ4rMzL6D7Wx+UpnxbspPeyuzdloLmD+Vn1RmfrZKiY0L150FkZlys9Ww2xBjXax2j5oZXTMR5QmV2WMSY34lNrRwUSmpzJqdb9OOScfcYkLJ8sx8pjPOM/Mp5uJdIzNT7dh1r+bSdtMrOK8a3eqkuBRh3YzCzCy2CbOqle41rK4XuLuYmUisD4931cqaNXq9gXlXrahZPJWLqtGbyXYS29zyMVfGrF+mXkk7j4sNNWqzXqxXC8nBv58qsHBuQGwmh5G1Ud8rVsbMv4bWttl6+cuZyc/YeqdiBcz8nk1JM3kkVMhM+SOfUmZXDtJIzS6d8FGaKXFBjNbMHdnA7DeZ3fYLuFYzT5ln1w62q9L7gD3+tRkzKoU2rxkPDaIWKeiwjcr4t27syVgC4bb2eIBk+G7zehAeLuvP18YlVSwUzR0//WdYmYbJLQYAAAAAAAAAAAAAAAAAAABK8wQhYxpeBheJagAAAABJRU5ErkJggg=="}  alt={article.title}
            onClick={() => redirectNews(article.url)}
            className='w-full h-40 object-cover'/>
            <div className="card-info p-3">
                <div className="card-category mb-1">
                </div>
                <div className="card-title">
                    <h2 className="font-semibold text-sm line-clamp-2 hover:text-slate-500">{article.title}</h2>
                </div>
                <div className="card-description mt-1">
                    <p className="text-xs text-gray-500 line-clamp-2">{article.description}</p>
                </div>
            </div>
        </div>
        ))}
        </div>
        </div>
            )
        }
        
      
        </>
        
    )
}