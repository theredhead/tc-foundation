import {
  EnvironmentType,
  currentRuntimeEnvironment,
} from "../environment/environment.funcs";

declare var Buffer: any;

export class Base64Error extends Error {
  static throw(message: string): never {
    throw new Base64Error(message);
  }
}
export class Base64 {
  static encode(plaintext: string): string {
    const env = currentRuntimeEnvironment();

    switch (env) {
      case EnvironmentType.Browser:
        return btoa(plaintext);
      case EnvironmentType.Node:
        return Buffer.from(plaintext, "binary").toString("base64");
      default:
        Base64Error.throw(`Unknown environment type ${env}`);
    }
  }

  static decode(encoded: string): string {
    const env = currentRuntimeEnvironment();

    switch (env) {
      case EnvironmentType.Browser:
        return atob(encoded);
      case EnvironmentType.Node:
        return Buffer.from(encoded, "base64").toString("binary");
      default:
        Base64Error.throw(`Unknown environment type ${env}`);
    }
  }
}
