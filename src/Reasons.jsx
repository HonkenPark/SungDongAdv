import React from "react"
import { ConfigProvider, Radio  } from "antd";

const Reasons = (props) => {
  const reasons = [
    { text: "분실", label: "분실", value: 1 , handler: props.actionProvider.handleReason, },
    { text: "훼손", label: "훼손", value: 2 , handler: props.actionProvider.handleReason, },
    { text: "성명 변경", label: "성명 변경", value: 3 , handler: props.actionProvider.handleReason, },
    { text: "주민등록번호 변경", label: "주민등록번호 변경", value: 4 , handler: props.actionProvider.handleReason, },
    { text: "주소 변경 칸 부족", label: "주소 변경 칸 부족", value: 5 , handler: props.actionProvider.handleReason, },
    { text: "용모(사진) 변경", label: "용모(사진) 변경", value: 6 , handler: props.actionProvider.handleReason, },
    { text: "지문 재등록", label: "지문 재등록", value: 7 , handler: props.actionProvider.handleReason, },
    { text: "미수령으로 회수, 파기", label: "미수령으로 회수, 파기", value: 8 , handler: props.actionProvider.handleReason, },
    { text: "주민등록 말소자의 귀국", label: "주민등록 말소자의 귀국", value: 9 , handler: props.actionProvider.handleReason, },
    { text: "재외국민 주민등록", label: "재외국민 주민등록", value: 10 , handler: props.actionProvider.handleReason, },
    { text: "그 밖의 사유", label: "그 밖의 사유", value: 11 , handler: props.actionProvider.handleReason, },
  ];



  
  const buttonsMarkup = reasons.map((reason) => (
    <ConfigProvider
      theme={{
        components: {
            Radio: {
            colorPrimary: '#fcda42',
            fontSize: 45,
            borderRadius: 10,
            colorTextLabel: '#000000',
            controlHeight: 104,
            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
            lineType: 'none',
          }
        }
      }}
    >
      <Radio.Button
        key={reason.value}
        value={reason.value}
        onClick={props.actionProvider.handleReason}
        // onClick={reason.handler}
      >
        {reason.text}
      </Radio.Button>
    </ConfigProvider>
  ))
  return(
    <div className="options-container">{buttonsMarkup}</div>
  )
}

export default Reasons;