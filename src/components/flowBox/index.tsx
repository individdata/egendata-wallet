import React from 'react';
import styles from './index.module.css';

function FlowBox() {
  return (
    <div className={styles.box}>
      <div className={styles.lines}>
        <div className={styles.projectOak}>
          <div className={styles.project}>
            Project
            <div className={styles.oak}>OAK</div>
          </div>
        </div>
        <div className={styles.flow}>
          <div className={styles.showrow}>
            <div className={styles.img}>
              <div className={styles.number}>1</div>
            </div>
            <div className={styles.arrowflow}>
              <img className={styles.arrow} alt="arrow" />
            </div>
            <div className={styles.img}>
              <div className={styles.number}>2</div>
            </div>
          </div>
        </div>
        <div className={styles.texts}>
          <div className={styles.showrow}>
            <div className={styles.text}>
              Get your data
            </div>
            <div className={styles.text}>
              Share your data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowBox;
