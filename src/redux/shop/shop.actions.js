import ShopActionTypes from './shop.types';

export const updateCollections = collectionsMap => ({
    type: ShopActionTypes.UDPATE_COLLECTIONS,
    payload: collectionsMap
});