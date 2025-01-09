import { Account, constants, ec, json, stark, RpcProvider, hash, CallData } from 'starknet';
import {RPC_URL } from '../../utils/constants';



const provider = new RpcProvider({ nodeUrl: RPC_URL });


export const DeployOZAccount = async (
    privateKey : string,
    publicKey : string,
) => {
    try {
        const OZaccountClassHash = '0x061dac032f228abef9c6626f995015233097ae253a7f72d68552db02f2971b8f';
        const OZaccountConstructorCallData = CallData.compile({ publicKey: publicKey });
        const OZcontractAddress = hash.calculateContractAddressFromHash(
                publicKey,
                OZaccountClassHash,
                OZaccountConstructorCallData,
                0
                );
        const OZaccount = new Account(provider, OZcontractAddress, privateKey);

        const { transaction_hash, contract_address } = await OZaccount.deployAccount({
        classHash: OZaccountClassHash,
        constructorCalldata: OZaccountConstructorCallData,
        addressSalt: publicKey,
        });

        await provider.waitForTransaction(transaction_hash);
        console.log('New OpenZeppelin account created.\n   address =', contract_address);
        return JSON.stringify({
            status: 'success',
            wallet: 'Open Zeppelin',
            contract_address: contract_address,
          });
        } catch (error) {
          return JSON.stringify({
            status: 'failure',
            error: error instanceof Error ? error.message : 'Unknown error',
          });
    }
}

export type DeployArgentParams = {
    publicKeyAX : string,
    privateKeyAX : string,

}
export const DeployArgentAccount = async (params: DeployArgentParams) => {
    try {

        const argentXaccountClassHash = '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003';
        const AXConstructorCallData = CallData.compile({
            owner: params.publicKeyAX,
            guardian: '0',
          });
        console.log(params.publicKeyAX);
        console.log(params.privateKeyAX);
        const AXcontractAddress = hash.calculateContractAddressFromHash(
            params.publicKeyAX,
            argentXaccountClassHash,
            AXConstructorCallData,
            0
          );

        const accountAX = new Account(provider, AXcontractAddress, params.privateKeyAX);

        const deployAccountPayload = {
          classHash: argentXaccountClassHash,
          constructorCalldata: AXConstructorCallData,
          contractAddress: AXcontractAddress,
          addressSalt: params.publicKeyAX,
        };
        

        const { transaction_hash: AXdAth, contract_address: AXcontractFinalAddress } =
          await accountAX.deployAccount(deployAccountPayload);
        console.log('ArgentX wallet deployed at:', AXcontractFinalAddress);
        return JSON.stringify({
            status: 'success',
            wallet: 'Open Zeppelin',
            contract_address: AXcontractFinalAddress,
          });
        } catch (error) {
          return JSON.stringify({
            status: 'failure',
            error: error instanceof Error ? error.message : 'Unknown error',
          });

    }
}