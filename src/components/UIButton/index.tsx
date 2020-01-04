import React from 'react';
import styled from 'styled-components';
import googleLogo from 'assets/images/logo-google.svg'
import facebookLogo from 'assets/images/logo-facebook.svg'

interface Props {
  children?: any;
  onClick: any;
  type?: 'primary' | 'google' | 'facebook' | undefined
}

const UIButton: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {(props.type === 'primary' || props.type === undefined) &&
        <ButtonPrimary onClick={() => props.onClick()}>
          <span>{props.children}</span>
        </ButtonPrimary>
      }
      {props.type === 'google' &&
        <ButtonGoogle onClick={() => props.onClick()}>
          <SocialLogo src={googleLogo} alt="google" />
          <span>{props.children}</span>
        </ButtonGoogle>
      }
      {props.type === 'facebook' &&
        <ButtonFacebook onClick={() => props.onClick()}>
          <SocialLogo src={facebookLogo} alt="google" />
          <span>{props.children}</span>
        </ButtonFacebook>
      }
    </React.Fragment>
  );
};

export default UIButton;

const Button = styled.button`
  margin: 0;
  border: none;
  outline: none;
  height: 48px;
  padding: 0 1.5rem;
  min-width: 220px;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 10px 20px 0px #4C407C22;
`

const ButtonPrimary = styled(Button)`
  font-weight: bolder;
  font-size: 14px;
  background-color: #62B379;
  text-transform: uppercase;
  color: white;
`

const ButtonGoogle = styled(Button)`
  font-size: 16px;
  background-color: white;
  color: #6a6e74;
  min-width: 260px;
  justify-content: start;
`

const ButtonFacebook = styled(Button)`
  font-size: 16px;
  background-color: #3b5998;
  color: white;
  min-width: 260px;
  justify-content: start;
`

const SocialLogo = styled.img`
  height: 100%;
  width: auto;
  display: block;
  height: 1.5rem;
  margin-right: 1rem;
`