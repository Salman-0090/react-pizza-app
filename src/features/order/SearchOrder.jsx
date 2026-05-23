import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function SearchOrder() {
    const [query, setQuery] = useState();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault()
        if(!query) return;
        navigate(`/order/${query}`);
        setQuery("");
    }

    return (
    <form onSubmit={handleSubmit}>
        <input className="bg-white p-1 border border-yellow-500 rounded-2xl px-4 py-2 text-sm w-28 placeholder:text-stone-400 transition-all duration-300 focus-outline-none focus:ring focus:ring-yellow-500"  placeholder="Search Order #" value={query} onChange={(e)=> setQuery(e.target.value)}/>
    </form>
    )
}