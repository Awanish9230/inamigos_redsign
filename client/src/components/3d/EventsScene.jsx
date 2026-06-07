import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const TimelineSpiral = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);
  
  const events = useMemo(() => [
    IMAGES.events.summit, IMAGES.events.earthDay, IMAGES.events.volunteerTraining,
    IMAGES.events.happinessDay, IMAGES.events.waterDay, IMAGES.home.ctaBanner,
    IMAGES.causes.bachpanshala, IMAGES.causes.seva
  ], []);

  useFrame((state, delta) => {
    groupRef.current.rotation.z += delta * 0.2; // Rotate the spiral
    
    const targetX = mousePosition.x * 1;
    const targetY = mousePosition.y * 1;
    
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      {events.map((url, i) => {
        const t = i / events.length;
        const angle = t * Math.PI * 4; // Two full turns
        const radius = 2 + t * 2;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;
        const z = -t * 10; // Depth into the screen
        
        return (
          <Image 
            key={i} 
            url={url} 
            position={[x, y, z]} 
            rotation={[0, 0, -angle]}
            scale={[2, 1.5]} 
            transparent 
          />
        );
      })}
    </group>
  );
};

const EventsScene = () => {
  return <TimelineSpiral />;
};

export default EventsScene;
