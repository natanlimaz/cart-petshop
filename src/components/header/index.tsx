import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { BsCartPlus } from 'react-icons/bs';

export function Header() {

    const { cartAmount } = useContext(CartContext);

    return (
        <header  className="bg-gray-600 px-8">
            <nav className="w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto">
                <Link to="/" className="font-bold text-2xl text-white">Petshop</Link>
                
                <Link to="/cart" className="relative">
                    <BsCartPlus size={24} color='#FFF' />
                    {cartAmount > 0 && (
                        <span className="absolute -right-3 -top-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white">{cartAmount}</span>  
                    )}
                </Link>
                
            </nav>
        </header>
    );
}