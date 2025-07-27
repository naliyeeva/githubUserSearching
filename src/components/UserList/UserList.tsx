import React, { memo } from "react";
import { GitHubUser } from "../../types/github";
import UserCard from "../UserCard/UserCard";
import styles from "./UserList.module.scss";

interface UserListProps {
  users: GitHubUser[];
  onUserClick: (user: GitHubUser) => void;
  totalCount?: number;
}

const UserList: React.FC<UserListProps> = memo(
  ({ users, onUserClick, totalCount }) => {
    if (users.length === 0) {
      return (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="8.5"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 8v6M23 11h-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>No users found</h3>
          <p className={styles.emptyDescription}>
            Try searching with a different username or keyword.
          </p>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        {totalCount && totalCount > 0 && (
          <div className={styles.resultsCount}>
            Found {totalCount.toLocaleString()} user
            {totalCount !== 1 ? "s" : ""}
            {users.length < totalCount && ` (showing first ${users.length})`}
          </div>
        )}
        <div className={styles.userList}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={onUserClick} />
          ))}
        </div>
      </div>
    );
  }
);

UserList.displayName = "UserList";

export default UserList;
