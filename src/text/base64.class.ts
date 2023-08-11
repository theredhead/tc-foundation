import { EnvironmentType, UnsupportedEnvironmentError, currentRuntimeEnvironment } from "../environment/environment.funcs";

declare var Buffer : any;

export class Base64 {
  static encode(plaintext: string): string {
    const env = currentRuntimeEnvironment();

    switch(env) {
      case EnvironmentType.Browser: 
        return btoa(plaintext);
      case EnvironmentType.Node:
        return Buffer.from(plaintext, 'binary').toString('base64');
      default:
        throw new UnsupportedEnvironmentError();
    }
  }

  static decode(encoded: string): string {
    const env = currentRuntimeEnvironment();

    switch(env) {
      case EnvironmentType.Browser: 
        return atob(encoded);
      case EnvironmentType.Node:
        return Buffer.from(encoded, 'base64').toString('binary');
      default:
        throw new UnsupportedEnvironmentError();
    }
  }
}