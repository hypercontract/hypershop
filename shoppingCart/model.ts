import { Entity, EntityId } from "../store/model";

export interface ShoppingCart {
    items: ShoppingCartItem[];
}

export interface ShoppingCartItem extends Entity {
    name: string;
    description: string;
    price: number;
    quantity: number;
    product: EntityId;
}
