import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/store';
import { Image, Float } from '@react-three/drei';
import { IMAGES } from '../../config/images';

const LayeredParallax = () => {
  const groupRef = useRef();
  const mousePosition = useStore((state) => state.mousePosition);

  useFrame((state, delta) => {
    const targetX = mousePosition.x * 2;
    const targetY = mousePosition.y * 2;
    
    groupRef.current.rotation.y += (targetX * 0.1 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY * 0.1 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.x += (targetX * 0.5 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY * 0.5 - groupRef.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Image url={IMAGES.about.mission} position={[0, 0, -2]} scale={[6, 4]} transparent opacity={0.4} />
        <Image url={IMAGES.about.impact} position={[-3, -1, -1]} scale={[4, 3]} transparent opacity={0.6} />
        <Image url={IMAGES.home.whoWeAre} position={[2, 1, 0]} scale={[4, 3]} transparent opacity={0.8} />
        <Image url={IMAGES.volunteers.hero} position={[0, 0, 2]} scale={[5, 3]} transparent opacity={1} />
      </Float>
    </group>
  );
};

const AboutScene = () => {
  return <LayeredParallax />;
};

export default AboutScene;
