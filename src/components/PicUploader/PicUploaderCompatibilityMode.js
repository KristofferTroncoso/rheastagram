/** @jsx jsx */
import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { css, jsx } from '@emotion/core';

function PicUploaderCompatibilityMode({changeImgFile}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
    getBase64(info.file.originFileObj, imageUrl => {
      changeImgFile(info.file.originFileObj);
      setImageUrl(imageUrl);
      setIsLoading(false);
    });
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };


  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  
  return (
    <div>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={dummyRequest}
        css={css`
          text-align: center;
          margin: 0 auto;
          width: 100%;

          .ant-upload-select {
            margin: 10px auto;
            text-align: center;
            width: 100%;
            height: 300px;
            background: white;
            border: 4px dashed dodgerblue;
            
            @media(max-width: 768px) {
              height: 220px;
            }
          }
        `}
      >
        {imageUrl ? <img src={imageUrl} alt="pictureupload" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
}

export default PicUploaderCompatibilityMode;