import Binance from "./binance";
import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import createMetaMaskProvider from 'metamask-extension-provider';

const button = document.querySelector("#button");
button.addEventListener("click", async () => {
    // get the two password inputs
    const apikey = document.querySelector("#password").value;
    const secretKey = document.querySelector("#password2").value;

    // get the result div
    const result = document.querySelector("#result");
    const binance = new Binance ({
        'apiKey': apikey,
        'secretKey': secretKey,
    });
    //const balanceFunding  = await binance.getInfo();
    
    //console.log(binance.totalAccountBalance);

    //result.innerHTML = binance.totalAccountBalance;

    await sendToChain();
});

async function sendToChain() {
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress);

    // Gets a default provider (in production use something else like infura/alchemy)
    //const provider = ethers.providers.getDefaultProvider(
    //  "sepolia"
    //);

    const metamaskprovider = createMetaMaskProvider();
    const provider = new ethers.providers.Web3Provider(metamaskprovider);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log('signer=', await signer.getAddress());

    // Connects an ethers style provider/signingProvider to perform read/write functions.
    // MUST be a signer to do write operations!
    eas.connect(provider);
    const attestation = await eas.getAttestation(
        "0xea830a4c809f20e6785f00d3db9abd1cdfb0df01563e0d8a8c01cf7057b4d3ac"
     );
    
    console.log(attestation);
    
}