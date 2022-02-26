import React from 'react';
import styles from './MainComponent.module.css';
import LoginButton from './LoginButton';
import TagsComponent from './TagsComponent/TagsComponent';

function MainComponent() {
  return (
    <div className={styles.main}>
      <div className={styles.title} style={{ display: 'flex' }}>
        <img className={styles.logo} alt="logo" />
        Project
        <div className={styles.oak}>OAK</div>
      </div>
      <TagsComponent />
      <LoginButton />
    </div>
  );
}

export default MainComponent;
