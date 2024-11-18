import { AvaNetwork } from '@/js/AvaNetwork'

export const TestnetConfig = new AvaNetwork(
    'Testnet',
    'https://testnet-rpc.geeblock.io',
    90110,
    'http://3.38.103.197:3001',
    'http://3.38.103.197:8000',
    true
)
