import styles from "./BasicMaterials.module.css";
import icon from './icon.svg'
import icon1 from './1.svg'
import vectorIcon from './vectorIcon.svg'

// const Header = () => {
//   return(
//     <div className={styles.header}>
//       <header className={styles.viewportkiosk}>
//         <img className={styles.icon} alt="" src={icon} />
//         <img className={styles.icon1} alt="" src={icon1} />
//         <img className={styles.vectorIcon} alt="" src={vectorIcon} />
//         <div className={styles.div}>
//           <p className={styles.p}>주민등록증 재발급 신청</p>
//         </div>
//       </header>
//     </div>
//   )
// }

import styled from 'styled-components';

const Header = (props) => {
  const formName = props.formName;

  return(
    <header className={styles.header}>
      <img className={styles.vector} src={vectorIcon} alt="" />
      <h1 className={styles.titleName}>
        {formName}
      </h1>
      <img className={styles.image} src={icon1} alt="" />
    </header>
  )
}

export default Header;