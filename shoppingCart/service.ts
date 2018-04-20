import { isNull } from 'lodash';
import { shoppingCartItemStore } from './store';
import * as productService from '../products/service';
import { EntityId } from '../shared/store';
import { Product } from '../products/model';
import { ShoppingCartItem } from './model';

export function getShoppingCart() {
    return shoppingCartItemStore.find()
        .then(shoppingCartItems => {
            return {
                items: shoppingCartItems,
                totalPrice: getTotalPrice(shoppingCartItems)
            };
        });
}

export function getShoppingCartItem(id: EntityId) {
    return shoppingCartItemStore.findOne(id);
}

export function addShoppingCartItem(productId: EntityId, quantity: number) {
    return Promise.all([
        productService.getProduct(productId),
        getShoppingCartItemByProductId(productId)
    ])
        .then(([product, shoppingCartItem]) => {
            if (isNull(shoppingCartItem)) {
                return createShoppingCartItem(product, quantity);
            } else {
                return updateShoppingCartItemQuantity(
                    shoppingCartItem!._id!,
                    shoppingCartItem!.quantity + quantity
                )
                    .then(() => shoppingCartItem._id)
            }
        });
}

export function deleteShoppingCartItem(id: EntityId) {
    return shoppingCartItemStore.remove(id);
}

export function emptyShoppingCart() {
    return shoppingCartItemStore.removeAll();
}

export function updateShoppingCartItemQuantity(id: EntityId, quantity: number) {
    return shoppingCartItemStore.update(
        id,
        { quantity }
    );
}

function createShoppingCartItem(product: Product, quantity: number) {
    return shoppingCartItemStore.insert({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: quantity,
        product: product._id!
    });
}

function getShoppingCartItemByProductId(productId: EntityId) {
    return shoppingCartItemStore.find({
        product: productId
    })
        .then(shoppingCartItems => shoppingCartItems.length > 0 ? shoppingCartItems[0] : null);
}

function getTotalPrice(shoppingCartItems: ShoppingCartItem[]) {
    return shoppingCartItems.reduce(
        (sum, item) => (sum + (item.price * item.quantity)),
        0
    );
}
