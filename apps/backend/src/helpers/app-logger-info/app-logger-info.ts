export const prettyPrint = (
  message: string,
  { color }: { color?: LoggerColor },
) => {
  const lines = message.split('\n');
  const maxLength = Math.max(...lines.map((line) => line.length));

  const borderColor =
    {
      white: '\x1b[37m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
    }[color as any] || '\x1b[37m'; // default to white

  const resetColor = '\x1b[0m'; // reset color

  const border = '─'.repeat(maxLength + 2);
  const topBottomBorder = `${borderColor}╭${border}╮${resetColor}`;

  console.log(`${borderColor}${topBottomBorder}${resetColor}`);
  lines.forEach((line) => {
    console.log(`${borderColor}│ ${line.padEnd(maxLength)} │${resetColor}`);
  });
  console.log(`${borderColor}╰${border}╯${resetColor}`);
};

export const LoggerColor = {
  WHITE: 'white',
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',
  BLUE: 'blue',
  MAGENTA: 'magenta',
  CYAN: 'cyan',
} as const;
export type LoggerColor = (typeof LoggerColor)[keyof typeof LoggerColor];

export const appIsRunningLogger = ({
  url,
  nodeEnv,
}: {
  url: string;
  nodeEnv: string;
}) => {
  prettyPrint(`Application is running\n\nURL : ${url}\nMODE: ${nodeEnv}`, {
    color: 'green',
  });
};
