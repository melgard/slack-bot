import config from 'config';
import {BotkitMessage, BotWorker, Botkit} from 'botkit';
import { SlackAdapter, SlackEventMiddleware } from 'botbuilder-adapter-slack';
import {getCommand} from './commands';

const {botToken, clientSigningSecret}: {botToken: string; clientSigningSecret: string } = config.get('slack')
const apiUri: string = '/api/messages';
const EVENT_TYPE = {
  slash_command: 'slash_command',
  app_mention: 'app_mention',
  message: 'message',
};

async function app() {
  const adapter = new SlackAdapter({
    clientSigningSecret,
    botToken,
  });
  adapter.use(new SlackEventMiddleware());
  const controller = new Botkit({
    webhook_uri: apiUri,
    adapter: adapter,
  });
  controller.ready(() => {

    controller.on(EVENT_TYPE.slash_command, async (bot: BotWorker, event: BotkitMessage) => {
      const { command, user_id, text } = event;
      const commandName: string = (command) ? command : undefined;
      const fn = getCommand(commandName);
      if (typeof fn !== 'function') {
        const response = `:thinking_face: parece que "${command}" no es un comando válido`;
        return await bot.reply(event, response);
      }
      const result = await fn(command, user_id, text);
      return await bot.reply(event, result);
    });

    controller.on(EVENT_TYPE.app_mention, async (bot: BotWorker, message: BotkitMessage) => {
      console.log(EVENT_TYPE.app_mention, message);
    });

    controller.on(EVENT_TYPE.message, async (bot: BotWorker, message: BotkitMessage) => {
      if (!message.bot_id) {
        console.log(EVENT_TYPE.message, message);
      }

    });

  });
}

export default app;
