import { Link } from "react-router-dom"

export default function Button({children, disabled, to, type, onClick}) {

     const base ="bg-yellow-400 uppercase font-semibold text-stone-800  inline-block tracking-wide rounded-full hover:bg-yellow-300 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring focus-ring-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed text-sm"
        
    const style = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' py-2 md:px-5 md:py-2.5 text-xs',
        round: base +  'px-2.5 py-1 md:px-3.5 md:py-2',
        secondary: "bg-transparent uppercase font-semibold text-stone-400  inline-block tracking-wide rounded-full hover:bg-stone-300 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring focus-ring-stone-300 focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-3.5 text-sm"
    }   
    if(to) 
        return <Link className={style[type]} to={to}>{children}</Link>
    if(onClick) {
         return (
             <button onClick={onClick} disabled={disabled}  className={style[type]}>
                {children}
        </button>
         )
    }
    return (
        <button disabled={disabled}  className={style[type]}>
                {children}
        </button>
    )
}