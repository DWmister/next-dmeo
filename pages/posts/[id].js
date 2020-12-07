import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';

import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.scss';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.id}</title>
      </Head>

      <article className={utilStyles.padding20}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. to avoid XSS */}
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

/**
 * Dynamic Routes
 * return a list of possible values for id.
 */
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    // if path not returned by getStaticPaths will result in a 404page
    fallback: false
  };
}

// fetch necessary data for the blog post with a given id.
// params contains id(because the file name is [id].js)
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}
