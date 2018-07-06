import { Entity } from '../store/model';

export interface Product extends Entity {
    name: string;
    description: string;
    price: number;
    image: string;
}
