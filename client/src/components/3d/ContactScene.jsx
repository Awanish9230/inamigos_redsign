import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image, Float } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const ContactCard = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useFrame((state, delta) => {
    const targetX = mousePosition.x * 2;
    const targetY = mousePosition.y * 2;
    
    // Smooth, intense tilt
    groupRef.current.rotation.y += (targetX * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY * 0.3 - groupRef.current.rotation.x) * 0.05;
    
    groupRef.current.position.x += (targetX * 0.2 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY * 0.2 - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <Image 
          url={IMAGES.contact.office} 
          position={[0, 0, 0]} 
          scale={[6, 4]} 
          transparent 
        />
        {/* Subtle shadow/duplicate behind */}
        <Image 
          url={IMAGES.contact.office} 
          position={[0.2, -0.2, -0.5]} 
          scale={[6, 4]} 
          transparent 
          opacity={0.3}
        />
      </Float>
    </group>
  );
};

const ContactScene = () => {
  return <ContactCard />;
};

export default ContactScene;
