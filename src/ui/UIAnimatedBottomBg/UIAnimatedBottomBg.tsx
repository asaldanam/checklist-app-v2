import React from 'react';
import styles from './UIAnimatedBottomBg.module.scss';
import { useSpring, animated, config } from 'react-spring'

interface Props {
  delay?: number;
} 

const bgMaxScale = window.innerWidth > 425 
  ? '5.1' 
  : (window.innerHeight / 100) * 0.65

const UIAnimatedBottomBg: React.FC<Props> = (props: Props) => {

  const animation = useSpring({
    config: config.wobbly,
    delay: props.delay,
    from: { opacity: 0, transform: 'translateY(50%) scale(1)' },
    to: { opacity: 1, transform: `translateY(50%) scale(${bgMaxScale})` }
  })

  return (
    <animated.div className={styles.area} style={animation}></animated.div>
  )
};

export default UIAnimatedBottomBg;