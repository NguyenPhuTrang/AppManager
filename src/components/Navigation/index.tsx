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

    const dispatch = useDispatch();

    const handleSelectCount = (count: number) => {
        setCount(count);
    };

    const handleSelectPage = (pageNumber: number) => {
            dispatch(numberPage(pageNumber));
    }

    useEffect(() => {
        dispatch(limitPage(count));
        if(page.number > page.totalPages) {
            dispatch(numberPage(1));
        }
    }, [count, dispatch, page.number, page.totalPages]);

    const quantityList = [1, 2, 3, 4, 5];

    return (
        <div className="w-full py-4 px-6 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px] tracking-wide">Showing</p>
                <div className="relative flex items-center justify-center gap-[6px] py-[10px] px-[20px] group rounded border-[1px] border-solid border-[#E9E7FD]">
                    <p className="text-[15px] font-[500] text-[#23272E] leading-[18px] select-none">{count}</p>
                    <img src="../icons/ic-chevron-down.svg" alt="" className="w-4 h-4" />
                    <ul className="absolute w-full bg-white rounded-[4px] group-hover:block hidden border-solid border-[1px] border-[#E9E7FD] top-[100%] left-0">
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
                <p className="text-[15px] font-[500] text-[#8B909A] leading-[18px]">of {page.totalProducts}</p>
            </div>
            <div className="flex items-center gap-[2px]">
                <div className="flex items-center justify-center cursor-pointer select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]">
                    <img src="../icons/ic-chevron-left.svg" alt="" className="w-4 h-4" />
                </div>
                <ul className="flex items-center gap-[2px]">
                    {
                        createArray(page.totalPages).map((item, index) => (
                            <li
                                key={index}
                                className={`flex items-center justify-center cursor-pointer 
                                select-none py-1 px-3 rounded-[4px] text-[13px]  font-[400] leading-5 
                                ${page.number === item? 'bg-[#0F60FF] text-[#fff]' : 'bg-[#F1F2F6] text-[#8B909A]'}`}
                                onClick={() => handleSelectPage(item)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
                <div className="flex items-center justify-center cursor-pointer select-none py-[6px] px-2 rounded-[4px] bg-[#F1F2F6]">
                    <img src="../icons/ic-chevron-right.svg" alt="" className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default Navigation;