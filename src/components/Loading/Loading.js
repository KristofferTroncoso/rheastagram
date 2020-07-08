import React from 'react';
import { Spin } from 'antd';

function Loading({props, children}) {
  return (
    <Spin {...props} tip={children}>
      {children}
    </Spin>
  )
}

export default Loading;