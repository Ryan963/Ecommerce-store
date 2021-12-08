import React, { useState, useEffect } from 'react'
import Product from './components/Product';
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext()
// provider

// Consumer
function ProductProvider(props) {
    const [products, setProducts] = useState([]);
    const [detailProducts, setDetailProducts] = useState(detailProduct);
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(detailProduct)
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        setProducts(prevProduct=> {
            let tempProducts = [];
            storeProducts.forEach(item => {
                const singleItem = {...item};
                tempProducts = [...tempProducts, singleItem];
            })
            return tempProducts
        })
    }, [])

    const getItem = id => {
        const product = products.find(item => item.id === id);
        return product;
    } 
    const handleDetail = (id) => {
        const product = getItem(id)
        setDetailProducts(oldProducts => {
            return product
        })
    }
    const addToCart = (id) => {
        let tempProducts = [...products]
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index]
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        setCart(oldCart => {
            return [...oldCart, product]
        })
        console.log(products, detailProducts, cart)
    }
    const openModal = id => {
        const product = getItem(id);
        setModalProduct(product);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);

    }
    
    return (
        <ProductContext.Provider value={{
            products,
             detailProducts,
              handleDetail,
               addToCart,
               modalOpen,
               closeModal,
               openModal,
               modalProduct
            }}>
            {props.children}
        </ProductContext.Provider>
    )
}
  const ProductConsumer = ProductContext.Consumer;

  export {ProductProvider, ProductConsumer}