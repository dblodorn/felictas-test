import { World } from "./World";
import Chat from "./chat"

async function main() {
  const threeContainer = document.querySelector("#scene-container");
  const chatContainer = document.querySelector("#chat-container");
  const world = new World(threeContainer);

  await world.init();
  Chat(chatContainer);
  world.start();
}

main().catch((err) => {
  console.error(err);
});
