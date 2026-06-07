import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const FloatingExhibition = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const photos = useMemo(() => [
    IMAGES.gallery.foodDistribution[0], IMAGES.gallery.animalRescue[0], IMAGES.gallery.treePlantation[0],
    IMAGES.gallery.education[0], IMAGES.gallery.allStories[0], IMAGES.gallery.allStories[1], 
    IMAGES.causes.prakriti, IMAGES.causes.udaan
  ], []);

  useFrame((state, delta) => {
    const targetX = mousePosition.x * 2;
    const targetY = mousePosition.y * 2;
    
    groupRef.current.position.x += (-targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (-targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.y += (targetX * 0.1 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY * 0.1 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {photos.map((url, i) => {
        // Deterministic pseudo-random placement to avoid flashing on re-renders
        const x = ((i * 1.5) % 10) - 5;
        const y = ((i * 2.3) % 8) - 4;
        const z = ((i * 1.1) % 5) - 2.5;
        const rotY = ((i * 0.7) % 1) - 0.5;
        
        return (
          <Image 
            key={i} 
            url={url} 
            position={[x, y, z]} 
            rotation={[0, rotY, 0]}
            scale={[2.5 + (i%2), 2 + (i%1.5)]} 
            transparent 
          />
        );
      })}
    </group>
  );
};

const GalleryScene = () => {
  return <FloatingExhibition />;
};

export default GalleryScene;
