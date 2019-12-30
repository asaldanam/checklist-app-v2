import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface Props {
  locationKey: string | undefined;
  path: string;
  action: string;
  children?: any;
} 

const UIRouterAnimations: React.FC<Props> = (props: Props) => {

  const animationDuration = 650;

  const animationStyles = {
    animationDuration: animationDuration + 'ms',
    animationTimingFunction: 'cubic-bezier(.5, 0, 0, 1)'
  }

  const animationConfig: any = {
    '/main': {
      'PUSH': 'open',
      'POP': 'prev' 
    },
    '/': {
      'PUSH': 'next',
      'POP': 'close' 
    },
    'default': {
      'PUSH': 'next',
      'POP': 'prev' 
    }
  }

  const animationType: string = (animationConfig[props.path] || animationConfig['default'])[props.action]

  return (
    <TransitionGroup className={`g-app g-app--${animationType}`}>
      <CSSTransition key={props.locationKey} timeout={{ enter: animationDuration, exit: animationDuration }} className="g-view" classNames={'g-view-'} style={animationStyles}>
        <div className="g-view">
          {props.children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default UIRouterAnimations;