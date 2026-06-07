import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image, Float } from '@react-three/drei';
import { IMAGES } from '../../config/images';
import * as THREE from 'three';

const ImpactCluster = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const images = useMemo(() => [
    { url: IMAGES.home.hero, position: [0, 0, 1], scale: [4, 2.5] },
    { url: IMAGES.causes.seva, position: [-3, 1, 0], scale: [2.5, 3] },
    { url: IMAGES.causes.bachpanshala, position: [3, -1, 0.5], scale: [2, 2.5] },
    { url: IMAGES.causes.prakriti, position: [2, 2, -1], scale: [2, 2] },
    { url: IMAGES.causes.udaan, position: [-2, -2, -0.5], scale: [2.5, 2] },
  ], []);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.05;
    
    const targetX = mousePosition.x * 0.5;
    const targetY = mousePosition.y * 0.5;
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.x += (targetY * 0.5 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {images.map((img, i) => (
          <Image 
            key={i} 
            url={img.url} 
            position={img.position} 
            scale={img.scale} 
            transparent 
            opacity={0.9} 
          />
        ))}
      </Float>
    </group>
  );
};

const HomeScene = () => {
  return <ImpactCluster />;
};

export default HomeScene;
