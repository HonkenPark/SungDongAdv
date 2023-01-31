import styles from "./BasicMaterials.module.css";
import icon from './icon.svg'
import icon1 from './1.svg'
import vectorIcon from './vectorIcon.svg'
import move_prev from './images/move_prev.svg';


import styled from 'styled-components';

const Header = (props) => {
  const formName = props.formName;

  return(
    <HeaderBackground>
      <MoveToPrev>
        <MoveToImage src={move_prev} alt="본인인증 화면으로 되돌아 갑니다." />
      </MoveToPrev>
    </HeaderBackground>
  )
}

const HeaderBackground = styled.div`
  position: absolute;
  width: 1080px;
  height: 140px;
  left: 0px;
  top: 0px;
  background: #1C5A94;
`;

const MoveToPrev = styled.button`
  position: absolute;
  left: 2.96%;
  right: 91.94%;
  top: 30.71%;
  bottom: 30%;
`;

const MoveToImage = styled.img`
  position: absolute;
  left: 14.62%;
  right: 14.71%;
  top: 13.61%;
  bottom: 13.62%;
`


export default Header;