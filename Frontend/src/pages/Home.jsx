
const Home = () => {
  return (
    <div className="object-cover bg-[url()] bg-cover bg-center bg-no-repeat"
         style={{ backgroundImage: `url('./src/images/traffic.png')` }}
    >
        <div className="h-screen w-full flex flex-col justify-between">
            <img
            className="w-16 ml-4 mt-4"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Image"
            />
            <div className="bg-white px-4 py-4 pb-6">
                <h2 className="text-3xl font-bold">Get started with Uber</h2>
                <button className="bg-black text-white text-xl w-full py-3 rounded mt-4">
                    Continue
                </button>
            </div>
        </div>
    </div>

  )
}

export default Home