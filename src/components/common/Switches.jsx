import { ConfigProvider, Switch, Button } from "antd";
import styled from 'styled-components';
import { text_id } from "common/text_id";

const Switches = (props) => {

  const onChange = (checked) => {
    console.log(`set To ${checked} !!`);
  }

  const buttonsMarkup = props.items.map((question, idx) => (
    <SwitchLabel key={idx}>{question.kor}
      <SwitchBackGround>
        <Switch
          id={`switch_${idx}`}
          style={
            {marginTop: -30, width: 79, height: 36}
          }
          onChange={onChange}
          defaultChecked={question.default}
        />
      </SwitchBackGround>
    </SwitchLabel>
  ));

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#3382E9',
            fontSize: 30,
            borderRadius: 10,
          }
        }
      }}
    >
      <BackGround>
        {buttonsMarkup}
        <br /><br />
        <Button
          type="primary"
          block={true}
          style={{"height": "70px"}}
          onClick={props.actionProvider.handleSwitch}
        >{text_id.COMMON_GUIDE.ID_0012.KOR}</Button>
        <br /><br />
      </BackGround>
    </ConfigProvider>
  )
}

const BackGround = styled.div`
  position: relative;
  left: 186px;
  width: 744px;
  height: auto;

  background: #F2F2F2;
  border-radius: 15px;
`;

const SwitchLabel = styled.h1`
  position: relative;
  width: 614px;
  height: 55px;
  left: 30px;
  top: 16px;
  text-align: left;
`

const SwitchBackGround = styled.div`
  position: absolute;
  width: 75px;
  height: 34px;
  left: 610px;
  top: 11px;
`

export default Switches;