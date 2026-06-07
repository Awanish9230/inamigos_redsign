import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const FacesWall = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const faces = useMemo(() => [
    IMAGES.volunteers.lead1, IMAGES.volunteers.lead2, IMAGES.volunteers.lead3, IMAGES.volunteers.lead4,
    IMAGES.volunteers.vol1, IMAGES.volunteers.vol2, IMAGES.volunteers.vol3, IMAGES.volunteers.vol4, IMAGES.volunteers.vol5,
    IMAGES.volunteers.hero, IMAGES.home.hero, IMAGES.about.mission
  ], []);

  useFrame((state, delta) => {
    const targetX = mousePosition.x * 2;
    const targetY = mousePosition.y * 2;
    
    groupRef.current.position.x += (-targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (-targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.y += (targetX * 0.2 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY * 0.2 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {faces.map((url, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = (col - 1.5) * 2.2;
        const y = (1 - row) * 2.2;
        // Curve the wall slightly
        const z = Math.abs(col - 1.5) * -0.5;
        
        return (
          <Image 
            key={i} 
            url={url} 
            position={[x, y, z]} 
            scale={[2, 2]} 
            transparent 
          />
        );
      })}
    </group>
  );
};

const VolunteersScene = () => {
  return <FacesWall />;
};

export default VolunteersScene;
