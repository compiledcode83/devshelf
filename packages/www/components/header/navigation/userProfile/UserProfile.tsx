import Image from 'next/image';
import styles from './userProfile.module.scss';

const UserProfile = () => (
  <div className={styles.wrapper}>
    <Image unsized src="/images/user.png" className={styles.image} alt="" />
    <p className={styles.text}>
      <span className="visually-hidden">Profil użytkownika </span>
      Olaf Sulich
    </p>
  </div>
);

export default UserProfile;
