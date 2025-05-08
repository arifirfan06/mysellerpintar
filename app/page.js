'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch articles
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://test-fe.mysellerpintar.com/api/articles');
        const data = await response.json();
        setArticles(data.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://test-fe.mysellerpintar.com/api/categories');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <>
      <div className="relative w-full h-[700px]">
        <Image
          src="/main-bg.jpg"
          alt="main-bg"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-blue-600 opacity-[0.86] z-10" />
        <div className="relative z-10 flex flex-col items-center md:px-96 justify-center h-full text-white">
          <h1 className="text-xl font-bold">Blog Genzet</h1>
          <h1 className=" text-2xl lg:text-6xl text-center mt-5">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <span className="mt-5 text-xl lg:text-4xl">
            Your daily dose of design insights!
          </span>

          {/* Dropdown and Search */}
          <div className="flex mt-10 gap-4 w-full max-w-2xl">
            {/* Dropdown */}
            <select
              className="p-3 rounded-lg text-black w-1/3 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative w-2/3 bg-white rounded-lg">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles"
                className="pl-10 pr-4 py-3 w-full rounded-lg text-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <span className="text-gray-600 text-sm">Showing: {articles.length} articles</span>

        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl">
                {/* Image */}
                <div className="w-full h-48 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Category */}
                    <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold rounded-full px-3 py-1 mb-2">
                      {article.category.name}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Content preview */}
                    <p
                      className="text-gray-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>

                  {/* Meta */}
                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>By {article.user.username}</span>
                    <span>
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
