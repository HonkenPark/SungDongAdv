import styled from 'styled-components'
import avatar from './sd-avatar.svg'

const SdAvatar = () => {
  return (
    <SdLogoGroup className="sd_logo_group">
      <img alt="" src={avatar} />
    </SdLogoGroup>
  )
}

const SdLogoGroup = styled.div`
  background-image: url('./sd-avatar.svg');
  background-position: 50% 50%;
  background-size: cover;
  height: 106px;
  width: 106px;
  margin-left: 50px;
`;

export default SdAvatar;