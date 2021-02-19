import state from '../state'

export default function (container) {
  function chatDom () {
    const chatInner = `<div id="chat-inner">CLICKS: ${state.clicks}</div>`;
    container.innerHTML = chatInner;
  }

  function repeatChecking(oldValue) {
    setInterval(() => {
      if(oldValue !== state.clicks) {
         oldValue = state.clicks;
         chatDom();
       }
     }, 10);
  }
  
  repeatChecking(state.clicks)
  chatDom();
}