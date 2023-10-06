export interface IEnvironment {
  production: boolean;
  apiUrl: string;
  appUrl: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  social: {
    googleClientId: string;
    googleClientSecret: string;
    facebookClientId: string;
  };
  version: string;
}
