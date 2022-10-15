import HaxballCommands from '../../store/haxball-command.store';

const commandHandler = (message: String) => {
  const prefix = process.env.HAXBALL_PREFIX as string;

  if (!message.startsWith(prefix))
    return {
      isCommand: false,
      args: [],
      commandName: undefined,
      command: undefined,
    };

  const [commandName, ...args] = message
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = HaxballCommands.get(commandName) as any;

  return {
    isCommand: command ? true : false,
    args,
    commandName,
    command: command,
  };
};

export default commandHandler;
