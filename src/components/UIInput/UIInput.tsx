import React from 'react';
import styled from 'styled-components';

interface Props {
  fullWidth?: boolean;
  onChange?: any;
} 

const UIInput: React.FC<Props> = (props: Props) => {
  
  return (
    <InputField 
      placeholder={'Busca un producto'}
      width={'100%'}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default React.memo(UIInput, (prev, next) => true );

const InputField = styled<any>('input')`
  -webkit-appearance: none;
  font-size: 16px;
  color: #383151;
  padding: 15px 1.5rem;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(18, 50, 82, 0.12);
  outline: none;
  width: ${props => props.width};
  &::placeholder {
    color: #a4a2ad;
  }
`