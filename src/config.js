import { createChatBotMessage } from "react-chatbot-kit";
import Header from "./Header";
import SdAvatar from "./SdAvatar";
import Reasons from "./Reasons";
import Switches from "./Switches";

const keyInfo = {
  userName: '박홍근',
  formName: '주민등록증 재발급 신청'
}

const config = {
  initialMessages: [
    // createChatBotMessage(<pre>{keyInfo.userName}님, 안녕하세요.<br></br>
    // 지금부터 제가 {keyInfo.formName} 안내를 도와드릴게요.<br></br>
    // 재발급 사유를 아래에서 선택해주세요.</pre>, {
    //   widget: "reasons",
    // }),
    createChatBotMessage(`${keyInfo.userName}님, 안녕하세요.`),
    createChatBotMessage(`지금부터 제가 ${keyInfo.formName} 안내를 도와드릴게요.`, {delay: 800}),
    createChatBotMessage('재발급 사유를 아래에서 선택해주세요.', {
      delay: 1600,
      widget: "reasons",
    }),
  ],
  widgets: [
    {
      widgetName: "reasons",
      widgetFunc: (props) => <Reasons {...props} />,
    },
    {
      widgetName: "switches",
      widgetFunc: (props) => <Switches {...props} />,
    }
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#F0F0F0",
    },
    chatButton: {
      backgroundColor: "#3382E9",
    }
  },
  state: {
    myCustomProperty: 'Bikershorts',
  },
  customComponents: {
    header: () => <Header formName={keyInfo.formName}  />,
    botAvatar: () => <SdAvatar />,

 }
}

export default config;