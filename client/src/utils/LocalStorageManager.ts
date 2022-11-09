import User from '../models/User';
import * as Storage from '../lib/storage';

class LocalStorageManager {
  getUser() {
    const raw = Storage.getItem('user');

    if (raw && raw !== 'undefined') {
      const user = JSON.parse(raw);

      return user as User;
    } else {
      return;
    }
  }

  async setUser(user: User) {
    Storage.setItem('user', JSON.stringify(user));
  }

  async setToken(token: string) {
    Storage.setItem('access_token', token);
  }

  async removeLocalStorage() {
    Storage.removeItem('user');
    Storage.removeItem('access_token');
  }
}

export default new LocalStorageManager();
