import React, { useState } from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import UIButton from 'components/UIButton';
import { useTransition, animated } from 'react-spring';

interface Props {
  children?: any;
  deleteTxt?: string;
  confirmTxt?: string;
  cancelTxt?: string;
  confirm?: boolean;
  onDelete?: () => void; 
}

const UIDeleteBar: React.FC<Props> = ({deleteTxt, onDelete, confirm}: Props) => {

  const [showConfirmation, askConfirm] = useState(false);

  const transitions = useTransition(showConfirmation, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <React.Fragment>
      <Flex flexDirection={'column'} alignItems={'center'} mt={2} mb={4}>

        {transitions.map(({ item, key, props }) => item
          ? 
          <animated.div style={props} key={key}>
            <Flex alignItems={'center'} flexDirection={'column'} >
              <ConfirmMsg>¿Borrar estos elementos?</ConfirmMsg>
              <ButtonBox onClick={() => askConfirm(false)}>
                <UIButton type={'link'} onClick={() => askConfirm(false)}>
                  Cancelar
                </UIButton>
                <UIButton onClick={onDelete} type={'link'}>
                  Aceptar
                </UIButton>
              </ButtonBox>
            </Flex>
          </animated.div>
          :
          <animated.div style={props} key={key}>
            <Flex style={props} mt={2}>
              <UIButton type={'link'} onClick={confirm ? () => askConfirm(true) : onDelete}>
                {deleteTxt}
              </UIButton>
            </Flex>         
          </animated.div>
        )}
      </Flex>
    </React.Fragment>
  );
};


const ConfirmMsg = styled.p`
  margin: 0 0 1rem 0;
  font-weight: 800;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`

export default UIDeleteBar;