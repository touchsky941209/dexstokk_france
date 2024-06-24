import logo from './logo.svg';
import './App.css';
import ProjectRouter from './router';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia, gnosis, gnosisChiado } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { phantomWallet, rainbowWallet, walletConnectWallet, metaMaskWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
import { Web3Provider } from './contexts/web3Context';
import 'toastr/build/toastr.min.css';

function App() {
  const queryClient = new QueryClient();

  const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: '57826bfdbc6cd9752e192a296fbbd40d',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia, gnosis, gnosisChiado],
    ssr: true,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          <Web3Provider>
              <ProjectRouter />
          </Web3Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;



