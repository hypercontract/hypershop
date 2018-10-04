import * as rootUris from '../root/uris';
import { shop } from './namespaces';

export const profile = {
    '@graph': [
        {
            '@id': rootUris.getRootUri(),
            '@type': [
                'hyper:EntryPoint',
                shop('ApiRoot')
            ],
            'hyper:defaultMediaType': [
                {
                    '@value': 'application/ld+json'
                },
                {
                    '@value': 'application/hal+json'
                },
                {
                    '@value': 'application/json'
                },
                {
                    '@value': 'text/html'
                }
            ]
        },
        {
            '@id': shop('ApiRoot'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('AdditionToShoppingCart'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('CatalogSearchQuery'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('Address'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('LineItem'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('Order'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('Orders'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('PaymentOption'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('Product'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('Products'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('QuantityUpdate'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('ShoppingCart'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('UserProfile'),
            '@type': [
                'owl:Class'
            ]
        },
        {
            '@id': shop('accountOwner'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('PaymentOption')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('addToShoppingCart'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'hyper:expectedType': [
                {
                    '@id': shop('AdditionToShoppingCart')
                }
            ],
            'hyper:method': [
                {
                    '@value': 'POST'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('ShoppingCart')
                }
            ]
        },
        {
            '@id': shop('address'),
            '@type': [
                'owl:ObjectProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('UserProfile')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Address')
                }
            ]
        },
        {
            '@id': shop('bic'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('PaymentOption')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('billingAddress'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Address')
                }
            ]
        },
        {
            '@id': shop('cancel'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'hyper:method': [
                {
                    '@value': 'DELETE'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('Order')
                }
            ]
        },
        {
            '@id': shop('city'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Address')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('country'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Address')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('date'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:dateTime'
                }
            ]
        },
        {
            '@id': shop('description'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('LineItem')
                },
                {
                    '@id': shop('Product')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('iban'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('PaymentOption')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('image'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Product')
                }
            ]
        },
        {
            '@id': shop('items'),
            '@type': [
                'owl:ObjectProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                },
                {
                    '@id': shop('ShoppingCart')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('LineItem')
                }
            ]
        },
        {
            '@id': shop('name'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('LineItem')
                },
                {
                    '@id': shop('Product')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('OrderStatus'),
            '@type': [
                'rdfs:Datatype'
            ],
            'owl:equivalentClass': [
                {
                    '@type': [
                        'rdfs:Datatype'
                    ],
                    'owl:oneOf': [
                        {
                            '@list': [
                                {
                                    '@value': 'Cancelled'
                                },
                                {
                                    '@value': 'Delivered'
                                },
                                {
                                    '@value': 'InTransit'
                                },
                                {
                                    '@value': 'PaymentDue'
                                },
                                {
                                    '@value': 'PickupAvailable'
                                },
                                {
                                    '@value': 'Problem'
                                },
                                {
                                    '@value': 'Processing'
                                },
                                {
                                    '@value': 'Returned'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            '@id': shop('orders'),
            '@type': [
                'owl:ObjectProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Orders')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Order')
                }
            ]
        },
        {
            '@id': shop('payment'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('PaymentOption')
                }
            ]
        },
        {
            '@id': shop('paymentOption'),
            '@type': [
                'owl:ObjectProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('UserProfile')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('PaymentOption')
                }
            ]
        },
        {
            '@id': shop('placeOrder'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'hyper:expectedType': [
                {
                    '@id': shop('Order')
                }
            ],
            'hyper:method': [
                {
                    '@value': 'POST'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('Order')
                }
            ]
        },
        {
            '@id': shop('price'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('LineItem')
                },
                {
                    '@id': shop('Product')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:decimal'
                }
            ]
        },
        {
            '@id': shop('product'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('AdditionToShoppingCart')
                },
                {
                    '@id': shop('LineItem')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Product')
                }
            ]
        },
        {
            '@id': shop('products'),
            '@type': [
                'owl:ObjectProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Products')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Product')
                }
            ]
        },
        {
            '@id': shop('quantity'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('AdditionToShoppingCart')
                },
                {
                    '@id': shop('LineItem')
                },
                {
                    '@id': shop('QuantityUpdate')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:integer'
                }
            ]
        },
        {
            '@id': shop('query'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('CatalogSearchQuery')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('remove'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'hyper:method': [
                {
                    '@value': 'DELETE'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('ShoppingCart')
                }
            ]
        },
        {
            '@id': shop('shippingAddress'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Address')
                }
            ]
        },
        {
            '@id': shop('status'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'owl:DatatypeProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Order')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('OrderStatus')
                }
            ]
        },
        {
            '@id': shop('street'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Address')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('totalPrice'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ShoppingCart')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:decimal'
                }
            ]
        },
        {
            '@id': shop('updateQuantity'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'hyper:expectedType': [
                {
                    '@id': shop('QuantityUpdate')
                }
            ],
            'hyper:method': [
                {
                    '@value': 'PATCH'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('ShoppingCart')
                }
            ]
        },
        {
            '@id': shop('zipCode'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('Address')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        },
        {
            '@id': shop('searchCatalog'),
            '@type': [
                'owl:ObjectProperty',
                'owl:FunctionalProperty',
                'hyper:Operation'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ApiRoot')
                }
            ],
            'hyper:expectedType': [
                {
                    '@id': shop('CatalogSearchQuery')
                }
            ],
            'hyper:method': [
                {
                    '@value': 'GET'
                }
            ],
            'hyper:returnedType': [
                {
                    '@id': shop('Products')
                }
            ]
        },
        {
            '@id': shop('shoppingCart'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ApiRoot')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('ShoppingCart')
                }
            ]
        },
        {
            '@id': shop('orderList'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ApiRoot')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('Orders')
                }
            ]
        },
        {
            '@id': shop('userProfile'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ApiRoot')
                }
            ],
            'rdfs:range': [
                {
                    '@id': shop('UserProfile')
                }
            ]
        },
        {
            '@id': shop('version'),
            '@type': [
                'owl:DatatypeProperty',
                'owl:FunctionalProperty'
            ],
            'rdfs:domain': [
                {
                    '@id': shop('ApiRoot')
                }
            ],
            'rdfs:range': [
                {
                    '@id': 'xsd:string'
                }
            ]
        }
    ]
};
