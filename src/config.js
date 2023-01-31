import { createChatBotMessage } from "react-chatbot-kit";
import Header from "./Header";
import SdAvatar from "./SdAvatar";
import Reasons from "./Reasons";

const keyInfo = {
  userName: '박홍근',
  formName: '주민등록증 재발급 신청'
}

const config = {
  initialMessages: [
    createChatBotMessage(`${keyInfo.userName}님, 안녕하세요.
    지금부터 제가 ${keyInfo.formName} 안내를 도와드릴게요.\n재발급 사유를 아래에서 선택해주세요.`, {
      widget: "reasons",
    }),
    // createChatBotMessage(`${keyInfo.userName}님, 안녕하세요.`),
    // createChatBotMessage(`지금부터 제가 ${keyInfo.formName} 안내를 도와드릴게요.`, {delay: 2000}),
    // createChatBotMessage('재발급 사유를 아래에서 선택해주세요.', {
    //   delay: 4000,
    //   widget: "reasons",
    // }),
  ],
  widgets: [
    {
      widgetName: "reasons",
      widgetFunc: (props) => <Reasons {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#C5C5C5",
    },
    chatButton: {
      backgroundColor: "red",
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