import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

class LocalStorage implements Storage {
    public readonly length: number;
    public clear(): void { }
    public getItem(key: string): string | null { return undefined; }
    public key(index: number): string | null { return undefined; }
    public removeItem(key: string): void { }
    public setItem(key: string, value: string): void { }
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService implements Storage {

    private storage: Storage;
    public length: number;

    public constructor() {
        this.storage = new LocalStorage();

        AppComponent.isBrowser.subscribe(isBrowser => {
            if (isBrowser) {
                this.storage = localStorage;
            }
        });
    }

    public clear(): void {
        this.storage.clear();
    }

    public getItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    public key(index: number): string | null {
        return this.storage.key(index);
    }

    public removeItem(key: string): void {
        return this.storage.removeItem(key);
    }

    public setItem(key: string, value: string): void {
        return this.storage.setItem(key, value);
    }
}
