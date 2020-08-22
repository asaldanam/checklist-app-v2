import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getIconClassName } from '@uifabric/styling';
import SpinnerLoading from 'assets/images/spinner';
import Theme from 'core/theme';

const UIInput: React.FC<any> = ({value, loading, onChangeValue}) => {
  
  return (
    <FormField>
      
      <InputField 
        placeholder={'Busca un producto...'}
        width={'100%'}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />

      {value && !loading && 
        <AppendClose onClick={() => onChangeValue('')}>
          <i className={getIconClassName('ChromeClose')}/>
        </AppendClose>
      }

      { loading && 
        <AppendSpinner>
          <SpinnerLoading />
        </AppendSpinner>
      }

    </FormField>
  );
};

export default React.memo(UIInput);

const FormField = styled.div`
  position: relative;
`

const InputField = styled<any>('input')`
  -webkit-appearance: none;
  font-size: 16px;
  color: ${Theme.colors.black};
  padding: 15px 1.5rem;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 10px 0 rgba(18, 50, 82, 0.12);
  outline: none;
  width: ${props => props.width};
  font-family: ${Theme.fonts.main};
  letter-spacing: -0.25px;
  &::placeholder { color: ${Theme.colors.greyDark}; }
`

const Append = styled<any>('button')`
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  position: absolute;
  height: 24px;
  width: 24px;
  font-size: 12px;
  background: transparent;  
  top: calc(50% - 12px);
  right: 14px;
  color: ${Theme.colors.greyDark};
`

const AppendClose = styled<any>(Append)`
  padding-top: 3px;
  color: ${Theme.colors.primary}
`
const spinnerAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const AppendSpinner = styled<any>(Append)`
  width: 24px;
  height: 24px;
  animation: ${spinnerAnimation} .5s linear infinite;
`