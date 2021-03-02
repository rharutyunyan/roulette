import { Logger } from '@nestjs/common';

import { readFileSync, existsSync } from 'fs';

const logger = new Logger('system-io');

export const readFile = (path: string): any => {
  if (!existsSync(path)) {
    return null;
  }
  try {
    return readFileSync(path);
  } catch (err) {
    logger.error(
      `Error occured while attempting to read file at path: ${path}, error: ${JSON.stringify(err)}`,
    );
  }
};
