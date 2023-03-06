import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ConfigProvider, Divider, List, Button, Modal, Input, Space } from 'antd';

const SignatureModal = (props) => {
  const [modalState, setModalState] = useState({
    open: false,
    imageData: ""
  });

  return(
    <ConfigProvider
      theme={{
        components: {
            Modal: {
            colorPrimary: '#3382E9',
            fontSize: 32,
            borderRadius: 10,
            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
            lineWidth: 5,
          },
        }
      }}
    >
      <BackGround>
        <DescriptionBody><br />
          <DescriptionContent>아래 버튼을 눌러 서명을 해주세요.</DescriptionContent>
          <DescriptionContent style={{
            "fontSize": "32px",
            "fontWeight": "bold",
            "textAlign": "center",
          }}>(이름을 정자로 적어주세요😊)</DescriptionContent>
          <br />
          <Button
            type="primary"
            block={false}
            style={{
              "height": "70px",
              "width": "300px",
              "fontSize": "32px"}}
            onClick={(e)=>{setModalState({open: true, imageData: ""})}}
          >서명하기</Button>
        </DescriptionBody>
      </BackGround>
      <Modal
        centered
        open={modalState.open}
        onCancel={(e)=>{
          console.log('종료')
          setModalState({ open: false, imageData: ""});
        }}
        // mask={false}
        colorPrimary={"#FFFFFF"}
        width={1000}
        cancelText="닫기"
        footer={null}
        style={{
          textAlign: 'left',
        }}
        bodyStyle={{
          // height: 1200,
          backgroundColor: "#F0F0F0",
        }}
      >
      </Modal>
    </ConfigProvider>
  )
}

const BackGround = styled.div`
  position: relative;
  left: 186px;
  /* top: 386px; */
  width: 742px;
  height: 240px;
  background: #F2F2F2;
  border-radius: 15px;
`;

const DescriptionContent = styled.div`
  font-weight: normal;
  font-size: 42px;
  text-align: left;
  margin-top: 5px;
  margin-left: 20px;
`;

const DescriptionBody = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 30%;

`;

export default SignatureModal;
