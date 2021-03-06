import {toResult, Result, isSorted, joinErrors} from './util';
import {types as S} from 'soyparser';
import * as chalk from 'chalk';
import SoyContext from './soy-context';

function formatMessage(node: S.MapLiteral): string {
  const firstLine = node.items[0].mark.start.line;
  const lastLine = node.items[node.items.length - 1].mark.start.line;

  return `Lines ${firstLine} to ${lastLine}`;
}

export default function validateSortedParams(soyContext: SoyContext): Result {
  const messages: Array<string> = [];
  soyContext.visit({
    MapLiteral(node) {
      const keys = node.items.map(item => item.key.value);

      if (!isSorted(keys)) {
        messages.push(formatMessage(node));
      }
    }
  });

  if (messages.length) {
    return toResult(
      false,
      `These ${chalk.yellow('map keys')} should be ${chalk.yellow('sorted')}:\n\n` +
      joinErrors(messages));
  }
  return toResult(true);
}
