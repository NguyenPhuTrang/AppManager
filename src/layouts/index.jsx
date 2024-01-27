import React from 'react';

const Layout = ({ children }) => {
    return (
        <div>
            <div className='flex flex-col w-screen h-screen overflow-y-auto overflow-x-auto'>
                {children}
            </div>
        </div>
    );
};

export default Layout;