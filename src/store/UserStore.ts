import { makeAutoObservable } from 'mobx';
import { User } from '../models/User';

class UserStore {
  private _currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: User | null) {
    this._currentUser = user;
  }

  get isAuth(): boolean {
    return !!this._currentUser;
  }
}

export default new UserStore();
