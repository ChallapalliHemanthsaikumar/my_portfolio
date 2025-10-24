import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';
import { skills, certifications } from '../data/portfolioData';

const SkillsSection: React.FC = () => {
  const skillCategories = Object.entries(skills);

  const SkillCategory: React.FC<{ category: string; skillList: string[]; index: number }> = ({ 
    category, 
    skillList, 
    index 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="card p-6"
    >
      <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
        {category}
      </h3>
      <div className="space-y-3">
        {skillList.map((skill, skillIndex) => (
          <motion.div
            key={skillIndex}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.1) + (skillIndex * 0.05), duration: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-50 transition-colors group"
          >
            <CheckCircle size={16} className="text-primary-600 group-hover:text-primary-700 transition-colors" />
            <span className="text-secondary-700 group-hover:text-secondary-900 transition-colors">
              {skill}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const CertificationCard: React.FC<{ cert: any; index: number }> = ({ cert, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="card p-6 text-center group"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-primary-200 group-hover:to-primary-300 transition-all">
        <Award size={32} className="text-primary-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
        {cert.title}
      </h3>
      
      <p className="text-secondary-600 text-sm mb-3">
        {cert.description}
      </p>
      
      <div className="flex items-center justify-center gap-4 text-sm text-secondary-500 mb-4">
        <span className="font-medium">{cert.organization}</span>
        <span>•</span>
        <span>{cert.date}</span>
      </div>
      
      {cert.url && (
        <motion.a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          View Certificate
          <ExternalLink size={14} />
        </motion.a>
      )}
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A comprehensive toolkit for building cutting-edge AI and software solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map(([category, skillList], index) => (
            <SkillCategory 
              key={category} 
              category={category} 
              skillList={skillList} 
              index={index} 
            />
          ))}
        </div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: "25+", label: "Technologies", icon: "💻" },
            { number: "5+", label: "Years Experience", icon: "⏱️" },
            { number: "10+", label: "Projects Completed", icon: "🚀" },
            { number: "5", label: "Certifications", icon: "🏆" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{stat.number}</div>
              <div className="text-secondary-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">Professional Certifications</h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Industry-recognized certifications validating expertise in cloud computing, AI, and data science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Technical Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
            Core Competencies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "AI/ML Engineering",
                description: "LLMs, Computer Vision, NLP, MLOps",
                icon: "🧠",
                proficiency: 95
              },
              {
                title: "Cloud Architecture",
                description: "Azure, AWS, Kubernetes, Docker",
                icon: "☁️",
                proficiency: 90
              },
              {
                title: "Full Stack Development",
                description: "React, TypeScript, Python, FastAPI",
                icon: "💻",
                proficiency: 85
              },
              {
                title: "Data Science",
                description: "Analytics, Visualization, Statistical Modeling",
                icon: "📊",
                proficiency: 88
              }
            ].map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 text-center"
              >
                <div className="text-3xl mb-3">{competency.icon}</div>
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">{competency.title}</h4>
                <p className="text-secondary-600 text-sm mb-4">{competency.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${competency.proficiency}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                  ></motion.div>
                </div>
                <span className="text-xs text-secondary-500">{competency.proficiency}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;