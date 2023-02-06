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

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleReason = value => text => e => {
    const userMessage = createClientMessage(text)
    const responseMessage = parseMsgByReason(value);
    const reasonMessage = createChatBotMessage(responseMessage);
    const reasonMessage2 = createChatBotMessage('아래 내용을 확인해주세요.', {
      delay: 800,
      widget: "switches",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, reasonMessage, reasonMessage2],
    }));
  };
  
  return (
    <div>
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            actions: {
              handleReason,
            },
          })
        })
      }
    </div>
  )
}

export default ActionProvider;