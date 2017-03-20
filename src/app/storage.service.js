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
var StorageService = (function () {
    function StorageService() {
        this.Imgs = [{ 'btnId': '1m_btn', 'imgsrc': '../img/Boxes/1m.png' },
            { 'btnId': '2.5m_btn', 'imgsrc': '../img/Boxes/2,5m.png' },
            { 'btnId': '3m_btn', 'imgsrc': '../img/Boxes/3m.png' },
            { 'btnId': '4m_btn', 'imgsrc': '../img/Boxes/4m.png' },
            { 'btnId': '5m_btn', 'imgsrc': '../img/Boxes/5m.png' },
            { 'btnId': '6m_btn', 'imgsrc': '../img/Boxes/6m.png' },
            { 'btnId': '7m_btn', 'imgsrc': '../img/Boxes/7m.png' },
            { 'btnId': '12m_btn', 'imgsrc': '../img/Boxes/12m.png' }];
    }
    StorageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StorageService);
    return StorageService;
}());
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map