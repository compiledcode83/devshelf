import Link from 'next/link';
import styles from './popularProjects.module.scss';
import CubeIcon from '../../../../public/icons/cube.svg';

const PopularProjects = () => {
  return (
    <aside className={styles.wrapper}>
      <section className={styles.resource}>
        <h2 id="technology-filters" className={styles.heading}>
          Technologie
        </h2>
        <ul aria-labelledby="technology-filters" className={styles.list}>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <div className={styles.info}>
                  <CubeIcon className={styles.icon} />
                  <p className={styles.projectName}>DevFeedback</p>
                </div>
                <span className={styles.likes}>122</span>
              </a>
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <div className={styles.info}>
                  <CubeIcon className={styles.icon} />
                  <p className={styles.projectName}>DevFeedback</p>
                </div>
                <span className={styles.likes}>45</span>
              </a>
            </Link>{' '}
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <div className={styles.info}>
                  <CubeIcon className={styles.icon} />
                  <p className={styles.projectName}>DevFeedback</p>
                </div>
                <span className={styles.likes}>22</span>
              </a>
            </Link>{' '}
          </li>
          <li className={styles.listItem}>
            <Link href="#">
              <a className={styles.link}>
                <div className={styles.info}>
                  <CubeIcon className={styles.icon} />
                  <p className={styles.projectName}>DevFeedback</p>
                </div>
                <span className={styles.likes}>8</span>
              </a>
            </Link>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default PopularProjects;
