import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    public api: AxiosInstance; 

    constructor() {        
        this.api = axios.create({
            baseURL: environment.apiURL,
        });
    }
}
