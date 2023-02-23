import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  // Armazenamento
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Busca de dados do armazenamento
  public get(key: string) {
    this._storage?.get(key);
  }

  public getAll(){
    const list = [];
    this._storage.forEach((value, key, index) => {
        list.push(value);
    });
    return list;
  }
}
