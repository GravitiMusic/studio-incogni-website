// Import team member images
import charlieImg from '../../note-assets/charlie/Untitled.png'
import ajaImg from '../../note-assets/aja/AjaIcon.png'
import zachImg from '../../note-assets/zach/IMG_4141.png'
import jessicaImg from '../../note-assets/jessica/Untitled3_20251119135415.png'
import jaiImg from '../../note-assets/jai/Screenshot_20251119_112741_Joplin.jpg'
import aresImg from '../../note-assets/ares/Portral.png'
import adrianaImg from '../../note-assets/adriana/pandaBack.png'
import nikitaImg from '../../note-assets/nikita/IMG_9396.png'

// Team Member Card Component - Sticky Note Style
export function TeamMemberCard({ name, role, description, image, site }) {
  return (
    <div className="sticky-note">
      <div className="sticky-note-image-container">
        <img src={image} alt={name} className="sticky-note-image" />
      </div>
      <h3 className="sticky-note-name">{name}</h3>
      <p className="sticky-note-role">{role}</p>
      <p className="sticky-note-description">{description}</p>
      {site && (
        <a href={site} target="_blank" rel="noopener noreferrer" className="sticky-note-link">
          View Profile →
        </a>
      )}
    </div>
  )
}

// Team member data from note-assets
export const teamMembers = [
  {
    name: "Charlie Meyer",
    role: "Web Developer & Music Composer/Producer",
    description: "A developer with a lot of hobbies!",
    image: charlieImg,
    site: "https://www.linkedin.com/in/charlie-meyer-a06a0117a/"
  },
  {
    name: "Aja España",
    role: "Technical Director",
    description: "I'm a game developer and tools programmer who can't stop working in Unity for some reason :p",
    image: ajaImg,
    site: "https://www.linkedin.com/in/aja-espana/"
  },
  {
    name: "Zach Spindel",
    role: "Mechanics Director",
    description: "I'm a mechanics designer and game dev specializing in UX and game feel",
    image: zachImg,
    site: "https://www.linkedin.com/in/zachary-spindel-192307231"
  },
  {
    name: "Jessica Lok",
    role: "2D Artist",
    description: "2D artist focusing on character design and concept art creation",
    image: jessicaImg,
    site: "https://jessicalok.artstation.com/"
  },
  {
    name: "Jai Vase",
    role: "Game Designer",
    description: "I'm a game designer who focuses on programming and narrative",
    image: jaiImg,
    site: "https://www.linkedin.com/in/jai-vase-603347240?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
  },
  {
    name: "Ares Wong",
    role: "3D Artist",
    description: "I'm a 3D artist, focusing on the props.",
    image: aresImg,
    site: "https://www.linkedin.com/in/yat-long-ares-wong-9841b6262/"
  },
  {
    name: "Adriana Vasquez",
    role: "Programmer",
    description: "I'm a programmer with a focus on game UI",
    image: adrianaImg,
    site: "https://www.linkedin.com/in/adriana--vasquez"
  },
  {
    name: "Nikita Puranik",
    role: "Art Director",
    description: "An artist that has a penchant for detail",
    image: nikitaImg,
    site: "https://www.artstation.com/nik1w1"
  }
]
