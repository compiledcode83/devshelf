import styles from './popularResources.module.scss';
import PopularUsers from './popularUsers/PopularUsers';
import PopularProjects from './popularProjects/PopularProjects';

const PopularResources = () => {
  return (
    <div className={styles.container}>
      <PopularUsers />
      <PopularProjects />
    </div>
  );
};

export default PopularResources;
