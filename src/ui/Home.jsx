import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center mt-8 sm:my-16">
      <h1 className="text-3xl font-medium mb-2 text-stone-700">
        The best pizza.
      </h1>
      <h1 className="text-4xl text-yellow-500 text-stretch tracking-wider">Straight out of the oven, straight to <br/>you.</h1>
      <CreateUser />
    </div>
  );
}
  
export default Home;
