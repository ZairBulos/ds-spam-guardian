import environment from "./config/environment";
import { client } from "./bot/client";

(async () => {
  await client.start(environment.BOT_TOKEN);
})();
