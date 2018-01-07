// https://github.com/jonnyreeves/js-logger
import Logger from 'js-logger';

Logger.useDefaults({
  defaultLevel: process.env.NODE_ENV === 'production' ? logger.ERROR : logger.DEBUG,
});
