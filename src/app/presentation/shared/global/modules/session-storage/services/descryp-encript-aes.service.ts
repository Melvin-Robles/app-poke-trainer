import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import * as CryptoJS from 'crypto-js';


 /**
 * @name DescrypEncriptAesService
 * @description Servicio para el manejo de la encriptacion de la informacion.
 */
@Injectable({
  providedIn: 'root'
})
export class DescrypEncriptAesService {

	private readonly _secretKey = environment.SECRET_KEY;

	constructor() {}

	/**
	 * @name decryptAES
	 * @description
	 * Decodifica el valor recibido.
	 * @param encryptedBase64 string
	 * @return string
	 */
	decryptAES(encryptedBase64: string): string {
		return CryptoJS.AES.decrypt(encryptedBase64, this._secretKey).toString(CryptoJS.enc.Utf8);
	}

	/**
	 * @name encryptAES
	 * @description
	 * Codifica el valor recibido y lo retorna.
	 * @param text string
	 * @returns string
	 */
	encryptAES(text: string): string {
		return CryptoJS.AES.encrypt(text, this._secretKey).toString();
	}
}
