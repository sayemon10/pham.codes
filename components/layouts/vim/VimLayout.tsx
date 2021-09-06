import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import VimFooter from '../../Footer/VimFooter';
import VimHeader from '../../Header/VimHeader';
import styles from './VimLayout.module.css';

interface Props {
  title?: string;
}

const VimLayout: React.FC<Props> = ({ title = 'John Pham', children }) => {
  const router = useRouter();

  const isBlogPage = router.pathname === '/blog/[slug]';

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <VimHeader />
        <main>{children}</main>
      </div>

      {!isBlogPage && <VimFooter />}
    </div>
  );
};

export default VimLayout;
