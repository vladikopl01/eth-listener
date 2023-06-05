import { ethers, WebSocketProvider } from "ethers";
import { WSS_PROVIDER } from "./config";

const connectWSS = () => {
  console.log(
    `[${new Date().toLocaleTimeString()}] Connectiong via WebSoccket...`
  );

  const provider = new ethers.WebSocketProvider(WSS_PROVIDER);
  provider.getNetwork().then((res) => {
    console.log(
      `[${new Date().toLocaleTimeString()}] Connected to chain ID ${
        res.chainId
      }`
    );
  });

  listenPendingTx(provider);
};

const listenPendingTx = (provider: WebSocketProvider) => {
  provider.on("pending", (txHash) => {
    if (txHash) {
      process.stdout.write(
        `[${new Date().toLocaleTimeString()}] Scanning transactions: ${txHash} \r`
      );
    }
  });
};

connectWSS();
