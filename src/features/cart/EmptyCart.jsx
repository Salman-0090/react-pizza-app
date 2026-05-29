import LinkButton from "../../ui/LinkButton";

export default function EmptyCart() {
    return (
        <div className="font-semibold mt-6">
              <LinkButton to="/menu">&larr; Back to menu</LinkButton>
            Your cart is still empty. Start adding some Pizzas :)
        </div>
    )
}