import React from 'react'
import gabdhaha from '../assets/gabdhaha.png'
import { IoStorefrontSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiShoppingBasketLine } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import mohamed from '../assets/mohamed.png'
import aisha from '../assets/aisha.png'
import boss from '../assets/boss.png'

const AboutPage = () => {

  const team = [
    {
      name: "Mohamed Abdiwali",
      role: "Founder & CEO",
      image: mohamed,
    },
    {
      name: "Aisha Abdi",
      role: "Managing Director",
      image: aisha,
    },
    {
      name: "Sahal Mohamed",
      role: "Product Designer",
      image: boss,
    },
  ];

  return (
    <div className="w-full py-16 px-4 mx-auto bg-gray-100">

      {/* Our Story */}
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold text-4xl mb-10 text-orange-700">Our Story</h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <p className="text-gray-700 leading-relaxed text-lg">
            Gallad Digital was created with one mission in mind—to bring trusted, 
            high-quality electronics closer to everyday people in East Africa 
            and beyond. <br/><br/>

            We started as a small idea: What if buying a phone, a laptop, or any 
            gadget didn’t have to be difficult, expensive, or risky?  
            From that simple thought, Gallad Digital grew into a modern online 
            marketplace where customers enjoy premium products, verified sellers, 
            and secure shopping.
          </p>

          {/* Image */}
          <div className="flex justify-center">
            <img 
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-orange-600 shadow-md"
              src={gabdhaha}
              alt="About Gallad Digital"
            />
          </div>

        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">

        {/* Box 1 */}
        <div className="border rounded-xl p-6 w-full flex flex-col items-center 
                        text-center shadow-sm hover:bg-orange-700 hover:text-white transition">
          <IoStorefrontSharp className="text-4xl mb-3" />
          <h3 className="text-2xl font-semibold">10.5k</h3>
          <p className="text-sm">Sellers active on our site</p>
        </div>

        {/* Box 2 */}
        <div className="border rounded-xl p-6 w-full flex flex-col items-center 
                        text-center shadow-sm hover:bg-orange-700 hover:text-white transition">
          <FaMoneyCheckDollar className="text-4xl mb-3" />
          <h3 className="text-2xl font-semibold">33k</h3>
          <p className="text-sm">Monthly product sales</p>
        </div>

        {/* Box 3 */}
        <div className="border rounded-xl p-6 w-full flex flex-col items-center 
                        text-center shadow-sm hover:bg-orange-700 hover:text-white transition">
          <RiShoppingBasketLine className="text-4xl mb-3" />
          <h3 className="text-2xl font-semibold">45.5k</h3>
          <p className="text-sm">Customers active on our site</p>
        </div>

        {/* Box 4 */}
        <div className="border rounded-xl p-6 w-full flex flex-col items-center 
                        text-center shadow-sm hover:bg-orange-700 hover:text-white transition">
          <BsCashStack className="text-4xl mb-3" />
          <h3 className="text-2xl font-semibold">25k</h3>
          <p className="text-sm">Annual gross sales</p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto mt-20 px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-orange-700">Our Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((person) => (
            <div key={person.name} className="text-center">
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-80 object-contain rounded-xl shadow-md bg-gray-200"
              />
              <h2 className="text-xl font-semibold mt-4">{person.name}</h2>
              <p className="text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AboutPage;
