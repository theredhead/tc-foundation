export enum EnvironmentType {
  Node,
  Browser,
  Unknown,
}

const inBrowser = new Function(
  "try {return this===window;}catch(e){ return false;}"
);
const onNode = new Function(
  "try {return this===global;}catch(e){return false;}"
);

export const currentRuntimeEnvironment = (): EnvironmentType => {
  if (inBrowser()) {
    return EnvironmentType.Browser;
  } else if (onNode()) {
    return EnvironmentType.Node;
  }

  return EnvironmentType.Unknown;
};
