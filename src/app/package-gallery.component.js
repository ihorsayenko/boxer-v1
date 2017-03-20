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
var common_service_1 = require('./common.service');
var PackageGalleryComponent = (function () {
    function PackageGalleryComponent(common) {
        this.common = common;
    }
    PackageGalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.common.getPackageBoxes().then(function (i) { _this.boxes = i; });
        this.common.getPackageLocksAndShelves().then(function (i) { _this.locksAndShelves = i; });
        this.common.getPackagePackages().then(function (i) { _this.packages = i; });
        this.common.getPackageOthers().then(function (i) { _this.others = i; });
    };
    PackageGalleryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallery',
            templateUrl: '../package-gallery.html'
        }), 
        __metadata('design:paramtypes', [common_service_1.CommonService])
    ], PackageGalleryComponent);
    return PackageGalleryComponent;
}());
exports.PackageGalleryComponent = PackageGalleryComponent;
//# sourceMappingURL=package-gallery.component.js.map