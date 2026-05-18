import { ProfileCanvas } from './ProfileCanvas';
import styles from './styles.module.css';

const links = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/cbdaniela/',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/danielacb',
  },
  {
    title: 'Dribbble',
    url: 'https://dribbble.com/danielacb',
  },
];

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.overlay} />
      <div id="intro" className={styles.box}>
        <h4>Hello! 👋</h4>
        <p>
          I'm a Frontend Engineer from Brazil with 8+ years of experience
          building digital products, combining design expertise with modern
          frontend engineering.
        </p>
        <p>
          Coming from a design and UI/UX background, I transitioned into
          frontend engineering, where I’ve been focused full-time on building
          applications with React, TypeScript, and Next.js.
        </p>
        <p>
          This portfolio is a work in progress (aren’t they always?), but you
          can check out my old portfolio <a href="/2017">here</a>.
        </p>
      </div>
      <nav id="header-nav" className={styles.nav}>
        <ul>
          {links.map((link) => (
            <li key={link.title}>
              <a
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
                href={link.url}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div id="header-text" className={styles.text}>
        <h1 className={styles.title}>Daniela Barbosa</h1>
        <h2 className={styles.subtitle}>
          Frontend Engineer & Creative Developer
        </h2>
      </div>
      <ProfileCanvas />
    </header>
  );
};
