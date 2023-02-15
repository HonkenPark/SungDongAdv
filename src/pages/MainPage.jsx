import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, Space } from 'antd';
import { supportedFormatArr } from 'common/config_doc';

const MainPage = () => {
  console.log('MainPage')
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (supportedFormatArr[e].format !== 'FM_0000200') {
      alert(`선택하신 ${supportedFormatArr[e].label} 서식은 현재 지원하지 않습니다.`);
    }
    else {
      navigate(`/${supportedFormatArr[e].format}`);
    }
  };

  return (
    <Space wrap>
      <Select
        defaultValue="서식을 선택해주세요."
        style={{
            width: 920 
          }}
        onChange={handleChange}
        options={supportedFormatArr}
      />
    </Space>
  )
}

export default MainPage;