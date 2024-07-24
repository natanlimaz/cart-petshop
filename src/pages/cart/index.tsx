import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { ProductProps } from '../home';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

type CartProps = {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

export function Cart() {

    const { cart, addItemCart, removeItemCart, total} = useContext(CartContext);

    function incrementItemCart(newItem: ProductProps) {
        toast.success("Produto adicionado no carrinho!", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF",
                marginTop: 42
            }
        });
        addItemCart(newItem);
    }

    function decrementItemCart(product: CartProps) {
        removeItemCart(product);
    }

    function handleFinalizePurchase(total: string) {
        toast.success(`Compra finalizada!\nValor: ${total}`, {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF",
                marginTop: 42
            }
        })
    }

    return (
        <div className="w-full max-w-7xl px-4 mx-auto">
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

            {cart.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">ops, seu carrinho está vazio!</p>
                    <Link
                        className="bg-slate-600 my-3 p-1 px-3 text-white font-medium rounded"
                        to="/"
                    >
                        Acessar Produtos
                    </Link>
                </div>
            )}

            {cart.map( (product) => (
                <section className="flex items-center justify-between border-b-2 border-gray-300" key={product.id}>
                    <img 
                        className="w-28"
                        src={product.cover}
                        alt={product.title} 
                    />

                    <strong>
                        {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>

                    <div className="flex items-center justify-center gap-3">
                        <button onClick={ () => decrementItemCart(product)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                            -
                        </button>
                        {product.amount}
                        <button onClick={ () => incrementItemCart(product)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
                            +
                        </button>
                    </div>

                    <strong className="float-right mx-6">
                        SubTotal: {product.total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>
                </section>
            ))}

            { cart.length !== 0 && (
                <div className="flex items-center justify-between mt-8">
                    <p className="font-bold">Total do carrinho: {total}</p>

                    <button onClick={() => handleFinalizePurchase(total)} className="bg-slate-600 rounded p-2 text-white text-medium">
                        Finalizar compra
                    </button>
                </div>
            )}
            

        </div>
    );
}