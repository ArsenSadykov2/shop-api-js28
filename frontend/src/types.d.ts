export interface Category {
    _id: string;
    title: string;
    description: string | null;
}

export interface Product {
    _id: string;
    category: Category;
    title: string;
    description: string | null;
    price: number;
    image?: string | null;
}

export interface ProductMutation {
    category: string;
    title: string;
    description: string;
    price: number;
    image: File | null;
}