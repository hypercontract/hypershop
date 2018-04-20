import { Entity } from "../shared/store";

export interface Product extends Entity {
    name: string;
    description: string;
    price: number;
    image: string;
}