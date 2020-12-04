import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationComponent } from './translation/translation.component';
import { AlertComponent } from './alert/alert.component';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { TranslationService } from './translation/translation.service';



@NgModule({
  declarations: [TranslationComponent, AlertComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FurySharedModule
  ],
  exports: [
    TranslationComponent
  ],
  providers: [TranslationService]
})
export class SharedModule { }
