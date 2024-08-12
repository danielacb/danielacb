import styles from './styles.module.scss'

const topLinks = [
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
]

export default function Nav() {
  return (
    <>
      <ul className={styles.top}>
        {topLinks.map((link) => (
          <li key={link.title}>
            <a className={styles.link} target="_blank" href={link.url}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <ul className={styles.bottom}>
        <li>
          <a className={styles.link} href="mailto:hello@danielacb.com">
            Contact: hello@danielacb.com
          </a>
        </li>
      </ul>
    </>
  )
}
