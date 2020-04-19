import ReactDOM from 'react-dom'
import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import './index.css'

const size = 0.5;

const generatePositions = () => {
    const coords = [];
    for (let i = -5; i < 6; i++) {
        for (let j = -5; j < 6; j++) {
            coords.push([i*size, j*size, 0])
        }
    }
    return coords;
};

const positions = generatePositions();

function Box(props) {
    const mesh = useRef();

    useFrame(() => (mesh.current.rotation.y = mesh.current.rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={[size, size, size]}>
            <torusBufferGeometry attach="geometry" args={[.5, 0.1, 5, 25]} />
            <meshStandardMaterial attach="material" color='orange' />
        </mesh>
    )
}

ReactDOM.render(
    <div className="scene-container">
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {positions.map(coords => <Box key={coords} position={coords} />)}
        </Canvas>
    </div>,
    document.getElementById('root')
);
