import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleReason = () => {
    const reasonMessage = createChatBotMessage("이 사유로 신청하시는거군요.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, reasonMessage],
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