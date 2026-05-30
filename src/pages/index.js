import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import data from '@site/src/data/posts.json';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--outline button--lg" to="/overview">
            开始阅读 →
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main className={clsx('container', styles.home)}>
        <section className={styles.section}>
          <Heading as="h2">最近更新</Heading>
          <ul className={styles.postList}>
            {data.posts.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link to={p.slug}>{p.title}</Link>
                <span className={styles.meta}>{p.category} · {p.date}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.section}>
          <Heading as="h2">按方向浏览</Heading>
          <div className={styles.cats}>
            {data.categories.map((c) => (
              <Link key={c.slug} className={styles.cat} to={c.slug}>{c.label}</Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
