/** @jsx jsx */
import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { css, jsx } from '@emotion/core';

function PicUploader({changeImgFile}) {
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
    <ImgCrop rotate zoom>
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

          .ant-upload {
            margin: 10px auto;
            text-align: center;
            width: 100%;
            height: 300px;
            background: white;

            @media(max-width: 768px) {
              height: 220px;
            }
          }
        `}
      >
        {imageUrl ? <img src={imageUrl} alt="pictureupload" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
}

export default PicUploader;