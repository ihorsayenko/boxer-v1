import { NgModule, Component, OnInit } from '@angular/core';

import { CommonService } from './common.service'
import { PackageModel } from './package.model'

@Component({
    moduleId: module.id,
    selector: 'gallery',
    templateUrl: '../package-gallery.html'
})

export class PackageGalleryComponent implements OnInit {

    boxes: PackageModel[];
    locksAndShelves: PackageModel[];
    packages: PackageModel[];
    others: PackageModel[];

    constructor(private common: CommonService) {
        
    }
    ngOnInit(): void {
        this.common.getPackageBoxes().then(i => { this.boxes = i;});
        this.common.getPackageLocksAndShelves().then(i => { this.locksAndShelves = i; });
        this.common.getPackagePackages().then(i => { this.packages = i;});
        this.common.getPackageOthers().then(i => { this.others = i;});
    }
}