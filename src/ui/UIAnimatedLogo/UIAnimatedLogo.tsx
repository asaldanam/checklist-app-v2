import React from 'react';
// import styles from './UIAnimatedLogo.module.scss';
import { useSpring, animated, config } from 'react-spring'
import logo from 'assets/images/shopping-basket.svg';
import { Flex } from 'reflexbox';

interface Props {
  delay?: number
} 

const UIAnimatedLogo: React.FC<Props> = (props: Props) => {

  const animation = useSpring({
    config: config.gentle,
    delay: props.delay,
    from: {
      opacity: 0,
      transform: 'translateY(30%)'
    },
    to: { 
      opacity: 1,
      transform: `translateY(0%)`
    }
  })

  return (
    <Flex flexDirection='row' justifyContent='center'>
      <animated.img src={logo} style={animation}></animated.img>
    </Flex>
  )
};

export default UIAnimatedLogo;