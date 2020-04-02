import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    public api: AxiosInstance; 

    constructor() {        
        this.api = axios.create({
            baseURL: 'https://kitsu.io/api/edge',
        });
    }
}
