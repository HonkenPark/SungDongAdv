import React, { useEffect, useRef, useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { ConfigProvider, Button, Modal, Input, Space } from 'antd';
import styled from 'styled-components';
import { decodeAes256 } from 'common/aes256Servie';
import { useLocation } from 'react-router-dom';

import search_icon from 'assets/images/search.svg'
import keyboard_icon from 'assets/images/toggle_keyboard.svg'
import vkeypad_icon from 'assets/images/toggle_vkeypad.svg'

import 'common/kjscrypto.contrib.min.js';
import 'common/kjscrypto.min.js';
import 'common/vKeypad.react.min.js';
import KingsKeypad from 'KingsKeypad';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    onClick={()=>console.log('Mic Input')}
    style={{
      fontSize: 20,
      color: '#1890ff',
    }}
  />
);

const fetchAddressList = (keyword) => {
  fetch('https://112.220.79.218:36400' + '/api/address-search', {
    method: "POST",
      cache: "no-cache",
      mode: "cors",
      headers: {
          "Content-Type": "application/json;charset=utf-8",
      },
      dataType: "json",
      body: JSON.stringify({ "keyword": keyword }),
  })
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(decodeAes256(data, 'bXotZ292LWtpb3NrLXNlY3JldC1rZXk='));
  })
  .catch((error) => {
    console.log(`Error Occured: ${error}`);
  })
}

const AddressModal = (props) => {
  const [modalOpen, setModalOpen] = useState(true);
  const location = useLocation();
  const vKeypad = useRef();
  const vKeypadForm = useRef();
  const [keypadMode, setKeypadMode] = useState(true);

  const onSearch = () => {
    console.log(vKeypad.current.value)
    fetchAddressList(vKeypad.current.value);
  }
  
  const clearInput = (e) => {
    e.target.value = "";
  }

  const toggelKeypad = (state) => {
    if (state === false) {
      window.vKeypadGlobal.unloadAll();
    }
    else {
      window.vKeypadGlobal.loadAll();
    }
    // setKeypadMode(state);
  }

  useEffect(()=>{
    window.vKeypadGlobal.setDefaultServletURL('/servlets/vKeypad.do');
    const doneCallback = () => {
      window.vKeypadGlobal.prepareSubmitAll();
      const form = new FormData(document.getElementById('vKeyPadForm'));
      console.log(form)
      fetch('https://112.220.79.218:36400' + '/api/e2eproc', {
        method: 'POST',
        cache: "no-cache",
        mode: "cors",
        body: form,
      })
      .then(res => res.text())
      .then(data => {
          console.log(decodeAes256(data, 'bXotZ292LWtpb3NrLXNlY3JldC1rZXk='));
          onSearch(decodeAes256(data, 'bXotZ292LWtpb3NrLXNlY3JldC1rZXk='));
      })
      .catch((error) => {
          console.log("Error Occured: " + error);
      });
    }

    const keyboardObj = window.vKeypadGlobal.newInstance(vKeypadForm.current,vKeypad.current,null,'KEYBOARD',20,null);
    keyboardObj.setOption('autoSubmit',false); // 입력완료 버튼 클릭시 submit
    window.vKeypadGlobal.setOptionAll('doneCallback', doneCallback);
    window.vKeypadGlobal.loadAll();
  }, [location])


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
      <BackGroundModalOff>
        <TitleModalOff>아래 <b>주소검색</b> 버튼을 눌러 주소를 입력해주세요.
        </TitleModalOff>
        <Button
          className="custom-address-search-button-size"
          type="primary"
          onClick={()=>{setModalOpen(true); setKeypadMode(true);}}
        >주소검색</Button>
      </BackGroundModalOff>
      <Modal
        title="주소검색"
        centered
        open={modalOpen}
        onCancel={(e)=>{
          // props.actionProvider.handleReason("1")('주소가 입력되었다')(e)
          console.log('종료')
          setModalOpen(false);
        }}
        // mask={false}
        colorPrimary={"#f0f0f0"}
        width={1000}
        cancelText="닫기"
        footer={null}
        style={{
          textAlign: 'center',
        }}
        bodyStyle={{
          height: 1200,
          backgroundColor: "#f0f0f0",
        }}
      >
        <DescriptionBody>
          <DescriptionContent>아래와 같은 조합으로 검색을 하시면 더욱 정확한 결과가 검색됩니다.</DescriptionContent>
          <DescriptionContent>• 도로명 + 건물번호
            <DescriptionContentColored>예) 성미산로29길 17-9, 세종대로 209</DescriptionContentColored>
          </DescriptionContent>
          <DescriptionContent>• 지역명(동/리) + 번지
            <DescriptionContentColored>예) 화정동 964, 시흥동 886</DescriptionContentColored>
          </DescriptionContent>
          <DescriptionContent>• 지역명(동/리) + 건물명(아파트명)
            <DescriptionContentColored>예) 인사동 종로빌딩, 정부서울</DescriptionContentColored>
          </DescriptionContent>
        </DescriptionBody>
        <SearchBoxBackground>
          <SearchboxTitle>주소검색은 도로명 또는 건물명으로 검색해주세요.<br /><p style={{fontSize: '22px'}}>화면터치가 아닌 키보드 사용을 원하시면 아래 키보드 아이콘을 눌러주세요.</p></SearchboxTitle>
          <SearchBoxForm  id='vKeyPadForm'
                          name='vKeyPadForm'
                          ref={vKeypadForm}
                          method="post"
          >
            <SearchBoxToggleButton>
              {keypadMode ?
                <ToggleKeyboardImage onClick={()=>{toggelKeypad(false)}} src={keyboard_icon} alt="일반 키보드 모드" /> :
                <ToggleVkeypadImage onClick={()=>{toggelKeypad(true)}}  src={vkeypad_icon} alt="터치 키패드 모드" />
              }
            </SearchBoxToggleButton>
            <SearchBoxInput placeholder='도로명주소를 입력해주세요.'
                            name={"vKeypadInput"}
                            ref={vKeypad}
                            type={"text"}
                            onFocus={clearInput} />
            <SearchBoxButton onClick={onSearch}>
              <SearchButtonImage src={search_icon} alt="검색하기" />
            </SearchBoxButton>
          </SearchBoxForm>
        </SearchBoxBackground>
      </Modal>
    </ConfigProvider>
  )
}

