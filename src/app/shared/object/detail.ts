export class Detail {    
    constructor(
        public id: string,
        public type: string,
        public attributes: Attributes        
    ) {}
}

export class Attributes {
    constructor(
        public title: string,
        public synopsis: string,
        public startDate: Date,
        public endDate: Date,
        public status: string,
        public image: string,
        public cratedAt: Date,
        public updatedAt: Date,
    ) {}
}