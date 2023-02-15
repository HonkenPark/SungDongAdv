import { FM_0000200_TEXT } from "common/text_id";
import { createChatBotMessage } from "react-chatbot-kit";

import ChatbotHeader from "components/header/ChatbotHeader";
import KioskHelperAvatar from "components/common/KioskHelperAvatar";

import GridButtons from "components/common/GridButtons";
import Switches from "components/common/Switches";
import TwoButtonsRow from "components/common/TwoButtonsRow";
import AddressModal from "../../AddressModal";
import AddressSearch from "../../AddressSearch";

const keyInfo = {
  userName: '박홍근',
  formName: '주민등록증 재발급 신청'
}

const config = {
  
  initialMessages: [
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
      widgetFunc: (props) => <GridButtons {...props} items={FM_0000200_TEXT.reasons} />,
    },
    {
      widgetName: "switches",
      widgetFunc: (props) => <Switches {...props} items={FM_0000200_TEXT.switches} />,
    },
    {
      widgetName: "receiveways",
      widgetFunc: (props) => <GridButtons {...props} items={FM_0000200_TEXT.receives} />,
    },
    {
      widgetName: "addressTypes",
      widgetFunc: (props) => <TwoButtonsRow {...props} items={FM_0000200_TEXT.addressTypes} />,
    },
    {
      widgetName: "addrSearchModal",
      widgetFunc: (props) => <AddressSearch {...props} />,
      // props: {modal:true}
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#F0F0F0",
    },
    chatButton: {
      backgroundColor: "#3382E9",
    }
  },
  customComponents: {
    header: () => <ChatbotHeader formName={keyInfo.formName}  />,
    botAvatar: () => <KioskHelperAvatar />,
 }
}

export default config;