import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MessageCard from './components/MessageCard';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

// Adding decorative elements
const DecorationCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,105,180,0.3) 0%, rgba(255,105,180,0) 70%);
  filter: blur(8px);
  z-index: 1;
`;

const StarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: white;
  border-radius: 50%;
  opacity: ${props => props.opacity};
  animation: twinkle ${props => props.duration}s ease-in-out infinite;
  
  @keyframes twinkle {
    0%, 100% { opacity: ${props => props.opacity}; transform: scale(1); }
    50% { opacity: ${props => props.opacity * 0.5}; transform: scale(0.8); }
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(1.8rem, 5vw, 3rem);
  color: #ff69b4;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.7), 0 0 20px rgba(255, 105, 180, 0.5);
  margin-bottom: 20px;
  margin-top: 20px;
  z-index: 10;
  font-family: 'Pacifico', cursive;
  letter-spacing: 1px;
  text-align: center;
  padding: 0 15px;
  width: 100%;
  max-width: 90vw;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin-bottom: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 3.5vw, 1.8rem);
    letter-spacing: 0.5px;
  }
`;

// Then in your JSX:
<Title
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="responsive-title"
>
 Chúc mừng ngày 8/3 mẹ yêu!
</Title>

const PuppyContainer = styled(motion.div)`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin-bottom: 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 10px;
    background: radial-gradient(ellipse at center, rgba(255,105,180,0.3) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    filter: blur(5px);
  }
`;

// Decorative frame around the puppy
// const PuppyFrame = styled.div`
//   position: absolute;
//   width: 80%;
//   height: 90%;
//   border: 2px dashed rgba(255, 105, 180, 0.3);
//   border-radius: 20px;
//   z-index: 4;
//   pointer-events: none;
  
//   &:before, &:after {
//     content: '';
//     position: absolute;
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background-color: rgba(255, 105, 180, 0.5);
//   }
  
//   &:before {
//     top: -10px;
//     left: -10px;
//   }
  
//   &:after {
//     bottom: -10px;
//     right: -10px;
//   }
// `;

function App() {
  const modelViewerRef = useRef(null);
  
  const stars = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.3;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    
    return (
      <Star 
        key={i}
        size={size}
        opacity={opacity}
        duration={duration}
        style={{ top: `${top}%`, left: `${left}%` }}
      />
    );
  });

  // Decorative circles
  const circles = [
    { size: 300, x: '10%', y: '20%', delay: 0 },
    { size: 200, x: '85%', y: '15%', delay: 0.3 },
    { size: 250, x: '75%', y: '80%', delay: 0.6 },
    { size: 180, x: '15%', y: '75%', delay: 0.9 },
  ];

  useEffect(() => {
    if (modelViewerRef.current) {
      // Any model-viewer specific setup
    }
  }, []);

  return (
    <AppContainer>
      {/* Background stars */}
      <StarContainer>
        {stars}
      </StarContainer>
      
      {/* Decorative circles */}
      {circles.map((circle, index) => (
        <DecorationCircle
          key={index}
          style={{ 
            width: circle.size, 
            height: circle.size, 
            left: circle.x, 
            top: circle.y 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: circle.delay, duration: 1 }}
        />
      ))}
      
      <FloatingHearts count={20} />
      
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Chúc mừng ngày 8/3 mẹ yêu!
      </Title>
      
      <PuppyContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* <PuppyFrame /> */}
        <model-viewer
          ref={modelViewerRef}
          src={`${process.env.PUBLIC_URL}/toon_cute_dog.glb`}
          alt="A cute cartoon dog"
          auto-rotate
          camera-controls
          camera-orbit="0deg 10deg 2m"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          shadow-intensity="1"
          environment-image="neutral"
          exposure="1"
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ width: '100%', height: '90%' }}
        ></model-viewer>
      </PuppyContainer>
      
      <MessageCard marginBottom={true} />
    </AppContainer>
  );
}

export default App;