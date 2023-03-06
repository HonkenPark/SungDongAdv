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

const parseMsgByReceive = (value) => {
  switch(value) {
    default:
    case 1:
      return '신청기관에서 받으실 수 있게 처리해드릴게요.🙂'
    case 2:
      return '주민등록기관에서 받으실 수 있게 처리해드릴게요.🙂';
    case 3:
      return '어떤 주소로 등기우편을 보내드릴까요?🙂';
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
      const respMessage = parseMsgByReceive(value);

      if (value === 1 || value === 2) {
        const reasonMessage = createChatBotMessage(respMessage);
        const resMsgInfoAgreement1 = createChatBotMessage('수수료 면제 대상 여부를 알려주세요.', {delay: 1000});
        const resMsgInfoAgreement2 = createChatBotMessage('면제 대상이시면 행정정보 공동이용 동의 후 수수료 면제 신청이 가능해요.🙂', {
          delay: 1000,
          widget: "empfAgreeAnswers",
        });
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, reasonMessage, resMsgInfoAgreement1, resMsgInfoAgreement2],
        }));
      }
      else {
        const reasonMessage = createChatBotMessage(respMessage, {
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

  // const handleReceive = value => text => e => {
  //   const userMessage = createClientMessage(text)

  //   if (value === 1 || value === 2) {
  //     const reasonMessage = createChatBotMessage(parseMsgByReceive(value));

  //     setState((prev) => ({
  //       ...prev,
  //       messages: [...prev.messages, userMessage, reasonMessage],
  //     }));
  //   }
  //   else {
  //     const reasonMessage = createChatBotMessage('어떤 주소로 등기우편을 보내드릴까요?2🙂', {
  //       delay: 800,
  //       widget: "addressType",
  //     });

  //     setState((prev) => ({
  //       ...prev,
  //       messages: [...prev.messages, userMessage, reasonMessage],
  //     }));
  //   }
  // };

  const handleTwoButtonsRow = value => type => text => e => {
    const userMessage = createClientMessage(text);

    if (type === 'addressType') {
      if (value === 1) {
        const resMsg = createChatBotMessage('주민등록 주소로 등기우편을 받으실 수 있게 처리할게요.🤗');
        const resMsgInfoAgreement1 = createChatBotMessage('수수료 면제 대상 여부를 알려주세요.', {delay: 1000});
        const resMsgInfoAgreement2 = createChatBotMessage('면제 대상이시면 행정정보 공동이용 동의 후 수수료 면제 신청이 가능해요.🙂', {
          delay: 1000,
          widget: "empfAgreeAnswers",
        });

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, resMsg, resMsgInfoAgreement1, resMsgInfoAgreement2],
        }));
      }
      else if (value === 2) {
        const resMsgAskAddress = createChatBotMessage('등기우편을 받으실 주소 입력을 도와드릴게요.😊', {
          widget: 'addrSearchModal',
        });
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, userMessage, resMsgAskAddress],
        }));
      }
    }
    else if (type === 'empfAgreeAnswer') {
      const resMsg = createChatBotMessage('서식 신청을 완료하기 위해 신청인의 서명이 필요해요.🙂', {
        delay: 800,
        widget: "signatureModal",
      });
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, resMsg],
      }));
    }
  };

  const handleAddressSelect = value => {
    const userMessage = createClientMessage(value);
    const resMsgInfoAgreement1 = createChatBotMessage('수수료 면제 대상 여부를 알려주세요.', {delay: 1000});
    const resMsgInfoAgreement2 = createChatBotMessage('면제 대상이시면 행정정보 공동이용 동의 후 수수료 면제 신청이 가능해요.🙂', {
      delay: 1000,
      widget: "empfAgreeAnswers",
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, resMsgInfoAgreement1, resMsgInfoAgreement2],
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
              // handleReceive,
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