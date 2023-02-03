import { Switch } from "antd";

const questions = (props) => [
  { text: "발급신청확인서를 수령하시나요?", handler: props.actionProvider.handleReason, },
  { text: "문자수령안내서비스를 신청하시나요?", handler: props.actionProvider.handleReason, },
  { text: "점자스티커를 신청하시나요?", handler: props.actionProvider.handleReason, },
  { text: "수령방법을 선택해주세요.", handler: props.actionProvider.handleReason, },
  { text: "수수료 면제대상에 해당하시나요?", handler: props.actionProvider.handleReason, },
]

const Switches = () => {
  return (
    <>
      <Switch
        defaultChecked
       />
    </>
  )
}

export default Switches;