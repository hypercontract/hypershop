import { isNull } from 'lodash';
import { Product } from '../products/model';
import * as productService from '../products/service';
import { EntityId } from '../store/model';
import { ShoppingCartItem } from './model';
import { getShoppingCartItemStore } from './store';

export function getShoppingCart() {
    return getShoppingCartItemStore()
    .then(shoppingCartItemStore => shoppingCartItemStore.find())
    .then(shoppingCartItems => {
        return {
            items: shoppingCartItems,
            totalPrice: getTotalPrice(shoppingCartItems)
        };
    });
}

export function getShoppingCartItem(id: EntityId) {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.findOne(id));
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
                    .then(() => shoppingCartItem._id);
            }
        });
}

export function deleteShoppingCartItem(id: EntityId) {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.remove(id));
}

export function emptyShoppingCart() {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.removeAll());
}

export function updateShoppingCartItemQuantity(id: EntityId, quantity: number) {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.update(
            id,
            { quantity }
        ));
}

function createShoppingCartItem(product: Product, quantity: number) {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.insert({
            name: product.name,
            description: product.description,
            price: product.price,
            // tslint:disable-next-line:object-literal-shorthand
            quantity: quantity,
            product: product._id!
        }));
}

function getShoppingCartItemByProductId(productId: EntityId) {
    return getShoppingCartItemStore()
        .then(shoppingCartItemStore => shoppingCartItemStore.find({
            product: productId
        }))
        .then(shoppingCartItems => shoppingCartItems.length > 0 ? shoppingCartItems[0] : null);
}

function getTotalPrice(shoppingCartItems: ShoppingCartItem[]) {
    return shoppingCartItems.reduce(
        (sum, item) => (sum + (item.price * item.quantity)),
        0
    );
}
