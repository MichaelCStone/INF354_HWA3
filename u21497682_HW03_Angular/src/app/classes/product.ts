export class Product {
    productId! : number;
    price!:number;
    image! :string;
    brandId! :number;
    productTypeId! :number;
    productType : ProductType = new ProductType();
    brand : Brand = new Brand();
}

export class Brand {
    brandId! : number;
    name!:string
    decription!:string
    dateCreated!: Date
    dateModified!:Date 
    isActive!:boolean
    isDeleted!:boolean
}

export class ProductType {
    productTypeId! : number;
    name!:string
    description!:string
    dateCreated!: Date
    dateModified!:Date 
    isActive!:boolean
    isDeleted!:boolean
}