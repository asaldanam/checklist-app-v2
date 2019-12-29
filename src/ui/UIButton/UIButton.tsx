import React from 'react';
import styles from './UIButton.module.scss';
// import Ripples from 'react-ripples'
import googleLogo from 'assets/images/logo-google.svg'
import facebookLogo from 'assets/images/logo-facebook.svg'
import { Flex, Box } from 'reflexbox';

interface Props {
  children?: any;
  onClick: any;
  type?: 'primary' | 'google' | 'facebook' | undefined
}

const socialStyles = {
  'google': {
    css: styles.buttonGoogle,
    logo: googleLogo
  },
  'facebook': {
    css: styles.buttonFacebook,
    logo: facebookLogo
  }
}

const UIButton: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {(props.type === 'google' || props.type === 'facebook') &&
        <button onClick={() => props.onClick()} className={socialStyles[props.type].css}>
          <Flex alignItems='center'>
            <Box height='24px' mr={2}>
              <img 
                className={styles.socialLogo} 
                src={socialStyles[props.type].logo} 
                alt="social logo"/
              >
            </Box>
            <Box>
              {props.children}
            </Box>
          </Flex>
        </button>
      }
      {(props.type === undefined || props.type === 'primary') &&
        <button onClick={() => props.onClick()} className={styles.buttonPrimary}>
          {props.children}
        </button>
      }
    </React.Fragment>
  );
};

export default UIButton;