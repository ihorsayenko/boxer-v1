import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/Operator/toPromise';

import { CommonModal } from './common.model'
import { PackageModel } from './package.model'
import { Observable } from "rxjs/Observable";

@Injectable()
export class CommonService {
    private storageFileUrl = '../storage/db.json';

    constructor(private http: Http) { }

    getData(): Promise<CommonModal> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getBoxImgs(): Promise<JSON> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(resp => { return resp.json().BoxImgs })
            .catch(this.handleError);
    }

    getPackageBoxes(): Promise<PackageModel[]> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(resp => {return resp.json().PackageMaterials.Boxes as PackageModel[]})
            .catch(this.handleError);
    }
    
    getPackageLocksAndShelves(): Promise<PackageModel[]> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(resp => { return resp.json().PackageMaterials.LocksAndShelves as PackageModel[]})
            .catch(this.handleError);
    }

    getPackagePackages(): Promise<PackageModel[]> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(resp => { return resp.json().PackageMaterials.Packages as PackageModel[]})
            .catch(this.handleError);
    }

    getPackageOthers(): Promise<PackageModel[]> {
        return this.http.get(this.storageFileUrl)
            .toPromise()
            .then(resp => { return resp.json().PackageMaterials.Others as PackageModel[]})
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();

        return body as CommonModal;
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}