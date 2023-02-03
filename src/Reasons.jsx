import React from "react"
import { ConfigProvider, Button, Space  } from "antd";

const Reasons = (props) => {
  const reasonsArr = [
    [
      { text: "분실", label: "분실", value: 1 , handler: props.actionProvider.handleReason, },
      { text: "훼손", label: "훼손", value: 2 , handler: props.actionProvider.handleReason, },
      { text: "성명 변경", label: "성명 변경", value: 3 , handler: props.actionProvider.handleReason, },
    ],
    [
      { text: "주민등록번호 변경", label: "주민등록번호 변경", value: 4 , handler: props.actionProvider.handleReason, },
      { text: "주소 변경 칸 부족", label: "주소 변경 칸 부족", value: 5 , handler: props.actionProvider.handleReason, },
      { text: "용모(사진) 변경", label: "용모(사진) 변경", value: 6 , handler: props.actionProvider.handleReason, },
    ],
    [
      { text: "지문 재등록", label: "지문 재등록", value: 7 , handler: props.actionProvider.handleReason, },
      { text: "미수령으로 회수, 파기", label: "미수령으로 회수, 파기", value: 8 , handler: props.actionProvider.handleReason, },
      { text: "주민등록 말소자의 귀국", label: "주민등록 말소자의 귀국", value: 9 , handler: props.actionProvider.handleReason, },
    ],
    [
      { text: "재외국민 주민등록", label: "재외국민 주민등록", value: 10 , handler: props.actionProvider.handleReason, },
      { text: "그 밖의 사유", label: "그 밖의 사유", value: 11 , handler: props.actionProvider.handleReason, },
    ],
  ];

  const buttonsMarkup = reasonsArr.map((reasons) => {
    const buttonMarkupRow = reasons.map((reason) => (
      <ConfigProvider
        theme={{
          components: {
              Button: {
              colorPrimary: '#3382E9',
              fontSize: 32,
              borderRadius: 10,
              fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
              lineWidth: 50,
            }
          }
        }}
      >
        <Button
          className="custom-button-size"
          type="primary"
          onClick={(e)=>{
            props.actionProvider.handleReason(reason.value)(reason.text)(e)
          }}
        >
          {reason.text}
        </Button>
      </ConfigProvider>
    ))
    return (
      <Space direction="horizontal">
        {buttonMarkupRow}
      </Space>
    )
  });

  return(
    <>
      <br></br><br></br><br></br>
      <Space direction="vertical">{buttonsMarkup}</Space>
      <br></br><br></br><br></br>
    </>
  )
}

export default Reasons;