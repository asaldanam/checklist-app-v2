import React from 'react';
import styles from './UIExample.module.scss';

interface Props {
  
} 

const UIExample: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.UIExample}>
      We are styled!
    </div>
  );
};

export default UIExample;