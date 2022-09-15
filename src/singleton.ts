interface targetConstructor<T> {
  new(...args: any[]): T;
  instance: T;
  getInstance: () => T;
}

export function Singleton<T>(target: targetConstructor<T>) {
  target.getInstance = function () {
    if (!target.instance) {
      target.instance = new target()
    }
    return target.instance;
  }
}