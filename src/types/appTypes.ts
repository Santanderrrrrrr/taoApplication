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
        },
        createdAt: string,
        description: string,
        inventory: number,
        name: string,
        price: number,
        updatedAt: string,
        images: string[],
        likes?: string[]    
    }
}

export type theUser = {
    user:{
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