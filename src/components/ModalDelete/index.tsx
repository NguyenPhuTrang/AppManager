import React from 'react';

interface Props {
    title: string;
    handleSubmit: () => void;
    description: string;
    handleClose: () => void;
}

const ModalDelete: React.FC<Props> = ({
    title,
    handleSubmit,
    description,
    handleClose
}) => {
    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className='fixed inset-0 w-screen overflow-y-auto z-50 animate-fade-up animate-once animate-ease-out animate-duration-500'>
                <div className="flex min-h-full items-end justify-center p-4 sm:items-center">
                    <div className="bg-white w-[440px] flex flex-col rounded-[12px] relative">
                        <div className="flex items-center justify-start pt-[17px] pb-[18px] pl-5">
                            <h2 className="text-[18px] font-[500] text-[#1A2240] leading-normal">{title}</h2>
                        </div>
                        <div className='w-full overflow-y-auto'>
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all px-6 pb-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-1 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <p className="text-sm text-red-600">{description}</p>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={handleSubmit}
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDelete;
