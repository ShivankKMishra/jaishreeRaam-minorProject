import React, { useState, useEffect } from 'react';

const Feed = () => {
  const [techNews, setTechNews] = useState([]);
  const [articlesDisplayed, setArticlesDisplayed] = useState(6); // Initial number of articles displayed

  useEffect(() => {
    fetchTechNews();
  }, []);

  const fetchTechNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=technology&sortBy=popularity&apiKey=7c93013714e2485593397bb64dad05b2`);
      if (!response.ok) {
        throw new Error('Failed to fetch tech news');
      }
      const data = await response.json();

      // Check if articles array exists in data
      if (data.articles) {
        // Filter out only tech news articles
        const filteredTechNews = data.articles.filter(article =>
          article.title.toLowerCase().includes('tech') ||
          article.description.toLowerCase().includes('tech')
        );
        setTechNews(filteredTechNews);
      } else {
        throw new Error('Articles not found in response');
      }
    } catch (error) {
      console.error('Error fetching tech news:', error.message);
    }
  };

  const handleLoadMore = () => {
    // Increment the number of articles displayed by 6
    setArticlesDisplayed(prevCount => prevCount + 6);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Tech News Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techNews.slice(0, articlesDisplayed).map((article, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src={article.urlToImage || 'https://imgs.search.brave.com/9fBVS4I41a7w2yT8LAgOZ5_MOLQiT3V-FC_6inEfxxg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJy/YzdqL3N0eWxlcy9i/YW5uZXJCYWNrZ3Jv/dW5kSW1hZ2VfazE1/cDl1Z3lkOWsxMS5w/bmc'}
              alt={article.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{article.title}</div>
              <p className="text-gray-700 text-base">{article.description}</p>
            </div>
            <div className="px-6 py-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">Read more</a>
            </div>
          </div>
        ))}
      </div>
      {articlesDisplayed < techNews.length && (
        <div className="text-center mt-4">
          <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">Load More</button>
        </div>
      )}
    </div>
  );
};

export default Feed;
