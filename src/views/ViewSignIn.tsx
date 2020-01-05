import React from 'react';
import 'firebase/auth';
import { useSpring, animated, config as animationConfig } from 'react-spring'
import { useHistory } from 'react-router-dom';
import { Flex, Box } from 'reflexbox';
import UIAnimatedBottomBg from 'components/UIAnimatedBottomBg/UIAnimatedBottomBg';
import UIAnimatedLogo from 'components/UIAnimatedLogo/UIAnimatedLogo';
import UIButton from 'components/UIButton';
import Theme from 'core/theme';

const ViewSignIn: React.FC = () => {
  const history = useHistory();
  const titleAnimation = useSpring({
    delay: 750,
    from: { opacity: 0, transform: 'translateY(30%)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })
  const buttonAnimation = useSpring({
    delay: 450,
    config: animationConfig.wobbly,
    from: { opacity: 0, transform: 'translateY(30%)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })

  return (

    <Box style={{background: Theme.colors.secondary}} height='100%'>
      <Flex style={{zIndex: 2, position: 'relative'}} height='100%' flexDirection='column' alignItems='stretch'>
        
        <animated.div style={{...titleAnimation, willChange: 'opacity, transform'}} >
          <Box height='2.75rem' className="g-title" mt={3} mb={2}>
            Lista de la compra
          </Box>
        </animated.div>

        <UIAnimatedLogo delay={650}/>

        <Box mt='auto' mb={7}>
          
          <animated.div style={{...buttonAnimation, willChange: 'opacity, transform'}}>
            <Flex flexDirection='row' justifyContent='center' mb={3}>
              <UIButton onClick={() => history.push('/main')} type={'google'}>
                Acceder con Google
              </UIButton>
            </Flex>
          </animated.div>

          <animated.div style={{...buttonAnimation, willChange: 'opacity, transform'}}>
            <Flex flexDirection='row' justifyContent='center'>
              <UIButton onClick={() => history.push('/main')} type={'facebook'}>
                Acceder con Facebook
              </UIButton>
            </Flex>
          </animated.div>
          
        </Box>
      </Flex>

      <UIAnimatedBottomBg delay={450} />

    </Box>
  );
};

export default ViewSignIn;