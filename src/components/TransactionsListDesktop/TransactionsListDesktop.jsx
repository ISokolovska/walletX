import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Table, HeaderTr, StrTr, StrTdDate, StrTdType, StrTdCadegoryId, StrTdComment, StrTdAmount, StrTdBalanceAfter, HeaderThDate, HeaderThBalance, HeaderThCategore, HeaderThComment, HeaderThType, HeaderThSum } from './TransactionsListDesktop.styled';
import  operations  from 'redux/transactions/transactions-operations';

function getTransList() {
    const transList = [
        {
            id: '1',
            transactionDate: '04.01.19',
            type: '-',
            categoryId: 'Other',
            // userId: 'string', 
            comment: 'Gift for you wife',
            amount: 300.00,
            balanceAfter: 6900.00,
        },
        {
            id: '2',
            transactionDate: '05.01.19',
            type: 'INCOME',
            categoryId: 'Income',
            // userId: 'string', 
            comment: 'January bonus',
            amount: 8000.00,
            balanceAfter: 14900.00,
        },
        {
            id: '3',
            transactionDate: '07.01.19',
            type: '-',
            categoryId: 'Car',
            // userId: 'string', 
            comment: 'Oil',
            amount: 1000.00,
            balanceAfter: 13900.00,
        },
        {
            id: '4',
            transactionDate: '07.01.19',
            type: '-',
            categoryId: 'Products',
            // userId: 'string', 
            comment: 'Vegetables for week',
            amount: 280.00,
            balanceAfter: 13870.00,
        },
        {
            id: '5',
            transactionDate: '07.01.19',
            type: 'INCOME',
            categoryId: 'Income',
            // userId: 'string', 
            comment: 'Gift',
            amount: 1000.00,
            balanceAfter: 14870.00,
        },
    ];

    return transList;
}

const TransactionsListDesktop = () => {
    const dispatch = useDispatch();
    const elementsList = useSelector(state => state.transaction.transactions);
    const category = useSelector(state => state.category.category);
    const isLoading = useSelector(state => state.transaction.loadingAddTrans);

    useEffect(() => {
        dispatch(operations.getTransactions());
    }, [dispatch]);
    
    console.log('category:', category);
    console.log('elementsList:', elementsList);
    
    if (!category || !elementsList) return;

    if (category.length===0 || elementsList.length === 0) return;

    // console.log(Date(elementsList[0].transactionDate));
    // console.log(elementsList);
    return !isLoading && (
        <Table>
            <thead>
                <HeaderTr>
                    <HeaderThDate>Date</HeaderThDate>
                    <HeaderThType>Type</HeaderThType>
                    <HeaderThCategore>Category</HeaderThCategore>
                    <HeaderThComment>Comment</HeaderThComment>
                    <HeaderThSum>Sum</HeaderThSum>
                    <HeaderThBalance>Balance</HeaderThBalance>
                </HeaderTr>
            </thead>    
            <tbody>
                {elementsList?.map(e => {
                    return (
                        <StrTr key={e.id}>
                            <StrTdDate>{e.transactionDate}</StrTdDate>
                            <StrTdType>{e.type==='INCOME' ? '+' : '-' }</StrTdType>
                            <StrTdCadegoryId>{category?.find(c => c.id===e.categoryId).name}</StrTdCadegoryId>
                            <StrTdComment>{e.comment}</StrTdComment>
                            <StrTdAmount type={e.type}>{e.amount.toFixed(2)}</StrTdAmount>
                            <StrTdBalanceAfter>{e.balanceAfter.toFixed(2)}</StrTdBalanceAfter>
                        </StrTr>
                    )
                })}
            </tbody>
        </Table>
    );

}

export default TransactionsListDesktop;