import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import Date from '../components/date'

import styles from './index.module.scss'
import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Home Page</title>
      </Head>

      <section>
        <h1 className={styles.title}>
          Hello <a href="https://www.nextjs.cn/">Next.js</a>
        </h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              {id}
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

/**
 * getStaticProps Feature:
 * 1. Inside the function, you can fetch external data and send it as props to the page
 * 2. runs only on the server-side
 * 3. before pre-render this page, resolve it
 * 4. Only Allowed in a Page
 * 5. In Development runs on every request; In Prod runs at build time
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
