import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { limitPage, numberPage } from '../../features/actions/page';
import { RootState } from '../../common/interfaces';

const Navigation = () => {

    const createArray = (n: number) => {
        const result = [];
        for (let i = 1; i <= n; i++) {
            result.push(i);
        }
        return result;
    }

    const page = useSelector((state: RootState) => state.page);

    const [count, setCount] = useState(10);

    const [selectCountPage, setSelectCountPage] = useState(1);

    const dispatch = useDispatch();

    const handleSelectCount = (count: number) => {
        setCount(count);
    };

    const handleSelectPage = (pageNumber: number) => {
        setSelectCountPage(pageNumber);
    }

    const handlePrevPage = () => {
        setSelectCountPage(selectCountPage - 1);
    };

    const handleNextPage = () => {
        setSelectCountPage(selectCountPage + 1);
    };

    useEffect(() => {
        dispatch(limitPage(count));
        if (page.number > page.totalPages) {
            setSelectCountPage(1);
        }
        dispatch(numberPage(selectCountPage));
    }, [count, dispatch, page.number, page.totalPages, selectCountPage]);

    const quantityList = [10, 20, 30, 40, 50];

    return (
        <div className="w-full py-4 px-6 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px] tracking-wide select-none">Showing</p>
                <div className="relative flex items-center justify-center gap-[6px] py-[10px] px-[20px] group rounded border-[1px] border-solid border-[#E9E7FD]">
                    <p className="text-[15px] font-[500] text-[#23272E] leading-[18px] select-none cursor-pointer">{count}</p>
                    <img src="../icons/ic-chevron-down.svg" alt="" className="w-4 h-4 select-none cursor-pointer" />
                    <ul 
                        className="absolute w-full bg-white rounded-[4px] animate-flip-down animate-once animate-ease-out 
                        group-hover:block hidden border-solid border-[1px] border-[#E9E7FD] top-[100%] left-0"
                    >
                        {quantityList.map((item, index) => (
                            <li
                                key={index}
                                className="cursor-pointer select-none text-[14px] font-[500] text-[#23272E] leading-[18px] flex items-center justify-center py-2 hover:bg-[#E9E7FD]"
                                onClick={() => handleSelectCount(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px] select-none">of {page.totalData}</p>
            </div>
            <div className="flex items-center gap-[2px]">
                <div 
                    onClick={handlePrevPage}
                    className={`flex items-center justify-center select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]
                    ${selectCountPage === 1 ? 'pointer-events-none cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                >
                    <img src="../icons/ic-chevron-left.svg" alt="" className="w-4 h-4" />
                </div>
                <ul className="flex items-center gap-[2px]">
                    {
                        createArray(page.totalPages).map((item, index) => (
                            <li
                                key={index}
                                className={`flex items-center justify-center cursor-pointer 
                                select-none py-1 px-3 rounded-[4px] text-[13px]  font-[400] leading-5 
                                ${page.number === item ? 'bg-[#0F60FF] text-[#fff]' : 'bg-[#F1F2F6] text-[#8B909A]'}`}
                                onClick={() => handleSelectPage(item)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
                <div
                    onClick={handleNextPage}
                    className={`flex items-center justify-center select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]
                    ${selectCountPage === page.totalPages ? 'pointer-events-none cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                >
                    <img src="../icons/ic-chevron-right.svg" alt="" className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default Navigation;