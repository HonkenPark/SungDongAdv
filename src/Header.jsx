import move_prev from './assets/images/move_prev.svg';
import move_exit from './assets/images/move_exit.svg';

import styled from 'styled-components';

const Header = (props) => {
  const formName = props.formName;

  const goPrevScreen = () => {
    console.log('이전화면으로 아이콘 눌림')
  }

  const goMainScreen = () => {
    console.log('나가기 아이콘 눌림')
  }

  return(
    <HeaderBackground>
      <MoveToImage src={move_prev} alt="본인인증 화면으로 되돌아 갑니다." onClick={goPrevScreen} />
      <FormTitle>
        <FromTitleText>{formName}</FromTitleText>
      </FormTitle>
      <ExitImage src={move_exit} alt="서식작성을 취소하고 메인화면ㄴ으로 되돌아 갑니다." onClick={goMainScreen} />
    </HeaderBackground>
  )
}

const HeaderBackground = styled.div`
  position: display;
  width: 1080px;
  height: 140px;
  background: #033075;
`;

const MoveToImage = styled.img`
  position: absolute;
  width: 29.22px;
  height: 46.52px;
  top: 47px;
  left: 43px;
`

const ExitImage = styled.img`
  position: absolute;
  width: 38.87px;
  height: 40.02px;
  top: 51px;
  left: 999px;
`

const FormTitle = styled.div`
  position: absolute;
  width: 886px;
  height: 94px;
  top: 23px;
  left: 97px;
  align-items: center;
`

const FromTitleText = styled.h2`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 42px;
  line-height: 22px;

  align-items: center;
  text-align: center;

  color: #FFFFFF;
`


export default Header;