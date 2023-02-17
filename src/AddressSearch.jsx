import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ConfigProvider, Divider, List, Button, Modal, Input, Space } from 'antd';
import { decodeAes256 } from 'common/aes256Servie';

import search_icon from 'assets/images/search.svg'
import keyboard_icon from 'assets/images/toggle_keyboard.svg'
import vkeypad_icon from 'assets/images/toggle_vkeypad.svg'

import 'common/kjscrypto.contrib.min.js';
import 'common/kjscrypto.min.js';
import 'common/vKeypad.react.min.js';
import 'common/vKeypad_NS.js';

const fitChatbotScrollBottom = () => {
  document.getElementsByClassName('react-chatbot-kit-chat-message-container')[0].scrollTop = document.getElementsByClassName('react-chatbot-kit-chat-message-container')[0].scrollHeight;
}

const addressResultArr = [];
const addressResultObj = {
  zipCode: "",
  roadAddr1: "",
  roadAddr2: "",
};

const parseAddressResult = (results) => {
  try {
    const addrList = JSON.parse(results);
    console.log(addrList)
    if (addrList.results.common.totalCount > 0) {
      addrList.results.juso.forEach((item, idx) => {
        addressResultObj.zipCode = item.zipNo;
        addressResultObj.roadAddr1 = item.roadAddrPart1;
        addressResultObj.roadAddr2 = item.roadAddrPart2;
        addressResultArr.push(addressResultObj)
      })
    }
    else {
      //TODO: Implement Message or Toast popup
      console.log('result is zero')
    }
  } catch {
    console.log(`Fail parse data: ${typeof results}`);
  }
}

const AddressSearch = (props) => {
  const vKeypad_NS = useRef();
  const vKeypadForm = useRef();
  const [keypadMode, setKeypadMode] = useState(true);
  const [modalState, setModalState] = useState({
    open: false,
    searchword: ""
  });

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
        parseAddressResult(decodeAes256(data, 'bXotZ292LWtpb3NrLXNlY3JldC1rZXk='));
        setModalState({ open: true, searchword: keyword});
      })
      .catch((error) => {
        console.log(`Error Occured: ${error}`);
      })
  }

  const onSearch = (e) => {
    if (vKeypad_NS.current.value.length > 0) {
      fetchAddressList(vKeypad_NS.current.value);
    }
    e && e.preventDefault();
  }
  
  const clearInput = (e) => {
    e.target.value = "";
  }

  const toggelKeypad = (e) => {
    setKeypadMode(!keypadMode);
    e.preventDefault();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
      e.preventDefault();
    }
  }

  useEffect(()=>{
    window.vKeypadGlobal.setDefaultServletURL('/servlets/vKeypad.do');
    const doneCallback = () => {
      onSearch();
    }

    const keyboardObj_NS = window.vKeypad_NS_Global.newInstance('qwerty', vKeypad_NS.current, 20);
    if (keypadMode) {
      keyboardObj_NS.load();
      keyboardObj_NS.setIsKr(true);
      keyboardObj_NS.setIsMobile(true);
      keyboardObj_NS.setDoneCallback(doneCallback);
      fitChatbotScrollBottom();
    }

    vKeypad_NS.current.focus();

    return(()=>{
      if (keypadMode) {
        keyboardObj_NS.unload();
      }
    });
  }, [keypadMode])

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
          <DescriptionContent>아래와 같이 검색해주세요.</DescriptionContent>
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
          <SearchboxTitle>주소검색은 도로명 또는 건물명으로 검색해주세요.<br /><p style={{fontSize: '20px'}}>화면터치가 아닌 키보드 사용을 원하시면 아래 키보드 아이콘을 눌러주세요.</p></SearchboxTitle>
          <SearchBoxForm  id='vKeyPadForm'
                          name='vKeyPadForm'
                          ref={vKeypadForm}
                          method="post"
          >
            <SearchBoxToggleButton onClick={toggelKeypad}>
              {keypadMode ?
                <ToggleKeyboardImage src={keyboard_icon} alt="일반 키보드 모드" /> :
                <ToggleVkeypadImage src={vkeypad_icon} alt="터치 키패드 모드" />
              }
            </SearchBoxToggleButton>
            <SearchBoxInput placeholder='도로명주소를 입력해주세요.'
                            name={"vKeypadInput"}
                            ref={vKeypad_NS}
                            type={"text"}
                            onFocus={clearInput}
                            onKeyDown={handleKeyDown}
            />
            <SearchBoxButton onClick={onSearch}>
              <SearchButtonImage src={search_icon} alt="검색하기" />
            </SearchBoxButton>
          </SearchBoxForm>
        </SearchBoxBackground>
        { keypadMode && <DummyComponentToResize /> }
      </BackGround>
      <Modal
        title={'“' + modalState.searchword + '” 에 대한 검색결과를 보여드릴게요.'}
        centered
        open={modalState.open}
        onCancel={(e)=>{
          console.log('종료')
          setModalState({ open: false, searchword: ""});
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
        {/* <List
          size="large"
          bordered
          dataSource={addressResultArr}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        /> */}
      </Modal>
    </ConfigProvider>
  )
}

const BackGround = styled.div`
  position: relative;
  left: 186px;
  /* top: 386px; */
  width: 742px;
  height: 596px;
  background: #F2F2F2;
  border-radius: 15px;
`;

const DescriptionContent = styled.div`
  font-weight: bold;
  font-size: 30px;
  text-align: left;
  margin-top: 5px;
  margin-left: 20px;
`;

const DescriptionContentColored = styled.p`
  font-weight: bold;
  font-size: 30px;
  text-align: left;
  margin-left: 20px;
  margin-top: 2px;
  color: #3382E9;
`;

const DescriptionBody = styled.div`
  box-sizing: border-box;

  position: relative;
  width: 100%;
  height: 30%;

`;

const SearchboxTitle = styled.div`
  font-size: 30px;
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
  left: 30px;
  top: 437px;
`;

const SearchBoxForm = styled.form`
  position: absolute;
  width: 690px;
  height: 69px;
  left: 4px;
  top: 75px;
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
  left: 16%;
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
  width: 35px;
  height: 35px;
  left: calc(50% - 35px/2 + 0.31px);
  top: calc(50% - 35px/2);
`

const DummyComponentToResize = styled.div`
  position: absolute;
  width: 740px;
  height: 360px;
  top: 600px;

  opacity: 0;
`

export default AddressSearch;
