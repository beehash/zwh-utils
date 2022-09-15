import { StorageOptions } from '@/models/General.model';
import { Singleton } from './singleton';

@Singleton
class Storage {
  static instance: Storage;

  static getInstance: () => Storage;

  getItem(name: string) {
    const storageString: StorageOptions = JSON.parse(localStorage.getItem(name) || '{}');
    const timestamp = new Date().getTime();
    const { pathname, hostname: domain } = window.location;

    if (storageString.path && pathname.indexOf(storageString.path) < 0) {
      return undefined;
    }

    if (storageString.domain && domain.indexOf(storageString.domain) < 0) {
      return undefined;
    }

    if (storageString.expires && timestamp > storageString.expires) {
      localStorage.removeItem(name);
      return undefined;
    }

    return storageString.value;
  }

  setItem(storageOptions: StorageOptions) {
    localStorage.setItem(storageOptions.name, JSON.stringify(storageOptions));
  }

  removeItem(name: string) {
    localStorage.removeItem(name);
  }
}

const storage = Storage.getInstance();
export { storage }
