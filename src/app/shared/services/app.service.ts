import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    constructor(private apiService: ApiService){}

    async getAnimes() {
        const response = await this.apiService.api.get('/anime');

        return response.data.data;
    }

    async getCharacters() {
        const response = await this.apiService.api.get('/characters');

        return response.data.data;
    }
}