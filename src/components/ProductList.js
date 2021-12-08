import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import { storeProducts } from '../data'
import { ProductConsumer } from '../Context'
export default class ProductList extends Component {
    state = {
        products: storeProducts
    }
    render() {
        return (
            <>
                <div className="py-5" >
                    <div className="container">
                        <Title name="our" title="products"/>
                        <div className="row">
                            <ProductConsumer>
                                {value=>{
                                    console.log(value)
                                    return value.products.map(product => {
                                        console.log(product)
                                        return <Product key={product.id} product={product}/>
                                    });
                                }}
                            </ProductConsumer>
                        </div>
                            
                    </div>
                </div>
            </>
        )
    }
}
