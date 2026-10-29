import { hydrateRoot } from 'react-dom/client';
import Hero from './ui/Hero.jsx';
import { initMotion } from './motion.js';
import './ui/interactions.css';
import './ui/Chrome.css';
import './ui/Catalogue.css';
import './ui/Contact.css';
import './ui/Equipment.css';
import './ui/Process.css';
import { initEquipmentCarousels } from './carousel.js';

const mount = document.getElementById('hero-react');
// O restante do site continua HTML nativo. Só a abertura ganha uma ilha React.
if (mount) hydrateRoot(mount, <Hero />);
initMotion();
initEquipmentCarousels();
