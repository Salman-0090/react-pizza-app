import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((store)=> store.user.username)
  return (
    <div className="text-center mt-8 sm:my-16">
      <h1 className="text-3xl font-medium mb-2 text-stone-700">
        The best pizza.
      </h1>
      <h1 className="text-4xl text-yellow-500 text-stretch tracking-wider">Straight out of the oven, straight to <br/>you.</h1>
      {username=== "" ?  <CreateUser /> : <Button to='/menu' type="primary">Continue ordering, {username}</Button>}
    </div>
  );
}
  
export default Home;
