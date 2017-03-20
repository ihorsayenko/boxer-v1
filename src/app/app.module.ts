import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts.component';
import { MainComponent } from './main.component';
import { PackageGalleryComponent } from './package-gallery.component';
import { QuestionAnswerComponent } from './question-answer.component';

import { InputTextModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';

import { CommonService } from './common.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        InputTextModule,
        SliderModule,
        CalendarModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot([
            // {
            //     path: 'booking'             
            //     //component: AppComponent
            // },
            {
                path: 'boxer',
                component: MainComponent
            },
            {
                path: 'contacts',
                component: ContactsComponent
            },
            {
                path: 'question',
                component: QuestionAnswerComponent
            },
            {
                path: 'gallery',
                component: PackageGalleryComponent

            },
            {
                path: '',
                redirectTo: '/boxer',
                pathMatch: 'full'
            }])
    ],
    declarations: [
        AppComponent,
        ContactsComponent,
        MainComponent,
        PackageGalleryComponent,
        QuestionAnswerComponent
    ],
    bootstrap: [AppComponent],
    providers: [CommonService]

})
export class AppModule { }