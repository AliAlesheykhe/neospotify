'use client';

import { useState } from 'react';
import { Album } from '../types/artist.types';

interface CreateAlbumFormProps {
  userId: string;
  onSuccess: (album: Album) => void;
  onCancel: () => void;
}

export const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({
  userId,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseDate: '',
    isPublished: true,
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    // Mock create - replace with actual API call
    const newAlbum: Album = {
      id: Date.now().toString(),
      title: formData.title,
      artistId: userId,
      artistName: 'Current Artist',
      tracks: [],
      coverImage: coverImage?.name,
      genre: formData.genre.split(',').map(g => g.trim()),
      releaseDate: new Date(formData.releaseDate),
      isPublished: formData.isPublished,
      totalPlays: 0,
      totalListeners: 0,
      revenue: 0,
    };

    setTimeout(() => {
      setIsCreating(false);
      onSuccess(newAlbum);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Album Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Genre (comma separated)</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({...formData, genre: e.target.value})}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Pop, Rock"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Release Date</label>
          <input
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Status</label>
          <select
            value={formData.isPublished ? 'published' : 'draft'}
            onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'published'})}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="published">✅ Published</option>
            <option value="draft">📝 Draft</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-400"
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          disabled={isCreating}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition font-medium"
        >
          {isCreating ? '⏳ Creating...' : '📀 Create Album'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};