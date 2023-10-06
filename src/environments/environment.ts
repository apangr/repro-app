import { IEnvironment } from './env-interface';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  appUrl: 'http://localhost:4200',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'es-ES'],
  social: {
    googleClientId: '1231eqeqwe.apps.googleusercontent.com',
    googleClientSecret: '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as',
    facebookClientId: '10567345675523423',
  },
  version: '0',
};
