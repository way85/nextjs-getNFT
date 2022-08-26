import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';

export default async function handler(req, res) {
    // reads the api key from .env.local and starts Moralis SDK
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    const {pid} = req.query;
    // const chain = EvmChain.ETHEREUM;dd
    const chain = EvmChain.BSC;
    const address = `${pid}`;
    // Promise.all() for receiving data async from two endpoints
    const nft = await Promise.all([
        Moralis.EvmApi.token.getNFTOwners({address,chain,}),
    ]);
    res.status(200).json({
        // formatting the output
        nativeBalance: nft,
        // tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
}
