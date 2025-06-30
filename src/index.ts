import { client } from "./discord/client";
import environment from "./environments/environment";

(async () => {
  await client.start(environment.BOT_TOKEN);
})();
