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
    console.log('beforeUpload');
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function getBase64(img, callback) {
    console.log('getBase64');
    const reader = new FileReader();
    console.log(img);
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = info => {
    console.log('handleChange')
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
      <ImgCrop rotate zoom>
        <Upload
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          previewFile={preview => console.log(preview)}
          customRequest={dummyRequest}
          css={css`
            .ant-upload {
              width: 400px;
              height: 400px;
              background: white;
            }
          `}
        >
          {imageUrl ? <img src={imageUrl} alt="pictureupload" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </ImgCrop>
    </div>
  );
}

export default PicUploader;