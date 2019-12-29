import React from 'react';
import styles from './UIHeader.module.scss';
import { Box } from 'reflexbox';
import { useSpring, animated } from 'react-spring'
interface Props {
  childDefault?: any;
  childEnd?: any;
} 

const UIHeader: React.FC<Props> = (props: Props) => {

  const headerAnimation = useSpring({
    delay: 300,
    from: { opacity: 0, transform: 'translateY(-100%)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })

  const contentEndAnimation = useSpring({
    delay: 650,
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  return (
    <animated.div style={headerAnimation}>
      <Box className={styles.wrapper} pt={3} pb={2}>
        {props.childDefault}
      </Box>
      { props.childEnd && 
        <div className={styles.convexEndContainer}>
          <div className={styles.convexEndContent}>
            <animated.div style={contentEndAnimation}>
              {props.childEnd}
            </animated.div>
          </div>
          <div className={styles.convexEnd}>
          </div>
        </div>
      }
    </animated.div>

  );
};

export default UIHeader;