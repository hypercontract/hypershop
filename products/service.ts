import { defaultTo } from 'lodash';
import { EntityId } from '../shared/store';
import { getProductStore } from './store';

export function findProducts(query: string) {
    return getProductStore()
        .then(productStore => productStore.find(getQueryMatcher(query)));
}

export function getProduct(id: EntityId) {
    return getProductStore()
        .then(productStore => productStore.findOne(id));
}

function getQueryMatcher(rawQuery: string) {
    const query = defaultTo(rawQuery, '').toLowerCase();

    return {
        $where: function (): boolean {
            return (
                // @ts-ignore
                this['name'].toLowerCase().indexOf(query) > -1 ||
                // @ts-ignore
                this['description'].toLowerCase().indexOf(query) > -1
            );
        }
    }
}
