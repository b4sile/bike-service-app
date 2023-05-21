import { makeAutoObservable } from 'mobx';

interface CommonModalItem {
  message: string;
}

class ModalsStore {
  private _commonModalItems: Array<CommonModalItem> = [];

  constructor() {
    makeAutoObservable(this);
  }

  get commonModalItems() {
    return this._commonModalItems;
  }

  set commonModalItems(items: Array<CommonModalItem>) {
    this._commonModalItems = items;
  }

  addCommonModalItem(item: CommonModalItem) {
    this._commonModalItems = [...this.commonModalItems, item];
  }

  popCommonModalItem() {
    this._commonModalItems = this._commonModalItems.slice(
      0,
      this._commonModalItems.length - 1
    );
  }
}

export default new ModalsStore();
