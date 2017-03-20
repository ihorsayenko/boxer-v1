"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var contacts_component_1 = require('./contacts.component');
var main_component_1 = require('./main.component');
var package_gallery_component_1 = require('./package-gallery.component');
var question_answer_component_1 = require('./question-answer.component');
var primeng_1 = require('primeng/primeng');
var primeng_2 = require('primeng/primeng');
var primeng_3 = require('primeng/primeng');
var common_service_1 = require('./common.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                primeng_1.InputTextModule,
                primeng_2.SliderModule,
                primeng_3.CalendarModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                router_1.RouterModule.forRoot([
                    // {
                    //     path: 'booking'             
                    //     //component: AppComponent
                    // },
                    {
                        path: 'boxer',
                        component: main_component_1.MainComponent
                    },
                    {
                        path: 'contacts',
                        component: contacts_component_1.ContactsComponent
                    },
                    {
                        path: 'question',
                        component: question_answer_component_1.QuestionAnswerComponent
                    },
                    {
                        path: 'gallery',
                        component: package_gallery_component_1.PackageGalleryComponent
                    },
                    {
                        path: '',
                        redirectTo: '/boxer',
                        pathMatch: 'full'
                    }])
            ],
            declarations: [
                app_component_1.AppComponent,
                contacts_component_1.ContactsComponent,
                main_component_1.MainComponent,
                package_gallery_component_1.PackageGalleryComponent,
                question_answer_component_1.QuestionAnswerComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [common_service_1.CommonService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map