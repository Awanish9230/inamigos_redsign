import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const CausesCarousel = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const causes = useMemo(() => [
    IMAGES.causes.seva,
    IMAGES.causes.bachpanshala,
    IMAGES.causes.jeev,
    IMAGES.causes.udaan,
    IMAGES.causes.prakriti,
    IMAGES.causes.vikas
  ], []);

  const radius = 4;

  useFrame((state, delta) => {
    groupRef.current.rotation.y -= delta * 0.1; // Auto rotate
    
    const targetX = mousePosition.x * 1;
    const targetY = mousePosition.y * 1;
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.x += (targetY * 0.2 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {causes.map((url, i) => {
        const angle = (i / causes.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        return (
          <Image 
            key={i} 
            url={url} 
            position={[x, 0, z]} 
            rotation={[0, angle, 0]} 
            scale={[2.5, 3]} 
            transparent 
          />
        );
      })}
    </group>
  );
};

const CausesScene = () => {
  return <CausesCarousel />;
};

export default CausesScene;
