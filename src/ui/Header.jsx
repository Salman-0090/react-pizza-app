import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Haeder() {
    return (
    <header className="flex justify-between items-center bg-yellow-400 p-4 uppercase border-b border-stone-200 sm:px-6">
        <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
        <SearchOrder />
        <Username />
    </header>
    )
}