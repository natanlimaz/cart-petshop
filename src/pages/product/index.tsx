import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import { ProductProps } from '../home';
import { CartContext } from '../../contexts/CartContext';
import { BsCartPlus } from 'react-icons/bs';
import toast from 'react-hot-toast'

export function Product() {

    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps>();
    const { addItemCart } = useContext(CartContext); 
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }
        
        loadProduct();
    }, [id]);

    function handleAddItemCartAndNavigate(product: ProductProps) {
        toast.success("Produto adicionado no carrinho!", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF",
                marginTop: 42
            }
        })
        addItemCart(product);
        navigate("/cart");
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 mx-auto my-6">
                {product && (
                    <section className="w-full p-8">
                        <div className="flex flex-col lg:flex-row">
                            <img 
                                className="flex-1 w-full max-h-72 object-contain"
                                src={product.cover}
                                alt={product.title}
                            />

                            <div className="flex-1">
                                <p className="font-bold text-2xl mb-2 mt-4">{product.title}</p>
                                <p className="my-4">{product.description}</p>

                                <div className="flex gap-3 items-center">
                                    <strong className="text-zinc-700/90 text-xl">
                                        {product?.price.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL"         
                                        })}
                                    </strong>
                                    <button 
                                        className="bg-zinc-900 p-1 rounded"
                                        onClick={ () => handleAddItemCartAndNavigate(product)}
                                    >
                                        <BsCartPlus size={20} color="#FFF"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}