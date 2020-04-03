import { Component, OnInit } from '@angular/core';
import { AppService } from './../shared/services/app.service';
import { ApiService } from './../shared/services/api.service';
import { Character } from './../shared/object/character';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public characters: Character[] = [];
    public filteredCharacters: Character[] = [];
    public search: string;
    
    constructor(
        public appService: AppService, 
        public apiService: ApiService,
    ) { }

    ngOnInit() {
        this.search = '';
        this.getCharacters();
    }
    
    // Função assíncrona para realizar a consulta
    async getCharacters() {
        // Faz a consulta na API
        const response = await this.appService.getCharacters();
        console.log(response);

        // Percorre os resultados para criar o objeto resposta
        this.characters = response.map(r => {
            // Cria um objeto
            let character: Character = new Character();

            // Usando a desestruturação para pegar as propriedas
            const { id, attributes, relationships } = r;    
            const { name, description, image } = attributes;

            // Seta os dados do objeto
            character.id = id;
            character.name = name;
            character.description = `${description.substring(0, 180)}...`;
            character.image = image.original;
            character.media = relationships.mediaCharacters.links.related;
    
            return character;
        });

        // Copia os elementos do array original para um array de filtro
        this.filteredCharacters = this.characters.slice(0, 1);
    }

    handleOnTyping() {
        const searched = this.search.toLowerCase();

        if (this.search == '') {
            this.filteredCharacters = this.characters;
            return;
        }

        this.filteredCharacters = this.characters.filter(f => {
            return f.name.toLowerCase().includes(searched);
        });

        console.log(this.search);
    }
}
