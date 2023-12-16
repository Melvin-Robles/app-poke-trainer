import { Injectable } from '@angular/core';
import { DescrypEncriptAesService } from './descryp-encript-aes.service';
import { SessionStorageProps } from '../types/session-storage-props.type';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(private _decryptEncrypt: DescrypEncriptAesService) {}

	/**
	 * @name setValue
	 * @description
	 * Asigna nuevamente el valor a la 'sessionName' asignada
	 * @param value T
	 * @param sessionName SessionStorageProp
	 */
	setValue<T>(value: T, sessionName: SessionStorageProps) {
		sessionStorage.setItem(btoa(sessionName), this._decryptEncrypt.encryptAES(JSON.stringify(value)));
	}

	/**
	 * @name getValue
	 * @description
	 * Obtener el valor de la session parametrizada
	 * @param sessionName
	 * @returns T | null
	 */
	getValue<T>(sessionName: SessionStorageProps): T | null {
		const valueRaw: string = sessionStorage.getItem(btoa(sessionName))!;
		if (valueRaw === null || valueRaw === undefined) return null;
		const value: T = JSON.parse(this._decryptEncrypt.decryptAES(valueRaw));

		if (value !== null && value !== undefined) return value;
		return null;
	}

	/**
	 * @name remove
	 * @description
	 * Elimina la session parametrizada
	 * @param sessionName
	 */
	remove(sessionName: string) {
		sessionStorage.removeItem(btoa(sessionName));
	}

	/**
	 * @name clear
	 * @description
	 * Elimina todas las sessionStorage
	 */
	clear() {
		sessionStorage.clear();
	}
}
