import React, { memo } from "react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(
  ({ size = "medium", message = "Loading..." }) => {
    return (
      <div className={styles.container}>
        <div className={`${styles.spinner} ${styles[size]}`}>
          <div className={styles.spinnerCircle}></div>
        </div>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
