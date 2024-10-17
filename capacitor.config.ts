import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.vivalanche.app',
    appName: 'vivalanche-wallet',
    webDir: 'dist',
    server: {
        androidScheme: 'https',
    },
}

export default config