const BackGroundModalOff = styled.div`
  position: relative;
  left: 186px;
  /* top: 386px; */
  width: 642px;
  background: #F2F2F2;
  border-radius: 15px;
`;

const TitleModalOff = styled.h1`
  font-weight: normal;
  font-size: 42px;
  padding-left: 28px;
  padding-top: 20px;
  text-align: left;
`;

const DescriptionContent = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  margin-top: 18px;
  margin-left: 20px;
`;

const DescriptionContentColored = styled.p`
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  margin-left: 20px;
  margin-top: -5px;
  color: #3382E9;
`;

const DescriptionBody = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 30%;

  background: #E1E1E1;
  border: 4px solid #0F7CE2;
  border-radius: 15px;
`;

const SearchboxTitle = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  width: 877px;
  height: 68px;
  line-height: 14px;

  color: #3382E9;
`

const SearchBoxBackground = styled.div`
  position: absolute;
  width: 897px;
  height: 142px;
  left: 51px;
  top: 467px;
`;

const SearchBoxForm = styled.form`
  position: absolute;
  width: 893px;
  height: 69px;
  left: 4px;
  top: 68px;
`

const SearchBoxToggleButton = styled.button`
  box-sizing: border-box;

  position: absolute;
  width: 107px;
  height: 69px;
  left: -10px;
  top: 0px;
  background-color: #FFFFFF;

  border: 1px solid #545454;
  border-radius: 40px;
`

const ToggleKeyboardImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  left: calc(50% - 50px/2 + 0.5px);
  top: calc(50% - 50px/2 - 0.5px);
`

const ToggleVkeypadImage = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  left: calc(50% - 60px/2 + 0.5px);
  top: calc(50% - 60px/2 - 0.5px);
`

const SearchBoxInput = styled.input`
  box-sizing: border-box;

  position: absolute;
  left: 12.54%;
  right: 16.04%;
  top: 0%;
  bottom: 0%;

  border: 1px solid #545454;
  border-radius: 20px 0px 0px 20px;

  font-size: 24px;
`

const SearchBoxButton = styled.button`
  box-sizing: border-box;

  position: absolute;
  left: 83.96%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #3382E9;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-color: #545454;
  border-radius: 0px 20px 20px 0px;
`

const SearchButtonImage = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  left: calc(50% - 60px/2 - 0.37px);
  top: calc(50% - 60px/2 - 0.5px);
`

export default AddressModal;