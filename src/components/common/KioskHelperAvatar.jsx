import styled from 'styled-components'
import avatar from 'assets/images/sd-avatar.svg'

const KioskHelperAvatar = () => {
  return (
    <KioskHelperLogoGroup className="sd_logo_group">
      <img alt="" src={avatar} />
    </KioskHelperLogoGroup>
  )
}

const KioskHelperLogoGroup = styled.div`
  background-position: 50% 50%;
  background-size: cover;
  height: 106px;
  width: 106px;
  margin-left: 50px;
`;

export default KioskHelperAvatar;