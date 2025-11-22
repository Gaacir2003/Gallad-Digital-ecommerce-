import logo from "./assets/Loollogo.png"; 

function NavBar() {
  return (
    <div className=" max-w-6xl mx-auto shadow-lg w-screen bg-gray-100 mt-3 ">
        <div className=" items-center justify-between space-x-4 flex ">
      <div className="text-yellow-600 text-xl font-bold flex items-center space-x-2 ">
        {/* Logo Side */}
        <img src={logo} alt="Lool Cafe Logo" className="w-16 h-16 object-contain text-2xl" />
        <h1>Lool Cafe</h1>
      </div>
        {/* Nav Links */}
      <div className="flex  space-x-4 items-center font-semibold">
       
        <a href="#" className="hover:text-yellow-400">Home</a>
        <a href="#" className="hover:text-yellow-400">Menu</a>
        <a href="#" className="hover:text-yellow-400">Orders</a>
        <a href="#" className="hover:text-yellow-400">About Us</a>
        <a href="#" className="hover:text-yellow-400">Contact Us</a>
      </div>

      {/* Nav Buttons */}
      <div className="flex items-center space-x-4 ">
        <button><i class="px-6 py-2 rounded-lg text-yellow-400 text-xl hover:bg-yellow-500 text-center fa-solid fa-magnifying-glass"></i></button>
        <button><i class="px-6 py-2 rounded-lg text-yellow-400 text-xl hover:bg-yellow-500 text-center  fa-solid fa-cart-shopping"></i></button>
      </div>
      </div>
        

    </div>
  );
}

export default NavBar;
