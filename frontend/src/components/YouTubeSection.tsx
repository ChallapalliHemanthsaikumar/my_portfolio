import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Youtube, ExternalLink } from 'lucide-react';
import { youtubeVideos, personalInfo } from '../data/portfolioData';

const YouTubeSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const VideoCard: React.FC<{ video: any; index: number }> = ({ video, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="card overflow-hidden group cursor-pointer"
      onClick={() => setSelectedVideo(video.videoId)}
    >
      <div className="relative">
        <img 
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Play size={24} className="text-white ml-1" />
          </motion.div>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-sm text-secondary-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(video.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Youtube size={14} className="text-red-600" />
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="youtube" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">YouTube Content</h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Sharing knowledge through tutorials, insights, and technical deep-dives
          </p>
        </motion.div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
              >
                ×
              </button>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                  title="YouTube video player"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Videos Grid */}
        {youtubeVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {youtubeVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Youtube size={48} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                YouTube Content Coming Soon!
              </h3>
              <p className="text-secondary-600 mb-6">
                I'll be sharing tutorials, project walkthroughs, and insights about AI, ML, and software development.
              </p>
              <motion.a
                href={personalInfo.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <Youtube size={20} />
                Subscribe to My Channel
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Featured Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Upcoming Content Topics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "LangChain & AI Agents",
                description: "Building intelligent agents with LangChain and GPT-4",
                icon: "🤖"
              },
              {
                title: "MLOps Best Practices",
                description: "Deploying ML models with Azure ML and Kubernetes",
                icon: "⚙️"
              },
              {
                title: "RAG Systems",
                description: "Creating Retrieval-Augmented Generation pipelines",
                icon: "🔍"
              },
              {
                title: "Computer Vision",
                description: "Deep learning for image processing and analysis",
                icon: "👁️"
              },
              {
                title: "Full Stack AI Apps",
                description: "Building end-to-end AI applications with React & FastAPI",
                icon: "💻"
              },
              {
                title: "Cloud Architecture",
                description: "Designing scalable AI solutions on Azure & AWS",
                icon: "☁️"
              }
            ].map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{topic.icon}</div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">{topic.title}</h4>
                <p className="text-secondary-600 text-sm">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        {youtubeVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.a
              href={personalInfo.youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <Youtube size={20} />
              Visit My YouTube Channel
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default YouTubeSection;