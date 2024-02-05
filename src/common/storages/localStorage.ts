export class LocalStorage {
    getLocalStorage(key: string): string {
        if (!localStorage) {
            return '';
        }
        return localStorage.getItem(key) || '';
    }

    setLocalStorage(key: string, value: string): void {
        if (!localStorage) {
            return;
        }
        localStorage.setItem(key, value);
    }
}

export const storage = new LocalStorage();