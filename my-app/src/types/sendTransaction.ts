import { Abi, ContractFunctionName, ContractFunctionArgs } from "viem"

export type SendTransactionInput = {
    transaction: Transaction[]
    //permit2?: Permit2[] // Optional
  formatPayload?: boolean // Optional, default is true. If this is causing errors, you can set this to false.
}

export type Transaction = {
    address: string // Contract address you're interacting with
    abi: Abi | readonly unknown[] // It's recommended to only include the functions you're using.
    functionName: ContractFunctionName<Abi | readonly unknown[], 'payable' | 'nonpayable'>
    value?: string // Hex string representation of the value to send with the function call
    args: ContractFunctionArgs<
        Abi | readonly unknown[],
        'payable' | 'nonpayable',
        ContractFunctionName<Abi | readonly unknown[], 'payable' | 'nonpayable'>
    >
}