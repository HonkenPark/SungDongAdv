import { ConfigProvider, Switch } from "antd";
import styled from 'styled-components';

const Switches = (props) => {
  const questions = [
    { text: "발급신청확인서를 수령할게요.", handler: props.actionProvider.handleReason, },
    { text: "문자수령안내서비스를 신청할게요.", handler: props.actionProvider.handleReason, },
    { text: "점자스티커를 신청할게요.", handler: props.actionProvider.handleReason, },
    { text: "수수료 면제대상에 해당돼요.", handler: props.actionProvider.handleReason, },
  ];

  const buttonsMarkup = questions.map((question) => (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
          lineWidth: 500000,
          }
        }
      }}
    >
      <SwitchLabel>{question.text}
        <SwitchBackGround>
          <Switch
            defaultChecked
          />
        </SwitchBackGround>
      </SwitchLabel>

    </ConfigProvider>
  ));

  return (
      <BackGround>
        {buttonsMarkup}
       </BackGround>
  )
}

const BackGround = styled.div`
  position: relative;
  left: 192px;
  /* top: 386px; */
  width: 778px;
  height: 467px;

  background: #F2F2F2;
  border-radius: 15px;
`;

const SwitchLabel = styled.h1`
  position: relative;
  width: 700px;
  height: 65px;
  left: 37px;
  top: 16px;
`

const SwitchBackGround = styled.div`
  position: absolute;
  width: 79px;
  height: 36px;
  left: 599px;
  top: 15px;
`

export default Switches;