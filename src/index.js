import { World } from "./World";
import Chat from "./chat";

import state from './state'

async function main() {
  const threeContainer = document.querySelector("#scene-container");
  state.threeContainer = threeContainer;
  const chatContainer = document.querySelector("#chat-container");
  state.chatContainer = chatContainer;
  const world = new World(threeContainer);

  Chat(chatContainer);
  await world.init();
  world.start();
}

main().catch((err) => {
  console.error(err);
});
