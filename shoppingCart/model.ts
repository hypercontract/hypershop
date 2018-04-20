import { Entity, EntityId } from "../shared/store";
import { Product } from "../products/model";

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
