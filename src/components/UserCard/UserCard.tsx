import React, { memo } from "react";
import { GitHubUser } from "../../types/github";
import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: GitHubUser;
  onClick: (user: GitHubUser) => void;
}

const UserCard: React.FC<UserCardProps> = memo(({ user, onClick }) => {
  const handleClick = () => {
    onClick(user);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(user);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${user.login}`}
    >
      <div className={styles.avatar}>
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          loading="lazy"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.login}>{user.login}</h3>
        <span className={styles.id}>ID: {user.id}</span>
      </div>
      <div className={styles.arrow}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
});

UserCard.displayName = "UserCard";

export default UserCard;
