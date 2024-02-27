import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TdaProcessingComponent } from './components/tda-processing/tda-processing.component';
import { HttpClientModule } from '@angular/common/http';
import { TdaContentListComponent } from './components/tda-content-list/tda-content-list.component';
import { TdaFilesComponent } from './components/tda-files/tda-files.component';

@NgModule({
  declarations: [
    AppComponent,
    TdaProcessingComponent,
    TdaContentListComponent,
    TdaFilesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
