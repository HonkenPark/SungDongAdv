import React, { useEffect, useRef, useState } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { ConfigProvider, Button, Modal, Input, Space } from 'antd';
import styled from 'styled-components';
import { decodeAes256 } from 'common/aes256Servie';
import { useLocation } from 'react-router-dom';

import 'common/kjscrypto.contrib.min.js';
import 'common/kjscrypto.min.js';
import 'common/vKeypad.react.min.js';
import 'common/vKeypad_NS.js';

const KingsKeypad = () => {
  const location = useLocation();
  const vKeypad = useRef();
  const vKeypadForm = useRef();
  const vKeypad_NS = useRef();
  const vKeypadForm_NS = useRef();


  useEffect(()=>{
    window.vKeypadGlobal.setDefaultServletURL('/servlets/vKeypad.do');
    const doneCallback = () => {
      window.vKeypadGlobal.prepareSubmitAll();
      console.log('1');
      const form = new FormData(document.getElementById('vKeyPadForm'));
      console.log(form)
      fetch('https://112.220.79.218:36400' + '/api/e2eproc', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: form,
      })
        .then(res => res.text())
        .then(data => {
          console.log(decodeAes256(data, 'bXotZ292LWtpb3NrLXNlY3JldC1rZXk='));
        })
        .catch((error) => {
          console.log(`Error Occured: ${error}`);
        });
    };

    const keyboardObj = window.vKeypadGlobal.newInstance(vKeypadForm.current,vKeypad.current,null,'KEYBOARD',20,null);
    keyboardObj.setOption('autoSubmit', false); // 입력완료 버튼 클릭시 submit
    window.vKeypadGlobal.setOptionAll('doneCallback', doneCallback);
    window.vKeypadGlobal.loadAll();

    const keyboardObj_NS = window.vKeypad_NS_Global.newInstance('qwerty', vKeypad_NS.current, 20);
    keyboardObj_NS.load();
    keyboardObj_NS.setIsMobile(true);
    keyboardObj_NS.setDoneCallback(doneCallback);

  }, [location])


  return(
    <>
      <form id="vKeyPadForm" name="vKeyPadForm" ref={vKeypadForm} method="post">
        <input placeholder={"1112131 처럼 입력해주세요"} autoFocus maxLength={7} type="password" name="vKeypadInput" ref={vKeypad} style={{margin: "unset"}}/>
        <input placeholder={"평문키패드 입니다."} autoFocus maxLength={20} type="text" name="vKeypadInput" ref={vKeypad_NS} style={{margin: "unset"}}/>
      </form>
    </>
  )
}

const SearchInput = styled.input`
  box-sizing: border-box;

  position: absolute;
  left: 0%;
  right: 18.34%;
  top: 0%;
  bottom: 0%;

  border: 1px solid #545454;
  border-radius: 20px 0px 0px 20px;
`

const SearchButton = styled.button`
  box-sizing: border-box;

  position: absolute;
  left: 81.66%;
  right: 0%;
  top: 0%;
  bottom: 0%;

  background: #3382E9;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-color: #545454;
  border-radius: 0px 20px 20px 0px;
`

export default KingsKeypad;