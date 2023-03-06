import { ConfigProvider, Button, Space } from 'antd';

const Receipt = (props) => {
  const receiptWays = [
    { value: 1, type: 'receipt', text: '신청기관 방문' },
    { value: 2, type: 'receipt', text: '주민등록기관 방문' },
    { value: 3, type: 'receipt', text: '등기우편' },
  ];

  const buttonMarkup = receiptWays.map((receiptWay) => (
    <ConfigProvider
      key={receiptWay.id}
      theme={{
        components: {
          Button: {
            colorPrimary: '#3382E9',
            fontSize: 32,
            borderRadius: 10,
            fontFamily: 'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif',
            lineWidth: 50,
          },
        },
      }}
    >
      <Button
        className="custom-button-list-size"
        type="primary"
        onClick={(e) => {
          props.actionProvider.handleReceive(receiptWay.value)(receiptWay.text)(e);
        }}
      >
        {receiptWay.text}
      </Button>
    </ConfigProvider>
  ));

  return (
    <Space direction="horizontal">
      {buttonMarkup}
    </Space>
  );
};

export default Receipt;
