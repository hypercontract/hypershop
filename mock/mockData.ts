import * as faker from 'faker';
import { random, sample, times, toNumber } from 'lodash';
import * as orderService from '../orders/service';
import { productStore } from '../products/store';
import * as shoppingCartService from '../shoppingCart/service';
import { addressStore } from '../userProfile/addresses/store';
import { paymentOptionStore } from '../userProfile/paymentOptions/store';
import { EntityId } from '../shared/store';
import { ShoppingCart } from '../shoppingCart/model';
import { OrderStatus } from '../orders/model';

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

export function create() {
    const addresses = times(3, () => generateAddress());
    const paymentOptions = times(2, () => generatePaymentOption());
    const products = times(100, () => generateProduct());

    return Promise.all([
        productStore.bulkInsert(products),
        addressStore.bulkInsert(addresses),
        paymentOptionStore.bulkInsert(paymentOptions)
    ])
        .then(([productIds, addressIds, paymentOptionIds]) => repeatInSequence(
            20,
            () => createShoppingCart(productIds)
                .then(shoppingCart => createOrder(shoppingCart, addressIds, paymentOptionIds))
        ));
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
        price: toNumber(random(0.20, 90).toFixed(2)),
        image: faker.image.food() + '?' + faker.random.uuid()
    };
}

function createShoppingCart(productIds: EntityId[]) {
    return Promise.all(
        times(
            random(1, 3),
            () => createShoppingCartItem(productIds)
        )
    )
        .then(() => shoppingCartService.getShoppingCart());
}

function createShoppingCartItem(productIds: EntityId[]) {
    return shoppingCartService.addShoppingCartItem(
        sample(productIds)!,
        random(1, 5)
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