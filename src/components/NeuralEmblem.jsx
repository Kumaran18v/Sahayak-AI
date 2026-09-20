import React from 'react';

export default function NeuralEmblem({ className = "h-8 w-8", size = 48 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 48 48" 
      width={size} 
      height={size} 
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="sahayakGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id="neuralCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.0" />
        </radialGradient>
        <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Futuristic Hexagonal Neural Diamond Frame */}
      <path 
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z" 
        stroke="url(#sahayakGlow)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="#0B0F19" 
        fillOpacity="0.9" 
      />
      {/* Inner Neural Nodes & Synapses representing local on-device neural mesh */}
      <circle cx="24" cy="24" r="5" fill="url(#sahayakGlow)" filter="url(#coreGlow)" />
      <circle cx="24" cy="13" r="2" fill="#00D2FF" />
      <circle cx="34" cy="19" r="2" fill="#3B82F6" />
      <circle cx="34" cy="29" r="2" fill="#6366F1" />
      <circle cx="24" cy="35" r="2" fill="#8B5CF6" />
      <circle cx="14" cy="29" r="2" fill="#00D2FF" />
      <circle cx="14" cy="19" r="2" fill="#38BDF8" />
      <path 
        d="M24 13L24 19M24 29L24 35M34 19L28 22M14 19L20 22M34 29L28 26M14 29L20 26" 
        stroke="#00D2FF" 
        strokeWidth="1.5" 
        strokeOpacity="0.7" 
        strokeLinecap="round" 
      />
      {/* Core Snapdragon Neural Spark */}
      <polygon points="24,20 25.5,23 28.5,24 25.5,25 24,28 22.5,25 19.5,24 22.5,23" fill="#FFFFFF" />
    </svg>
  );
}
