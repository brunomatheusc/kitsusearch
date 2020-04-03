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

    constructor(
        private route: ActivatedRoute, 
        private appService: AppService
    ) { }

    ngOnInit() {
        this.characterId = this.route.snapshot.params.id;
        this.getCharacterInfo();
    }

    async getCharacterInfo() {
        const response = await this.appService.getCharacterById(this.characterId);
        this.character = setCharacter(response);

        this.character.description = response.attributes.description;

        const medias = await this.appService.getMedias('https://kitsu.io/api/edge/media-characters/111275/media');

        const { id, type, attributes } = medias.data;
        const { titles, createdAt, updatedAt, synopsis, startDate, posterImage, endDate, status, chapterCount, volumeCount } = attributes;
       
        let attr: Attributes = new Attributes(
            titles.en != null ?  titles.en : titles.en_jp, 
            synopsis, startDate, endDate, status, posterImage.original,
            chapterCount, volumeCount, createdAt, updatedAt
        );

        this.detail = new Detail(id, type, attr);

        console.log(medias.data);
        console.log(this.detail);
        console.log(this.character);
    }
}
