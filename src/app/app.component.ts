import { NgModule } from '@angular/core';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { CommonService } from './common.service';

import { CommonModal } from './common.model'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: '../landing.html',
    providers: [CommonService]
})

export class AppComponent implements OnInit {
    constructor(private storage: CommonService, private http: Http, private router: Router) { }

    humidity: Number;
    temperature: Number;

    name: string;
    surname: string;
    mobileNumber: string;
    email: string;
    comments: string;

    navigate(item: string): boolean {
        this.router.navigateByUrl('/boxer');
        document.getElementById(item + "Nav").click();
        return false;
    }

    ngOnInit(): void {
        this.storage.getData().then(item => this.initVariables(item));
    }

    initVariables(item: CommonModal) {
        this.humidity = item.Humidity;
        this.temperature = item.Temprature;
    }

    navigateToSection(e: Event, id: string): void {
        e.preventDefault();
        window.scrollTo(0, document.getElementById(id).offsetTop);
    }

    contactUs(event: Event): boolean {
        let currentDate = new Date(Date.now());
        let url = "https://api.elasticemail.com/v2/email/send";
        let api = "27bf6e11-fe44-45ed-b8c4-e291737221fc";
        let to = "qwertyihor11@gmail.com";
        let from = "boxer.co.ua@gmail.com";
        let subject = "Зв'яжіться з нами  [" +
            currentDate.getDate() + "/" + Number(currentDate.getMonth()) + Number(1) + "/" +
            currentDate.getFullYear() + "-" + currentDate.toTimeString().split(" GMT")[0] + "]";
        let emailBody = "";
        let isTransactional = true;

        emailBody = emailBody.concat("Ім'я:  <b>" + this.name + "</b>");
        emailBody = emailBody.concat("<br>Прізвище:  <b>" + this.surname + "</b>");
        emailBody = emailBody.concat("<br>Телефон:  <b>" + this.mobileNumber + "</b>");
        emailBody = emailBody.concat("<br>Email:  <b>" + this.email + "</b>");
        emailBody = emailBody.concat("<br>Коментар:  <b>" + this.comments + "</b><br>");

        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();

        body.append('apiKey', api);
        body.append('subject', subject);
        body.append('from', from);
        body.append('to', to);
        body.append('bodyHTML', emailBody);
        body.append('isTransactional', 'false');

        this.http.post(url, body, headers).subscribe(resp => {
            if (resp.json().success) {
                document.getElementById("successModalBtn").click();
            } else {
                document.getElementById("errorModalBtn").click();
            }
        });

        return true;
    }
}
