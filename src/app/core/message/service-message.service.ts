import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiceMessageService {

  constructor() { }

  /**
   * Servicio de Mensajes 
   *
   * @param {string} icon
   * @param {string} mensaje
   * @param {number} [timer]
   * @param {string} [titulo]
   * @memberof ServiceMessageService
   */
  showMessage(icon: string, mensaje: string, timer?: number, titulo?: string) {
    Swal.fire({
      icon: `${icon}` as any,
      text: mensaje,
      title: titulo === undefined ? '' : titulo,
      showConfirmButton: false,
      timer: timer,
    });
  }
}
