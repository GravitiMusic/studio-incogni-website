import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

// Wax Seal Component with click detection and eye motif
function WaxSeal({ onSealClick }) {
  const sealRef = useRef()
  const eyeRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (hovered && sealRef.current) {
      sealRef.current.scale.setScalar(1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.03)
    }
    // Subtle eye blink effect
    if (eyeRef.current && hovered) {
      const blink = Math.sin(state.clock.elapsedTime * 0.5) > 0.95 ? 0.1 : 1
      eyeRef.current.scale.y = blink
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    onSealClick()
  }

  return (
    <group position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Main seal disc */}
      <mesh
        ref={sealRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#8B0000" : "#5a0000"}
          roughness={0.3}
          metalness={0.3}
          emissive={hovered ? "#8B0000" : "#440000"}
          emissiveIntensity={hovered ? 0.8 : 0.3}
        />
      </mesh>
      
      {/* Eye motif - the watching presence */}
      <group position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Eye outer shape */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.18, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={hovered ? "#d4af37" : "#000000"}
            metalness={0.6}
            roughness={0.4}
            emissive={hovered ? "#d4af37" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </mesh>
        {/* Iris */}
        <mesh ref={eyeRef} position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={hovered ? "#d4af37" : "#1a0a0a"}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
        {/* Pupil */}
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial 
            color="#000000"
            emissive={hovered ? "#660000" : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>
      </group>
      
      {/* Decorative ring with gold accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.02, 16, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#d4af37" : "#330000"}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

// Envelope Component
function Envelope({ isAnimating, onAnimationComplete, onSealClick }) {
  const envelopeGroupRef = useRef()
  const [autoRotate, setAutoRotate] = useState(true)
  const animationStartTime = useRef(null)

  useFrame((state, delta) => {
    if (!envelopeGroupRef.current) return

    if (isAnimating) {
      // Fast spin animation
      if (!animationStartTime.current) {
        animationStartTime.current = state.clock.elapsedTime
      }
      
      const elapsed = state.clock.elapsedTime - animationStartTime.current
      
      // Spin faster and faster
      envelopeGroupRef.current.rotation.y += delta * 10 * (1 + elapsed * 2)
      envelopeGroupRef.current.rotation.x += delta * 5 * (1 + elapsed)
      
      // Move away and scale down
      envelopeGroupRef.current.position.z -= delta * 3 * (1 + elapsed)
      const scale = Math.max(0.1, 1 - elapsed * 0.5)
      envelopeGroupRef.current.scale.setScalar(scale)
      
      // After 2 seconds, complete animation
      if (elapsed > 2) {
        onAnimationComplete()
      }
    } else if (autoRotate) {
      // Slow rotation when not animating
      envelopeGroupRef.current.rotation.y += delta * 0.15
    }
  })

  const handlePointerDown = () => {
    setAutoRotate(false)
  }

  const handleSealClick = () => {
    setAutoRotate(false)
    animationStartTime.current = null
    onSealClick()
  }

  return (
    <group ref={envelopeGroupRef} onPointerDown={handlePointerDown}>
      {/* Envelope body - front */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[3, 2, 0.05]} />
        <meshStandardMaterial 
          color="#f5f5dc" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative envelope edges */}
      <mesh position={[0, 1, 0.03]}>
        <boxGeometry args={[3.05, 0.05, 0.06]} />
        <meshStandardMaterial color="#d4d4b8" />
      </mesh>
      
      <mesh position={[0, -1, 0.03]}>
        <boxGeometry args={[3.05, 0.05, 0.06]} />
        <meshStandardMaterial color="#d4d4b8" />
      </mesh>

      {/* Wax Seal on front center */}
      <group position={[0, 0, 0]}>
        <WaxSeal onSealClick={handleSealClick} />
      </group>
    </group>
  )
}

// Main Website Content
function MainWebsite() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="main-website">
      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => setActiveTab('home')}>
          <span className="logo-icon">👁️</span>
        </div>
        <div className="navbar-tabs">
          <button 
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={activeTab === 'download' ? 'active' : ''}
            onClick={() => setActiveTab('download')}
          >
            Download
          </button>
          <button 
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
      </nav>

      <header className="site-header">
        <h1 className="studio-name">Studio Incogni</h1>
        <p className="studio-tagline">Unseen worlds, unforgettable games</p>
      </header>

      <main className="main-content">
        {/* Home Page */}
        {activeTab === 'home' && (
          <>
            <section className="hero-section">
              <h2>What Lies Beneath</h2>
              <p>
                We craft games where nothing is quite as it seems. Surfaces deceive. 
                Rules bend. Reality shifts for those clever enough to look closer.
              </p>
              <p>
                Every world we build rewards curiosity and persistence with layers 
                of hidden depth—truths concealed in shadows, systems lurking beneath 
                the obvious, spaces that reveal themselves only to the observant.
              </p>
            </section>

            <section className="features">
              <div className="feature-card">
                <h3>👁️ Mystery & Discovery</h3>
                <p>Uncover hidden systems, lore, and meaning beneath surface simplicity</p>
              </div>
              <div className="feature-card">
                <h3>🎭 Perception & Subversion</h3>
                <p>Learn to bend and break rules that only appear fixed</p>
              </div>
              <div className="feature-card">
                <h3>🌑 Stylized Darkness</h3>
                <p>Experience the surreal, the gothic, the psychologically compelling</p>
              </div>
            </section>
          </>
        )}

        {/* Download Page */}
        {activeTab === 'download' && (
          <section className="download-section">
            <h2>Download the Game Here</h2>
            <p className="download-subtitle">Choose your platform</p>
            <div className="download-buttons">
              <button className="download-btn windows-btn">
                <span className="download-icon">🪟</span>
                <span className="download-text">Windows</span>
              </button>
              <button className="download-btn mac-btn">
                <span className="download-icon">🍎</span>
                <span className="download-text">Mac</span>
              </button>
            </div>
            <p className="download-note">Downloads coming soon...</p>
          </section>
        )}

        {/* About Page - Placeholder */}
        {activeTab === 'about' && (
          <section className="about-section">
            <h2>About Studio Incogni</h2>
            <p>More information coming soon...</p>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <p>&copy; 2025 Studio Incogni. Some secrets reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSealClick = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setShowEnvelope(false)
  }

  return (
    <div className="app-container">
      {showEnvelope ? (
        <>
          <div className="intro-overlay">
            <h1 className="studio-title">Studio Incogni</h1>
            <p className="studio-tagline-intro">Unseen worlds, unforgettable games</p>
            <p className="instruction-text">The eye watches. Click to enter.</p>
          </div>
          
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            shadows
          >
            {/* Atmospheric Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={0.8}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[0, 0, 3]} intensity={0.5} color="#8B0000" />
            <pointLight position={[-3, 2, -2]} intensity={0.3} color="#4B0082" />
            
            {/* Fog for mystery atmosphere */}
            <fog attach="fog" args={['#0a0a0a', 5, 15]} />
            
            {/* Envelope */}
            <Envelope 
              isAnimating={isAnimating} 
              onAnimationComplete={handleAnimationComplete}
              onSealClick={handleSealClick}
            />
            
            {/* Camera Controls */}
            <OrbitControls 
              enableDamping 
              dampingFactor={0.05}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </>
      ) : (
        <MainWebsite />
      )}
    </div>
  )
}

export default App
