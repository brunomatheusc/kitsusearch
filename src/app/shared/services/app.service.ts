import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AxiosInstance, AxiosResponse } from 'axios';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    constructor(private apiService: ApiService){}

    async getCharacters() {
        const response = await this.apiService.api.get('/characters');

        return response.data.data;
    }
    
    async getCharacterById(characterId: string) {        
        const response = await this.apiService.api.get(`/characters/${characterId}`);
    
        return response.data.data;
    }

    async getMedias(related: string) {
        this.apiService.api.defaults.baseURL = related;
        const response = await this.apiService.api.get('');

        return response.data;
    }
}