import React from 'react';

const HomeSection = () => {
  return (
    <section className=" h-screen w-full flex content-center items-center" style={{background: 'url("frontend/src/assets/background.png")'}}>
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
        IMAGINE A PLACE...
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
        "Step into a realm where your thoughts take center stage without revealing your identity. Join a diverse community of pseudonymous bloggers, each weaving narratives, sharing insights, and connecting on a deeper level. It's a space where you can express yourself freely, build a unique online presence, and engage in conversations that matter—all while embracing the power of anonymity. Ready to start your pseudonymous blogging journey? Begin crafting your stories now."
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
