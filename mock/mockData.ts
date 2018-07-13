import * as faker from 'faker';
import { random, sample, times } from 'lodash';
import { OrderStatus } from '../orders/model';
import * as orderService from '../orders/service';
import { getProductStore } from '../products/store';
import { ShoppingCart } from '../shoppingCart/model';
import * as shoppingCartService from '../shoppingCart/service';
import { EntityId } from '../store/model';
import { getAddressStore } from '../userProfile/addresses/store';
import { getPaymentOptionStore } from '../userProfile/paymentOptions/store';

const orderStatusValues = [
    OrderStatus.Cancelled,
    OrderStatus.Delivered,
    OrderStatus.InTransit,
    OrderStatus.PaymentDue,
    OrderStatus.PickupAvailable,
    OrderStatus.Problem,
    OrderStatus.Processing,
    OrderStatus.Returned
];

const addressCount = 3;
const paymentOptionCount = 2;
const productCount = 100;
const orderCount = 100;
const minItemCount = 1;
const maxItemCount = 3;
const minItemQty = 1;
const maxItemQty = 5;

export function create() {
    const addresses = times(addressCount, () => generateAddress());
    const paymentOptions = times(paymentOptionCount, () => generatePaymentOption());
    const products = times(productCount, () => generateProduct());

    return Promise.all([
        getProductStore(),
        getAddressStore(),
        getPaymentOptionStore()
    ])
        .then(([productStore, addressStore, paymentOptionStore]) => {
            return Promise.all([
                productStore.bulkInsert(products),
                addressStore.bulkInsert(addresses),
                paymentOptionStore.bulkInsert(paymentOptions)
            ])
                .then(([productIds, addressIds, paymentOptionIds]) => repeatInSequence(
                    orderCount,
                    () => createShoppingCart(productIds)
                        .then(shoppingCart => createOrder(shoppingCart, addressIds, paymentOptionIds))
                ));
        });
}

function generateAddress() {
    return {
        name: faker.name.findName(),
        street: faker.address.streetAddress(),
        zipCode: faker.address.zipCode(),
        city: faker.address.city(),
        country: faker.address.country()
    };
}


function generatePaymentOption() {
    return {
        accountOwner: faker.name.findName(),
        iban: faker.finance.iban(),
        bic: faker.finance.bic()
    };
}

function generateProduct() {
    return {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.random.number({ min: 0.01, max: 99.99, precision: 0.01 }),
        image: `${faker.image.food()}?${faker.random.uuid()}`
    };
}

function createShoppingCart(productIds: EntityId[]) {
    return Promise.all(
        times(
            random(minItemCount, maxItemCount),
            () => createShoppingCartItem(productIds)
        )
    )
        .then(() => shoppingCartService.getShoppingCart());
}

function createShoppingCartItem(productIds: EntityId[]) {
    return shoppingCartService.addShoppingCartItem(
        sample(productIds)!,
        random(minItemQty, maxItemQty)
    );
}

function createOrder(shoppingCart: ShoppingCart, addressIds: EntityId[], paymentOptionIds: EntityId[]) {
    return orderService.createOrder({
        items: shoppingCart.items.map(item => item._id!),
        billingAddress: sample(addressIds)!,
        shippingAddress: sample(addressIds)!,
        payment: sample(paymentOptionIds)!
    })
        .then(orderId => orderService.updateOrderStatus(
            orderId,
            sample(orderStatusValues)!
        ));
}

function repeatInSequence(numberOfRepetitions: number, promiseFn: () => void) {
    return times(
        numberOfRepetitions,
        () => promiseFn
    )
        .reduce(
            (previousPromise, generateOrderFn) => previousPromise.then(generateOrderFn),
            Promise.resolve()
        );
}
