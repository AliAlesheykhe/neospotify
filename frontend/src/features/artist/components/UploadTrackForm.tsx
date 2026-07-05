'use client';

import { useState, useEffect } from 'react';
import { Track } from '../types/artist.types';

interface UploadTrackFormProps {
  userId: string;
  existingTrack?: Track | null;
  onSuccess: (track: Track) => void;
  onCancel: () => void;
}

export const UploadTrackForm: React.FC<UploadTrackFormProps> = ({
  userId,
  existingTrack,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseDate: '',
    lyrics: '',
    isPublished: true,
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (existingTrack) {
      setFormData({
        title: existingTrack.title,
        genre: existingTrack.genre.join(', '),
        releaseDate: existingTrack.releaseDate.toISOString().split('T')[0],
        lyrics: existingTrack.lyrics || '',
        isPublished: existingTrack.isPublished,
      });
    }
  }, [existingTrack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFile && !existingTrack) {
      alert('Please select an audio file');
      return;
    }

    setIsUploading(true);
    
    // Mock upload - replace with actual API call
    const newTrack: Track = {
      id: existingTrack?.id || Date.now().toString(),
      title: formData.title,
      artistId: userId,
      artistName: 'Current Artist',
      genre: formData.genre.split(',').map(g => g.trim()),
      releaseDate: new Date(formData.releaseDate),
      lyrics: formData.lyrics,
      audioFile: audioFile?.name || existingTrack?.audioFile || 'mock.mp3',
      coverImage: coverImage?.name || existingTrack?.coverImage,
      isPublished: formData.isPublished,
      playCount: existingTrack?.playCount || 0,
      listenerCount: existingTrack?.listenerCount || 0,
      revenue: existingTrack?.revenue || 0,
    };

    setTimeout(() => {
      setIsUploading(false);
      onSuccess(newTrack);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Track Title *</label>
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
            placeholder="Pop, Rock, Jazz"
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

      {!existingTrack && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-1">Audio File *</label>
            <input
              type="file"
              accept=".mp3,.wav,.flac"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-400"
              required
            />
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
        </div>
      )}

      <div>
        <label className="block text-gray-300 text-sm mb-1">Lyrics</label>
        <textarea
          value={formData.lyrics}
          onChange={(e) => setFormData({...formData, lyrics: e.target.value})}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
          placeholder="Write your lyrics here..."
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <button
          type="submit"
          disabled={isUploading}
          className="px-6 py-2 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition font-medium"
        >
          {isUploading ? '⏳ Uploading...' : existingTrack ? '💾 Update Track' : '📤 Upload Track'}
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