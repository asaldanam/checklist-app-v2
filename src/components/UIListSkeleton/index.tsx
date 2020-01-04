import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: any;
}

const UIListSkeleton: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <svg width="244px" height="400px" viewBox="0 0 244 400" version="1.1">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Stacked-Group" fill="#E8ECEF">
            <rect id="Rectangle" x="0" y="0" width="244" height="16"></rect>
            <rect id="Rectangle-Copy" x="0" y="48" width="193" height="16"></rect>
            <rect id="Rectangle-Copy-2" x="0" y="96" width="237" height="16"></rect>
            <rect id="Rectangle-Copy-7" x="0" y="336" width="228" height="16"></rect>
            <rect id="Rectangle-Copy-10" x="0" y="384" width="164" height="16"></rect>
            <rect id="Rectangle-Copy-9" x="0" y="288" width="228" height="16"></rect>
            <rect id="Rectangle-Copy-8" x="0" y="240" width="193" height="16"></rect>
            <rect id="Rectangle-Copy-5" x="0" y="192" width="241" height="16"></rect>
            <rect id="Rectangle-Copy-4" x="0" y="144" width="207" height="16"></rect>
          </g>
        </g>
      </svg>
    </React.Fragment>
  );
};

export default UIListSkeleton;