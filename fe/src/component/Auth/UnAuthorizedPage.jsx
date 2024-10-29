import React, { useEffect } from 'react';

const UnAuthorizedPage = () => {
    useEffect(() => {

        document.body.style.backgroundColor = '#fff';
    }, []);

    return (
        <section className="flex items-center justify-center h-screen bg-white">
            <div className="text-center">
                <div
                    className="bg-cover bg-center h-[450px] w-[550px]"
                    style={{
                        backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <h1 className="text-9xl font-bold text-gray-400 mb-9">401</h1>
                </div>
                <div className="-mt-20">
                    <h3 className="text-3xl font-semibold">OOPS!!!</h3>
                    <p className="text-lg">You do not have permission to view this page</p>
                    <a
                        href="/"
                        className="mt-4 inline-block px-4 py-2 text-white bg-green-500 hover:bg-green-600  rounded transition duration-200"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        </section>
    );
};

export default UnAuthorizedPage;
