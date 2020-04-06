import { Component, OnInit } from '@angular/core';
import { AppService } from './../shared/services/app.service';
import { ApiService } from './../shared/services/api.service';
import { Character } from './../shared/object/character';
import { setCharacter, calculateMaxPage } from './../shared/util';
import { Filter } from './../shared/object/filter';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    public faCaretLeft = faCaretLeft;
    public faCaretRight = faCaretRight;
    public characters: Character[] = [];
    public filteredCharacters: Character[] = [];
    public search: string;
    public loading: boolean;
    public filter: Filter;
    public page: number = 1;
    public pages: number = 5;
    public listItems: number;
    
    constructor(
        public appService: AppService, 
        public apiService: ApiService,
    ) { }

    async ngOnInit() {
        this.search = '';
        this.loading = true;
        this.listItems = (window.innerWidth < 540) ? 3 : 5;
        this.pages = this.listItems;
        await this.getCharacters();
    }
    
    // Função assíncrona para realizar a consulta
    async getCharacters() {
        let { limit } = environment.filter;
        // Faz a consulta na API passando a página atual e a quantidade de dados por página
        const response = await this.appService.getCharacters(this.page, limit);
        const { count } = response.meta;

        this.filter = new Filter(
            count, 
            this.page,
            (Number)(calculateMaxPage(10, count).toFixed(0))
        );

        // Percorre os resultados para criar o objeto resposta
        this.characters = response.data.map(res => {
            return setCharacter(res);
        });

        // Copia os elementos do array original para um array de filtro
        this.filteredCharacters = this.characters;
        this.loading = false;
    }

    handleOnTyping() {
        this.loading = true;
        const searched = this.search.toLowerCase();

        // Valida se foi digitado algo.
        if (this.search == '') {
            this.filteredCharacters = this.characters;
            return;
        }

        // Filtra os elementos do array de acordo com o que foi digitado
        this.filteredCharacters = this.characters.filter(f => {
            return f.name.toLowerCase().includes(searched);
        });

        this.loading = false;
    }

    setPages(page: number) {
        this.getCharacters();

        if (page + this.listItems < this.filter.maxPage){
            this.pages = page + this.listItems;
        }
    }

    handlePagination(page: number) {
        this.page = page + 1;
        this.setPages(page);
    }

    handlePreviousPage() {
        if (this.page - 1 <= 0) {
            return;
        } 
        
        this.page -= 1;
        this.setPages(this.page - 1);
    }
    
    handleNextPage() {
        if (this.page + 1 == this.filter.maxPage) {
            return;
        }
        
        this.page += 1;
        this.setPages(this.page - 1);
    }

    counter(start: number) {
        let res = [];

        for (let i = start - this.listItems; i < start; i++) {
            res.push(i);
        }

        return res;
    }
}
