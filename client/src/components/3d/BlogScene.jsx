import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image, Float } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const StackedDeck = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const cards = useMemo(() => [
    { url: IMAGES.blog.featured, position: [0, 0, 1], rotation: [0, 0, -0.1] },
    { url: IMAGES.blog.post1, position: [1, 0.5, 0.5], rotation: [0.1, 0.2, 0.2] },
    { url: IMAGES.blog.post2, position: [-1, -0.5, 0], rotation: [-0.1, -0.2, -0.2] },
    { url: IMAGES.blog.post3, position: [0, -1, -0.5], rotation: [0.2, -0.1, 0.1] },
  ], []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.1;
    
    const targetX = mousePosition.x * 1;
    const targetY = mousePosition.y * 1;
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.x += (targetY * 0.2 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {cards.map((c, i) => (
          <Image 
            key={i} 
            url={c.url} 
            position={c.position} 
            rotation={c.rotation}
            scale={[3, 4]} 
            transparent 
          />
        ))}
      </Float>
    </group>
  );
};

const BlogScene = () => {
  return <StackedDeck />;
};

export default BlogScene;
