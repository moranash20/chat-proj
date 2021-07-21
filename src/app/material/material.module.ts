import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules2: any = [];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules2],
  exports: modules2,
})
export class MaterialModule {}
