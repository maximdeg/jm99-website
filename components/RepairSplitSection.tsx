"use client"

import React from 'react';
import styles from './RepairSplitSection.module.css';

interface RepairSplitSectionProps {
  leftImage: string;
  rightImage: string;
}

const RepairSplitSection: React.FC<RepairSplitSectionProps> = () => {
  return (
    <section className={styles.splitSection}>
      <div 
        className={styles.half + ' ' + styles.leftHalf}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/djdnlogf1/image/upload/v1750369142/Untitled_design_j7arbc.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className={styles.title + ' ' + styles.software}>Reparación</h2>
        <span className={styles.title + ' ' + styles.software}>de</span>
        <h2 className={styles.title + ' ' + styles.software}>Hardware</h2>
      </div>
      <div 
        className={styles.half + ' ' + styles.rightHalf}
        style={{
          backgroundImage: `url(https://res.cloudinary.com/djdnlogf1/image/upload/v1750369142/Untitled_design_1_mkrro7.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className={styles.title + ' ' + styles.hardware}>Reparación</h2>
        <span className={styles.title + ' ' + styles.hardware}>de</span>
        <h2 className={styles.title + ' ' + styles.hardware}>Software</h2>
      </div>
    </section>
  );
};

export default RepairSplitSection; 