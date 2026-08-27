import { Component, effect } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseInput } from '@shared/ui/base';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputPasswordModule } from 'primeng/inputpassword';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    InputText,
    InputPasswordModule,
    InputNumberModule,
    FloatLabel,
    //InputValidationMsgComponent,
    IconField,
    InputIcon,
  ],
})
export class Input extends BaseInput<any> {
  constructor() {
    super();
    effect(() => {
      if (this.disabled()) this.control().disable();
      else this.control().enable();
    });
  }
}
