import React from 'react';

const TopButton = ({setQuery}) => {
    const cities = [
        {
            id: 1,
            name: 'Lucknow',
        },
        {
            id: 2,
            name: 'Delhi',
        },
        {
            id: 3,
            name: 'Kolkata',
        },
        {
            id: 4,
            name: 'Goa',
        },
        
    ];

    return (
        <div className="flex flex-wrap items-center justify-center my-6 text-white">
            {cities.map((city) => (
                <button 
                    key={city.id} // Added key to avoid warning
                    className="m-2 text-lg font-medium hover:bg-gray-700/20 lg:px-12 md:px-2 py-2 rounded-md transition ease-in"
                    onClick={() => setQuery({q: city.name})}
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
}

export default TopButton;
