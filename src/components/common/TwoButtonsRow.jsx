import { ConfigProvider, Button, Space  } from "antd";

const TwoButtonsRow = (props) => {

  const buttonMarkup = props.items.map((item, idx) => (
    <ConfigProvider
      key={idx}
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
        className="custom-two-button-list-size"
        type="primary"
        onClick={(e)=>{
          props.actionProvider.handleTwoButtonsRow(item.value)(item.text)(e)
        }}
      >
        {item.text}
      </Button>
    </ConfigProvider>
  ));

  return (
    <Space
        direction="horizontal"
      >
        {buttonMarkup}
      </Space>
  )
}

export default TwoButtonsRow;