import { useState, useCallback, useMemo, useEffect } from "react";
import { GitHubUser } from "./types/github";
import { useLazySearchUsersQuery } from "./store/api/githubApi";
import { useDebounce } from "./hooks/useDebounce";
import SearchInput from "./components/SearchInput/SearchInput";
import UserList from "./components/UserList/UserList";
import UserDetails from "./components/UserDetails/UserDetails";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import styles from "./App.module.scss";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [triggerSearch, { data, isLoading, error, isFetching }] =
    useLazySearchUsersQuery();

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      triggerSearch(debouncedSearchTerm.trim());
    }
  }, [debouncedSearchTerm, triggerSearch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setSelectedUser(null);
  }, []);

  const handleUserClick = useCallback((user: GitHubUser) => {
    setSelectedUser(user);
  }, []);

  const handleBackToSearch = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const shouldShowResults = useMemo(() => {
    return debouncedSearchTerm.trim() && !selectedUser;
  }, [debouncedSearchTerm, selectedUser]);

  const shouldShowLoading = useMemo(() => {
    return shouldShowResults && (isLoading || isFetching);
  }, [shouldShowResults, isLoading, isFetching]);

  const shouldShowError = useMemo(() => {
    return shouldShowResults && error && !isLoading && !isFetching;
  }, [shouldShowResults, error, isLoading, isFetching]);

  const shouldShowUserList = useMemo(() => {
    return shouldShowResults && data && !isLoading && !isFetching && !error;
  }, [shouldShowResults, data, isLoading, isFetching, error]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.logo}
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            GitHub User Search
          </h1>
          <p className={styles.subtitle}>
            Search for GitHub users and view their profiles
          </p>
        </header>

        <main className={styles.main}>
          {!selectedUser && (
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              disabled={isLoading || isFetching}
            />
          )}

          {selectedUser && (
            <UserDetails
              username={selectedUser.login}
              onBack={handleBackToSearch}
            />
          )}

          {shouldShowLoading && <LoadingSpinner message="Searching users..." />}

          {shouldShowError && (
            <ErrorMessage
              message="Failed to search users"
              onRetry={() => {
                if (debouncedSearchTerm.trim()) {
                  triggerSearch(debouncedSearchTerm.trim());
                }
              }}
            />
          )}

          {shouldShowUserList && (
            <UserList
              users={data?.items || []}
              onUserClick={handleUserClick}
              totalCount={data?.total_count}
            />
          )}

          {!shouldShowResults && !selectedUser && searchTerm.trim() === "" && (
            <div className={styles.welcomeMessage}>
              <div className={styles.welcomeIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
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
              <h2 className={styles.welcomeTitle}>
                Welcome to GitHub User Search
              </h2>
              <p className={styles.welcomeDescription}>
                Start typing a GitHub username to search for users and view
                their profiles.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
