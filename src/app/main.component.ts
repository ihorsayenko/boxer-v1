import { NgModule, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { CommonService } from './common.service'
import { CommonModal } from './common.model'
import { PackageModel } from './package.model'

@Component({
    moduleId: module.id,
    selector: 'landing',
    templateUrl: '../content.html'
})

export class MainComponent implements OnInit {
    daysCount: number = 0;
    minSlide: number = 7;
    maxSlide: number = 360;
    maxPackageCount = 20;

    monthPay: number = 0;
    periodPay: number = 0;
    boxSize: number = 0;
    boxSizeStr: string;
    boxSizeStrM: string;

    dateFrom: Date = new Date();
    dateFromStr: string;
    dateToStr: string;

    boxImgSrcFull: string;

    name: string;
    surname: string;
    mobileNumber: string;
    email: string;
    comments: string;

    activeSizeBtb: Element;
    activeTermBtb: Element;

    imgs: any;

    boxes: PackageModel[];
    boxesEtalon: PackageModel[];
    locksAndShelves: PackageModel[];
    locksAndShelvesEtalon: PackageModel[];
    packages: PackageModel[];
    packagesEtalon: PackageModel[];
    others: PackageModel[];
    othersEtalon: PackageModel[];

    showPackageMaterialsOnBooking: boolean = false;
    showBoxes: boolean = false;
    showLocksAndShelves: boolean = false;
    showPackages: boolean = false;
    showOthers: boolean = false;

    countBoxes: number;
    countLocksAndShelves: number;
    countPackages: number;
    countOthers: number;

    packagesPrice: number;
    finalPrice: number = 0;
    monthCount: number = 0;
    termStr: string;

    galleryPic: any[];

    capabilitiesClass: string;
    colorExpLeft: string;
    colorExpRight: string;
    data: CommonModal;

    @ViewChildren('sizeBtns') boxSizeBtns: QueryList<ElementRef>;
    @ViewChildren('termsBtns') termsBtns: QueryList<ElementRef>;

    constructor(private http: Http, private common: CommonService) {
    }

    resetVariables(): void {
        this.name = ""
        this.surname = "";
        this.mobileNumber = "";
        this.email = "";
        this.comments = "";
        this.daysCount = 0;
        this.periodPay = 0;
        this.monthPay = 0;
        this.dateFrom = new Date();

        this.activeSizeBtb.classList.remove('active_btn');
        this.activeTermBtb.classList.remove('active_btn');
        this.boxImgSrcFull = this.imgs[0].imgsrc;
    }

    ngOnInit(): void {
        this.common.getData().then(i => { this.data = i; });
        this.common.getPackageBoxes().then(i => { this.boxes = i; this.boxesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getPackageLocksAndShelves().then(i => { this.locksAndShelves = i; this.locksAndShelvesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getPackagePackages().then(i => { this.packages = i; this.packagesEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getPackageOthers().then(i => { this.others = i; this.othersEtalon = (JSON.parse(JSON.stringify(i))) as PackageModel[]; });
        this.common.getBoxImgs().then(items => { this.imgs = items; this.boxImgSrcFull = this.imgs[0].imgsrc; });
        this.galleryPic = [];
        this.galleryPic.push({ source: '../img/gallery/1.JPG' });
        this.galleryPic.push({ source: '../img/gallery/2.JPG' });
        this.galleryPic.push({ source: '../img/gallery/3.JPG' });
        this.galleryPic.push({ source: '../img/gallery/4.JPG' });

        let galleryImgs = document.getElementsByName('ui-panel-images');
    }

    onBtnSizeClick(elem: Element): void {
        let id = elem.id;
        let btns = this.boxSizeBtns.toArray()[0].nativeElement.children;
        for (let element of btns) {
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn')
            } else {
                if (element.id === id) {
                    element.classList.add('active_btn');
                    this.activeSizeBtb = element;
                    this.boxSize = Number(id.split('m')[0]);
                    this.boxSizeStr = this.boxSize === 1 ? this.boxSize + "м<sup>3</sup>" : this.boxSize + "м<sup>2</sup>";
                    this.boxSizeStrM = this.boxSize == 1 ? "3" : "2";
                }
            }
        }

        this.boxImgSrcFull = this.imgs.find(x => x.btnId === id).imgsrc;
        this.calculatePrice();
    }

    onBtnTermClick(elem: Element, days: number): void {
        let id = elem.id;
        let btns = this.termsBtns.toArray()[0].nativeElement.children;

        for (let element of btns) {
            if (element.classList.contains('active_btn') && element.id !== id) {
                element.classList.remove('active_btn')
            } else {
                if (element.id === id) {
                    element.classList.add('active_btn');
                    this.activeTermBtb = element;
                }
            }
        }

        this.daysCount = days;
        this.monthCount = Math.round(Number(this.daysCount / 30));


        this.calculatePrice();
    }

    onCapabilitiesMouseover(type): void {
        if (type === '1') {
            this.capabilitiesClass = 'office';
            this.colorExpLeft = "office_color";
            this.colorExpRight = "office_color";
        } else if (type === '2') {
            this.capabilitiesClass = 'home';
            this.colorExpLeft = "home_color";
            this.colorExpRight = "home_color";
        } else if (type === '3') {
            this.capabilitiesClass = '';
            this.colorExpLeft = "";
            this.colorExpRight = "";
        }
    }

    openBookingModal(): void {
        this.finalPrice = this.periodPay;
        this.termStr = this.monthCount ? this.monthCount + " міс" : "1 тиж";
    }

    calculatePrice(): void {
        if (this.boxSize > 1 && this.daysCount > 0) {
            let price;

            if (this.daysCount <= 60) {
                price = this.data.Less60;
            } else {
                price = this.data.More60;
            }

            this.periodPay = Math.round(price * this.boxSize * this.daysCount);

            if (this.daysCount <= 30) {
                this.monthPay = Math.round(price * this.boxSize * 30);
            } else {
                this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
            }
        } else if (this.boxSize == 1 && this.daysCount > 0) {
            var omeM3Price = (this.daysCount <= 60) ? this.data.More60 : this.data.Less60;
            this.periodPay = Math.round(Number(omeM3Price) * this.boxSize * this.daysCount);
            this.monthPay = Math.round(30 * this.periodPay / this.daysCount);
        }
        else {
            return;
        }

        let date = new Date(this.dateFrom);
        let newDate = (this.monthCount) ?
            date.setMonth(date.getMonth() + this.monthCount) :
            date.setDate(date.getDate() + 7);
        let dateTo = new Date(newDate);
        let fromMonth = this.dateFrom.getMonth() + Number(1);
        let toMonth = dateTo.getMonth() + Number(1);

        this.dateFromStr = this.dateFrom.getDate() + "/" +
            fromMonth + "/" + this.dateFrom.getFullYear();
        this.dateToStr = dateTo.getDate() + "/" +
            toMonth + "/" + dateTo.getFullYear();
    }

    collectBodyForEmail(): string {
        let emailBody = "";
        let date = new Date(this.dateFrom);
        let newDate = (this.monthCount) ?
            date.setMonth(date.getMonth() + this.monthCount) :
            date.setDate(date.getDate() + 7);
        let dateTo = new Date(newDate);
        let fromMonth = this.dateFrom.getMonth() + Number(1);
        let toMonth = dateTo.getMonth() + Number(1);

        this.dateFromStr = this.dateFrom.getDate() + "/" +
            fromMonth + "/" + this.dateFrom.getFullYear();
        this.dateToStr = dateTo.getDate() + "/" +
            toMonth + "/" + dateTo.getFullYear();

        emailBody = emailBody.concat("Ім'я:  <b>" + this.name + "</b>");
        emailBody = emailBody.concat("<br>Прізвище:  <b>" + this.surname + "</b>");
        emailBody = emailBody.concat("<br>Телефон:  <b>" + this.mobileNumber + "</b>");
        emailBody = emailBody.concat("<br>Email:  <b>" + this.email + "</b>");
        emailBody = emailBody.concat("<br>Коментар:  <b>" + this.comments + "</b>");
        emailBody = emailBody.concat("<h3>Замовлення:</h3>");
        emailBody = emailBody.concat("&nbsp;&nbsp;- Термін зберігання: <b>" + this.termStr + "</b>");
        emailBody = emailBody.concat("<br>&nbsp;&nbsp;- Починаючи з <b>[" +
            this.dateFromStr + "]</b>  до <b>[" + this.dateToStr + "]</b>");
        emailBody = emailBody.concat("<br>&nbsp;&nbsp;- Розмір боксу: <b>" + this.boxSizeStr + "</b>");
        emailBody = emailBody.concat("<h3>Ціна за місяць: <i>" + this.monthPay + " грн</i></h3>");
        emailBody = emailBody.concat("<h3>Ціна за весь період: <i>" + this.finalPrice + " грн</i></h3>");
        return emailBody;
    }

    sendMail(event: Event): boolean {
        let currentDate = new Date(Date.now());
        let url = "https://api.elasticemail.com/v2/email/send";
        let api = "8b7e033a-f008-4150-a23e-8f7a0bfc68e6";
        let to = "boxer.sklad@gmail.com";
        let from = "boxer@mail.com.ua";
        let subject = "Бронювання боксу [" +
            currentDate.getDate() + "/" + Number(currentDate.getMonth()) + Number(1) + "/" +
            currentDate.getFullYear() + "-" + currentDate.toTimeString().split(" GMT")[0] + "]";
        let bodyHtml = this.collectBodyForEmail();
        let isTransactional = true;
        let headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = new URLSearchParams();

        body.append('apikey', api);
        body.append('subject', subject);
        body.append('from', from);
        body.append('to', to);
        body.append('bodyHTML', bodyHtml);
        body.append('isTransactional', 'false');

        this.http.post(url, body, { headers: headers }).subscribe(resp => {
            if (resp.json().success) {
                document.getElementById("successModalBtn").click();
                this.resetVariables();
            } else {
                document.getElementById("errorModalBtn").click();
            }
        });
        return true;
    }
}
