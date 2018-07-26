import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatsPage } from './stats';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
	IonicPageModule.forChild(StatsPage),
	ChartsModule
  ],
})
export class StatsPageModule {}
