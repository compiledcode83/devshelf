import MoreIcon from '../../../public/icons/more.svg';
import styles from './card.module.scss';
import LikeIcon from '../../../public/icons/like.svg';
import FeedbackIcon from '../../../public/icons/comment.svg';

const Card = () => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>DevFeedback</h2>
        <button className={styles.moreInfo}>
          <MoreIcon />
        </button>
      </div>
      <p className={styles.description}>
        Fast Feedback uses Stripe to update, change, or cancel your subscription. You can also
        update card ...
      </p>
      <a href="" className={styles.link}>
        rate-my-app.netlify.io
      </a>
      <div className={styles.author}>
        <div className={styles.authorProfile}>
          <img src="/images/user.png" alt="" className={styles.authorImage} />
          <p className={styles.authorName}>Olaf Sulich</p>
        </div>
        <div className={styles.postReactions}>
          <button className={styles.postReactionsButton}>
            <LikeIcon aria-hidden="true" className={styles.postReactionsIcon} />
            <span className={styles.postReactionsCount}>59</span>
          </button>
          <button className={styles.postReactionsButton}>
            <FeedbackIcon aria-hidden="true" className={styles.postReactionsIcon} />
            <span className={styles.postReactionsCount}>7</span>
          </button>
        </div>
      </div>
    </article>
  );
};
export default Card;
