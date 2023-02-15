import React from "react"
import { ConfigProvider, Button, Space } from "antd";
import { isMultipleArray } from "common/utils";

const GridButtons = (props) => {
  let buttonsMarkup, buttonMarkupRow;
  const hasMultipleArray = isMultipleArray(props.items[0]);

  if (hasMultipleArray) {
    buttonsMarkup = props.items.map((itemGroup, idx) => {
      buttonMarkupRow =  itemGroup.map((item, subIdx) => (
        <ConfigProvider
          key={subIdx}
          theme={{
            components: {
                Button: {
                colorPrimary: '#3382E9',
                fontSize: 32,
                borderRadius: 10,
                lineWidth: 50,
              }
            }
          }}
        >
          <Button
            className="custom-button-list-size"
            type="primary"
            onClick={(e)=>{
              props.actionProvider.handleGridButton(item.value)(item.type)(item.kor)(e)
            }}
          >
            {item.kor}
          </Button>
        </ConfigProvider>
      ))
      return (
        <Space
          key={idx}
          direction="horizontal"
        >
          {buttonMarkupRow}
        </Space>
      )
    });
  }
  else {
    buttonsMarkup = props.items.map((item, idx) => (
      <ConfigProvider
        key={idx}
        theme={{
          components: {
              Button: {
              colorPrimary: '#3382E9',
              fontSize: 32,
              borderRadius: 10,
              lineWidth: 50,
            }
          }
        }}
      >
        <Button
          className="custom-button-list-size"
          type="primary"
          onClick={(e)=>{
            props.actionProvider.handleGridButton(item.value)(item.type)(item.kor)(e)
          }}
        >
          {item.kor}
        </Button>
      </ConfigProvider>
    ));
  }

  return(
    <>
      {
        hasMultipleArray ?
        <Space direction="vertical">{buttonsMarkup}</Space> :
        <Space direction="horizontal">{buttonsMarkup}</Space>
      }
      
    </>
  )
}

export default GridButtons;