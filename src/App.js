import './App.css';
import React, { useState } from 'react';
import { Select, Space } from 'antd';

import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import FM_0000200 from './FM_0000200';

function App() {
  const [state, setState] = useState();
  // const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value !== 'FM_0000200') {
      alert(`선택하신 ${e.target.label.label} 서식은 현재 지원하지 않습니다.`);
    }
    else {
      setState("")
      // navigate(`/${e.target.value}`);
    }
  };

  return (
    // <BrowserRouter>
    //   <Space wrap>
    //     <Select
    //       defaultValue="주민등록증 재발급 신청"
    //       style={{ width: 920 }}
    //       onChange={handleChange}
    //       options={[
    //         { value: 'FM_0000200', label: '주민등록증 재발급 신청' },
    //         { value: 'FM_0000100', label: '주민등록 전입신고' },
    //         { value: 'FM_0001500', label: '외국인 체류지변경신고' },
    //         { value: 'FM_0000500', label: '출생신고', disabled: true },
    //       ]}
    //     />
    //   </Space>
    //   <Routes>
    //     <Route path='/FM_0000200' element={<FM_0000200 />} />
    //   </Routes>
    // </BrowserRouter>
    <FM_0000200 />
  );
}

export default App;