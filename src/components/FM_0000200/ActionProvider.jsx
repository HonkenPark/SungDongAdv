import React from "react";
import { createClientMessage } from "react-chatbot-kit";

const parseMsgByReason = (value) => {
  switch(value) {
    case 1:
      return '주민등록증을 분실하셨군요.😣';
    case 2:
      return '주민등록증이 훼손되었군요.😢';
    case 3:
      return '이름이 바뀌셨군요.😊';
    case 4:
      return '주민등록번호가 변경되었군요.😲';
    case 5:
      return '주소변경 칸이 부족하시군요.😣';
    case 6:
      return '주민등록증 사진을 바꾸시는군요.🙂';
    case 7:
      return '지문을 다시 등록하려고 하시는군요.🙂';
    case 8:
      return '주민등록증을 수령하지 못하셨었군요😢';
    case 9:
      return '주민등록이 말소되셨었군요.😢';
    case 10:
      return '재외국민이시군요.🤗';
    case 11:
    default:
      return '보기에는 없는 사유로 신청하시는거군요.🙂';
  }
}

const parseMsgByReceipt = (value) => {
  switch(value) {
    default:
    case 1:
      return '신청기관인 이곳에 다시 방문하시는군요.🙂';
    case 2:
      return '주민등록기관으로 가셔서 수령하시는군요.🙂';
  }
}

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleGridButton = value => type => answer => e => {
    if (type === 'reason') {
      const userMessage = createClientMessage(answer)
      const feedbackMessage = createChatBotMessage(parseMsgByReason(value));
      const switchMessage = createChatBotMessage('아래 내용을 확인해주세요.', {
        delay: 800,
        widget: "switches",
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, feedbackMessage, switchMessage],
      }));
    }
    else if (type === 'receive') {
      const userMessage = createClientMessage(answer)
      if (value === 1 || value === 2) {
        const reasonMessage = createChatBotMessage(parseMsgByReceipt(value));
        // TODO:
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, reasonMessage],
        }));
      }
      else {
        const reasonMessage = createChatBotMessage('어떤 주소로 등기우편을 보내드릴까요?🙂', {
          delay: 800,
          widget: "addressTypes",
        });

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, reasonMessage],
        }));
      }
    }
  };

  const handleSwitch = () => {
    const userMessage = createClientMessage('확인했어요!')
    const responseMessage = createChatBotMessage('주민등록증 수령방법을 아래에서 선택해주세요.😊', {
      delay: 50,
      widget: 'receiveways',
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, responseMessage],
    }));
  };

  const handleReceipt = value => text => e => {
    const userMessage = createClientMessage(text)

    if (value === 1 || value === 2) {
      const reasonMessage = createChatBotMessage(parseMsgByReceipt(value));

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, reasonMessage],
      }));
    }
    else {
      const reasonMessage = createChatBotMessage('어떤 주소로 등기우편을 보내드릴까요?🙂', {
        delay: 800,
        widget: "addressType",
      });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, reasonMessage],
      }));
    }
  };

  const handleTwoButtonsRow = value => text => e => {
    const userMessage = createClientMessage(text);

    if (value === 1) {
      const resMsg = createChatBotMessage('주민등록 주소로 등기우편을 받으실 수 있게 처리할게요.🤗');
      const resMsgInfoAgreement1 = createChatBotMessage('행정정보 공동이용에 대한 동의 여부를 선택해주세요.', {delay: 1000});
      const resMsgInfoAgreement2 = createChatBotMessage('이는 담당 공무원이 업무처리를 위해 행정정보 공동이용 시스템을 이용하여 신청인의 정보를 확인할 수 있습니다.', {delay: 1000});
      const resMsgInfoAgreement3 = createChatBotMessage('동의하지 않을 경우, 관련증명자료를 신청인이 직접 제출해야 합니다.', {delay: 1000});
      const resMsgInfoAgreement4 = createChatBotMessage('행정정보 공동이용에 동의하시나요?', {delay: 1000});
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, resMsg, resMsgInfoAgreement1, resMsgInfoAgreement2, resMsgInfoAgreement3, resMsgInfoAgreement4],
      }));
    }
    else {
      const resMsgAskAddress = createChatBotMessage('등기우편을 받으실 주소 입력을 도와드릴게요.😊', {
        widget: 'addrSearchModal',
      });
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, resMsgAskAddress],
      }));
    }
  };

  const handleAddressSelect = value => {
    const userMessage = createClientMessage(value);
    const reasonMessage = createChatBotMessage('이곳에 사시는군요 후후');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, reasonMessage],
    }));
  };

  return (
    <div>
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              handleGridButton,
              handleSwitch,
              handleReceipt,
              handleTwoButtonsRow,
              handleAddressSelect,
            },
          })
        })
      }
    </div>
  )
}

export default ActionProvider;