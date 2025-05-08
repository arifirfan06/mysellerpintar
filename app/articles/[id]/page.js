import { notFound } from 'next/navigation';
import Image from 'next/image';

export default async function ArticlePage({ params }) {
  const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles/${params.id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const article = await res.json();

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">{article.title}</h1>

      <div className="text-center text-gray-500 mb-6">
        <span>Published on {formattedDate}</span> | <span>By {article.user?.username || 'Unknown'}</span>
      </div>

      <div className="flex justify-center mb-8">
        <img
          src={article.imageUrl || '/no-image.jpeg'}
          alt={article.title}
          width={800}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>

      <div
        className="prose max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
