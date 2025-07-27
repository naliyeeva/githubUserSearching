import React, { memo } from "react";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = memo(
  ({ message, onRetry, retryLabel = "Try again" }) => {
    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="15"
              y1="9"
              x2="9"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="9"
              y1="9"
              x2="15"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h3 className={styles.title}>Something went wrong</h3>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M1 4v6h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {retryLabel}
          </button>
        )}
      </div>
    );
  }
);

ErrorMessage.displayName = "ErrorMessage";

export default ErrorMessage;
