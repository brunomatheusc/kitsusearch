import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    constructor(private apiService: ApiService){}

    async getCharacters(page: number, limit: number) {
        return (await this.apiService.api.get(`characters?page[limit]=${limit}&page[offset]=${(page - 1) * 10}`)).data;
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