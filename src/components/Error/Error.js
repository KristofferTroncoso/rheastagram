import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'antd';

function Error({props, children}) {
  return (
    <div {...props}>
      <Alert
        message="Error"
        description={children}
        type="error"
        showIcon
      />
      <Link to={"/"}>
        <Button type="primary">Go home</Button>
      </Link>
    </div>
  )
}

export default Error;