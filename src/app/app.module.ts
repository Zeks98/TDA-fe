import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TdaProcessingComponent } from './components/tda-processing/tda-processing.component';
import { HttpClientModule } from '@angular/common/http';
import { TdaContentListComponent } from './components/tda-content-list/tda-content-list.component';
import { TdaFilesComponent } from './components/tda-files/tda-files.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    TdaProcessingComponent,
    TdaContentListComponent,
    TdaFilesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
