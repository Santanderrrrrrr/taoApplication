export interface ForProdLayout{

}

export type prodInterface = {
    prod: {
        _id: string,
        categoryId: {
            _id: string
            name: string
        },
        sizeId: {
            _id: string
            name: string
        },
        genderId: {
            _id: string
            name: string
        },
        sellerId: {
            _id: string
            username: string
            picture?: string
        },
        createdAt: string,
        description: string,
        brand: string,
        name: string,
        price: number,
        updatedAt: string,
        images: string[],
        likes?: string[]    
    }
}

export type theUser = {
    user:{
        _id?: string
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        telephone: string;
        followers: {
            type?: string | undefined;
        }[];
        following: {
            type?: string | undefined;
        }[];
        location?: string
        picture: string
        verified: boolean
        bio: string
    } | null
    
} 

export interface ForPositionedMenu{
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
    ouvrir: boolean
    anchorEl: null | HTMLElement
    prodId: string
}

export interface ForWarnModal{
    prodId: string
}

export interface ForUploadProd{
    accessToken: string,
    setAccessToken: React.Dispatch<React.SetStateAction<string>>,
    persId: string
}

export type changesKeys = {
    name: string;
    description: string;
    category: string;
    size: string;
    gender: string;
    price: number | undefined;
    brand: string | undefined;
}

export interface ForExploreSlider{
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>
    price: number | undefined
}
