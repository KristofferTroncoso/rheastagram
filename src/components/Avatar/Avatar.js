/** @jsx jsx */
import { Link } from 'react-router-dom';
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { jsx } from '@emotion/core';
import useSignedS3Url from '../../hooks/useSignedS3Url';

function Avatar({img, username, rainbow, ...rest}) {
  const imgKey = useSignedS3Url(img);
  
  return (
    <Link to={`/user/${username}`}>
      <div 
        css={[
          rainbow 
          ? {
              background: [
                '#f09433',
                '-moz-linear-gradient(45deg, #f0ab33 0%, #e68e3c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                '-webkit-linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                'linear-gradient(45deg, #f0ab33 0%,#e68e3c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'
              ],
              padding: '2px',
            }
          : {
              background: 'none',
              padding: 0
            }
          ,{
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
          }
        ]}
      >
        <AntAvatar 
          icon={<UserOutlined />}
          src={imgKey && imgKey} 
          css={rainbow ? {border: '2px solid white'} : {border: '1px solid lightgrey'}}
          {...rest}
        />
      </div>
    </Link>
  )
}


export default Avatar;
