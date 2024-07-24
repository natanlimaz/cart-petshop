import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';

import { BsCartPlus } from 'react-icons/bs';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export type ProductProps = {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
}

export function Home() {

    const [products, setProducts] = useState<ProductProps[]>([]);
    const { addItemCart } = useContext(CartContext);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get("/products")
            setProducts(response.data);
        }

        loadProducts();
    }, []); 

    function handleAddItemCart(product: ProductProps) {
        toast.success("Produto adicionado no carrinho!", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF",
                marginTop: 42
            }
        })
        addItemCart(product);
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto mb-5">
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products.map((product) => (
                        <section className="w-full" key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <img
                                    className="w-full rounded-lg max-h-70 mb-2 cursor-pointer transition-transform duration-300 transform hover:scale-105"
                                    src={product.cover}
                                    alt={product.title}
                            />
                            </Link>

                            <p className="font-medium mt-1 mb-2">{product.title}</p>

                            <div className="flex gap-3 items-center">
                                <strong className="text-zinc-700/90">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </strong>
                                <button onClick={ () => handleAddItemCart(product) } className="bg-zinc-900 p-1 rounded">
                                    <BsCartPlus size={20} color="#FFF"/>
                                </button>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}