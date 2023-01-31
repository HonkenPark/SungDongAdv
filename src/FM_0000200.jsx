import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css'

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

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