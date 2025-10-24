import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Calendar } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  size: number;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

const OpenSourceSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setStats({
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following
          });
        }

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${personalInfo.githubUsername}/repos?sort=updated&per_page=6`
        );
        
        if (reposResponse.ok) {
          const reposData = await reposResponse.json();
          setRepos(reposData);
        } else {
          throw new Error('Failed to fetch repositories');
        }
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Unable to load GitHub data. Please check the username in portfolioData.ts');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      'C#': '#239120',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      PHP: '#4F5D95',
      Ruby: '#701516',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#2c3e50',
      React: '#61dafb',
    };
    return colors[language] || '#858585';
  };

  const RepoCard: React.FC<{ repo: GitHubRepo; index: number }> = ({ repo, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="card p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github size={20} className="text-secondary-600" />
          <h3 className="text-lg font-semibold text-secondary-900">{repo.name}</h3>
        </div>
        <motion.a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-secondary-500 hover:text-primary-600 transition-colors"
        >
          <ExternalLink size={18} />
        </motion.a>
      </div>

      <p className="text-secondary-600 mb-4 flex-1">
        {repo.description || 'No description available'}
      </p>

      {/* Topics/Tags */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {repo.topics.slice(0, 3).map((topic, i) => (
              <span 
                key={i}
                className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="text-secondary-500 text-xs px-2 py-1">
                +{repo.topics.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Repository Stats */}
      <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              ></div>
              <span>{repo.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star size={14} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={14} />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{formatDate(repo.updated_at)}</span>
        </div>
      </div>

      <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-auto bg-secondary-900 text-white text-center py-2 px-4 rounded-lg hover:bg-secondary-800 transition-colors"
      >
        View Repository
      </motion.a>
    </motion.div>
  );

  if (loading) {
    return (
      <section id="opensource" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-secondary-600">Loading GitHub repositories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="opensource" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Open Source Contributions</h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Building and contributing to the developer community through open source projects
          </p>
        </motion.div>

        {/* GitHub Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stats.public_repos}</div>
              <div className="text-secondary-600">Public Repositories</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stats.followers}</div>
              <div className="text-secondary-600">Followers</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stats.following}</div>
              <div className="text-secondary-600">Following</div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-secondary-600 text-sm">
                Update the GitHub username in <code>src/data/portfolioData.ts</code>
              </p>
            </div>
          </motion.div>
        )}

        {/* Repositories Grid */}
        {repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {repos.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-secondary-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-800 transition-colors"
          >
            <Github size={20} />
            View All Repositories
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSourceSection;