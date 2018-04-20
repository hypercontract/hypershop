import { defaultTo } from 'lodash';
import { productStore } from './store';
import { EntityId } from '../shared/store';

export function findProducts(query: string) {
    return productStore.find(getQueryMatcher(query));
}

export function getProduct(id: EntityId) {
    return productStore.findOne(id);
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
