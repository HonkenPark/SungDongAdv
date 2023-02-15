import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'

import config from 'components/FM_0000200/config';
import ActionProvider from 'components/FM_0000200/ActionProvider';
import MessageParser from 'components/FM_0000200/MessageParser';

const FM_0000200 = () => {
  return (
    <>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </>
  )
}

export default FM_0000200;