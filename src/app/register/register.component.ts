import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DefaultConfig } from '../utilities/defaultconfig';
import { PersistenceInfoService } from '../utilities/persistence/persistence-info.service';
import { Router } from '@angular/router';
import { PrincipalServiceService } from '../core/services/principal-service.service';
import { PrincipalObject } from '../entities/principalObject';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ServiceMessageService } from '../core/message/service-message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  listGeneralInformacion: any;
  listPaises: Array<any>;
  listDepartamentos: Array<any>;
  submit: boolean;
  ulrTerminos: string;
  contraseniaDiferente: boolean;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly principalService: PrincipalServiceService,
    private readonly spinner: NgxSpinnerService,
    private readonly persistence: PersistenceInfoService,
    private readonly router: Router,
    private readonly serviceMessage : ServiceMessageService
  ) {
    this.submit = false;
    this.ulrTerminos = DefaultConfig.DEFAULT_CONFIG_APP.DefaultUrlTerminos;
    this.listDepartamentos = [];
    this.contraseniaDiferente = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.getCountries();
  }

  /**
   * Obtiene la información de los paises.
   *
   * @memberof RegisterComponent
   */
  getCountries(): void {
    this.principalService.getCountries().subscribe((rs: any) => {
      this.listGeneralInformacion = rs;
      this.listPaises = this.listGeneralInformacion.Paises;
    });
  }

  /**
   * Filtra los departamentos.
   *
   * @param {*} event
   * @memberof RegisterComponent
   */
  getDepartments(event:any): void {
    this.listDepartamentos = this.listGeneralInformacion.Dapartamentos.filter(
      (x:any) => x.idPadre === Number(event.idPadre)
    );
  }

  /**
   * Inica la instancia del formulario.
   *
   * @memberof RegisterComponent
   */
  initForm(): any {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      country: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^([0-9]*)'),
          Validators.maxLength(10),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]*)'),
          Validators.minLength(6),
        ],
      ],
      verifyPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9]*)'),
          Validators.minLength(6),
        ],
      ],
      terms: ['', Validators.required],
    });
  }
  get genericControl(): any {
    return this.registerForm.controls;
  }

  /**
   * Validad la igualdad de la contraseña.
   *
   * @param {*} event
   * @memberof RegisterComponent
   */
  validatePassword(event:any): void {
    const buttonSave = document.getElementById('save') as HTMLButtonElement;
    if (
      this.registerForm.controls.password.value !== '' &&
      this.registerForm.controls.verifyPassword.value !== '' &&
      this.registerForm.controls.password.valid &&
      this.registerForm.controls.verifyPassword.valid
    ) {
      buttonSave.disabled = false;
      if (
        this.registerForm.controls.password.value !== event.target.value ||
        this.registerForm.controls.verifyPassword.value !== event.target.value
      ) {
        buttonSave.disabled = true;
        this.serviceMessage.showMessage(
          'warning',
          DefaultConfig.DEFAULT_TEXT_APP.coincidenciaPassword,
          3000
        );
      }
    }
  }

  /**
   * crea el registro.
   *
   * @memberof RegisterComponent
   */
  saveInformation(): void {
    if (this.registerForm.invalid || this.submit === true) {
      this.submit = true;
    } else {
      this.spinner.show();
      let item = new PrincipalObject();
      item = this.fullEntity();
      this.principalService.saveInformation(item).subscribe((rs: any) => {
        if (rs) {
          setTimeout(() => {
            this.spinner.hide();
            this.saveInformationPersistence(item);
          }, 5000);
        }
      });
    }
  }

  /**
   * almacena la informacion cifrada en el session storage.
   *
   * @param {*} item
   * @memberof RegisterComponent
   */
  saveInformationPersistence(item:any): any {
    this.persistence.setInfo('record', JSON.stringify(item));
    this.showMessage();
  }

  /**
   * Renderiza el mensaje luego del cierre del spinner y limpia el formulario.
   *
   * @memberof RegisterComponent
   */
  showMessage(): void {
    this.serviceMessage.showMessage(
      'success',
      DefaultConfig.DEFAULT_TEXT_APP.guardoCorrectamente,
      3000,
      'Creado'
    );
    this.registerForm.reset();
    this.router.navigate(['/lists']);
  }


  /**
   * Se llena la entidad
   *
   * @return {*}  {PrincipalObject}
   * @memberof RegisterComponent
   */
  fullEntity(): PrincipalObject {
    const register = new PrincipalObject();
    register.name = this.registerForm.controls.name.value;
    register.last_name = this.registerForm.controls.surname.value;
    register.country = this.registerForm.controls.country.value;
    register.province = this.registerForm.controls.department.value;
    register.mail = this.registerForm.controls.email.value;
    register.password = this.registerForm.controls.password.value;
    return register;
  }


  /**
   *valida el campo de términos este checkeado.
   *
   * @param {*} event
   * @return {*}  {*}
   * @memberof RegisterComponent
   */
  validateTerms(event: any): any {
    if (event.currentTarget.checked === false) {
      this.submit = true;
      this.registerForm.controls.terms.setValidators([Validators.required]);
      this.registerForm.controls.terms.updateValueAndValidity();
    } else {
      this.submit = false;
    }
  }

  clean(): void {
    this.registerForm.reset();
    this.ngOnInit();
  }
}

