import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from './../shared/services/app.service';
import { Detail, Attributes } from './../shared/object/detail';
import { Character } from './../shared/object/character';
import { setCharacter } from './../shared/util';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    private characterId: string = '';
    public character: Character = new Character();
    public detail: Detail = new Detail('', '', null);
    public loading: boolean;

    constructor(
        private route: ActivatedRoute, 
        private appService: AppService
    ) { }

    async ngOnInit() {
        this.characterId = this.route.snapshot.params.id;
        this.loading = true;
        await this.getCharacterInfo();
    }

    async getCharacterInfo() {
        const response = await this.appService.getCharacterById(this.characterId);
        this.character = setCharacter(response);

        this.character.description = response.attributes.description;

        const mediaCharacters = (await this.appService.getMedias(response.relationships.mediaCharacters.links.related)).data[0];

        const medias = await this.appService.getMedias(mediaCharacters.relationships.media.links.related);

        const { id, type, attributes } = medias.data;
        const { titles, createdAt, updatedAt, synopsis, startDate, posterImage, endDate, status } = attributes;

        let attr: Attributes = new Attributes(
            titles.en != null ?  titles.en : titles.en_jp, 
            synopsis, startDate, endDate, status, posterImage.original, createdAt, updatedAt
        );

        this.detail = new Detail(id, type, attr);
        this.loading = false;
    }
}
