import React, { memo } from "react";
import { useGetUserDetailsQuery } from "../../store/api/githubApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./UserDetails.module.scss";

interface UserDetailsProps {
  username: string;
  onBack: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = memo(({ username, onBack }) => {
  const { data: user, isLoading, error } = useGetUserDetailsQuery(username);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorMessage
          message="Failed to load user details. Please try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={onBack}
        aria-label="Go back to search results"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to search
      </button>

      <div className={styles.userCard}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              loading="lazy"
            />
          </div>
          <div className={styles.basicInfo}>
            <h1 className={styles.name}>{user.name || user.login}</h1>
            <p className={styles.login}>@{user.login}</p>
            {user.bio && <p className={styles.bio}>{user.bio}</p>}
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Repositories</span>
            <span className={styles.statValue}>{user.public_repos || 0}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Followers</span>
            <span className={styles.statValue}>{user.followers || 0}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Following</span>
            <span className={styles.statValue}>{user.following || 0}</span>
          </div>
        </div>

        {(user.location || user.company || user.blog) && (
          <div className={styles.additionalInfo}>
            {user.location && (
              <div className={styles.infoItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.company && (
              <div className={styles.infoItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 21h18M5 21V7l8-4v18M19 9h2v12M13 7v.01M17 9v.01M17 13v.01M17 17v.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{user.company}</span>
              </div>
            )}
            {user.blog && (
              <div className={styles.infoItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>
        )}

        <div className={styles.actions}>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
});

UserDetails.displayName = "UserDetails";

export default UserDetails;
