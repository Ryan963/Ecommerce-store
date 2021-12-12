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
        setProductsInit();
    }, [])

    const setProductsInit = () => {
        setProducts(prevProduct=> {
            let tempProducts = [];
            storeProducts.forEach(item => {
                const singleItem = {...item};
                tempProducts = [...tempProducts, singleItem];
            })
            return tempProducts
        })
    }
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
        
    }
    useEffect(() => {
        addTotals()
    }, [cart])

    const openModal = id => {
        const product = getItem(id);
        setModalProduct(product);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);

    }
    const increment = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count++;
        product.total = product.count * product.price;
        setCart([...tempCart]);

    }
    const decrement = id => {
        let tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count--;
        product.total = product.count * product.price;
        if (product.count === 0){
            removeItem(id);
        }
        else {
            setCart([...tempCart]);
        }
    }
    const removeItem = (id) => {
        let tempProducts = [...products]
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index]
        product.inCart = false;
        product.count = 0;
        product.total = 0;
        setCart(oldCart => {
            return oldCart.filter(item => item.id != id)
        })
        setProducts([...tempProducts])
    }
    
    const clearCart = () => {
        setCart([]);
        setProductsInit();
        addTotals();

    }

    const addTotals = () => {
        let subTotal = 0;
        cart.map(item => {
            subTotal += item.total
        })
        const tempTax = subTotal * 0.05;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setCartSubTotal(subTotal);
        setCartTax(tax);
        setCartTotal(total);
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
               modalProduct,
               increment,
               decrement,
               clearCart,
               removeItem,
               cart,
               cartSubTotal,
               cartTax,
               cartTotal
            }}>
            {props.children}
        </ProductContext.Provider>
    )
}
  const ProductConsumer = ProductContext.Consumer;

  export {ProductProvider, ProductConsumer}