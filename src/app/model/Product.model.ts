export class Product {
    constructor(
        public id: number,
        public categoryId: number,
        public name:string,
        public description:string,
        public manufacturer: string,
        public price: number,
        public stockquantity: number,
        public imageUrls: string[]
         )
    {}
}