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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var common_service_1 = require('./common.service');
var AppComponent = (function () {
    function AppComponent(storage, http, router) {
        this.storage = storage;
        this.http = http;
        this.router = router;
    }
    AppComponent.prototype.navigate = function (item) {
        debugger;
        this.router.navigateByUrl('/boxer');
        // switch (item) {
        //     case 'booking': {
        //         document.getElementById(item+ "Nav").click();
        //         break;
        //     }
        //     case 'gallery': {
        //         //statements; 
        //         break;
        //     }
        // }
        document.getElementById(item + "Nav").click();
        return false;
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.getData().then(function (item) { return _this.initVariables(item); });
    };
    AppComponent.prototype.initVariables = function (item) {
        this.humidity = item.Humidity;
        this.temperature = item.Temprature;
    };
    AppComponent.prototype.navigateToSection = function (e, id) {
        e.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    };
    AppComponent.prototype.contactUs = function (event) {
        var currentDate = new Date(Date.now());
        var url = "https://api.elasticemail.com/v2/email/send";
        var api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        var to = "qwertyihor11@gmail.com";
        var from = "boxer.co.ua@gmail.com";
        var subject = "Зв'яжіться з нами  [" +
            currentDate.getDate() + "/" + Number(currentDate.getMonth()) + Number(1) + "/" +
            currentDate.getFullYear() + "-" + currentDate.toTimeString().split(" GMT")[0] + "]";
        var emailBody = "";
        var isTransactional = true;
        emailBody = emailBody.concat("Ім'я:  <b>" + this.name + "</b>");
        emailBody = emailBody.concat("<br>Прізвище:  <b>" + this.surname + "</b>");
        emailBody = emailBody.concat("<br>Телефон:  <b>" + this.mobileNumber + "</b>");
        emailBody = emailBody.concat("<br>Email:  <b>" + this.email + "</b>");
        emailBody = emailBody.concat("<br>Коментар:  <b>" + this.comments + "</b><br>");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = new http_1.URLSearchParams();
        body.append('apiKey', api);
        body.append('subject', subject);
        body.append('from', from);
        body.append('to', to);
        body.append('bodyHTML', emailBody);
        body.append('isTransactional', 'false');
        this.http.post(url, body, headers).subscribe(function (resp) {
            if (resp.json().success) {
                document.getElementById("successModalBtn").click();
            }
            else {
                document.getElementById("errorModalBtn").click();
            }
        });
        return true;
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: '../landing.html',
            providers: [common_service_1.CommonService]
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService, http_1.Http, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map