import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { CommonConstants } from '../constants/common.constants';

export const Language = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.getArgByIndex(2).req;
    const env = dotenv.parse(fs.readFileSync(CommonConstants.ENV_CONFIG_PATH));
    const supportedLanguages = env[CommonConstants.SUPPORTED_LANGUAGES].split(',');
    const defaultLanguage = env[CommonConstants.DEFAULT_LANGUAGE];
    const requestLanguage = req.headers[CommonConstants.HEADER_LANGUAGE];
    const language = supportedLanguages.includes(requestLanguage) ? requestLanguage : defaultLanguage;
    return language;
  },
);
