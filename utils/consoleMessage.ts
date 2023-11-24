import colors from 'colors';

export function logSuccess(msg: unknown) {
  console.log(`[Success] - ${msg}`.cyan.italic);
}

export function logError(msg: unknown) {
  console.log(colors.bold.red(`[Error] - ${JSON.stringify(msg)}`));
}
