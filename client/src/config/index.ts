const env = process.env.NODE_ENV || 'production';

interface ConfigInterface {
  env: string;
  api: {
    protocol: string;
    baseUrl: string;
    port: number;
  };
  apiUrl: string;
  loginUrl: string;
  registrationUrl: string;
  frontendUrl: string;
  social: {
    googleUrl: string;
  };
}

const baseConfig: ConfigInterface = {
  env: 'development',
  api: {
    protocol: 'http',
    baseUrl: 'localhost',
    port: 6060,
  },
  apiUrl: 'http://localhost:6060',
  loginUrl: 'http://localhost:6060/login',
  registrationUrl: 'http://localhost:6060/register',
  frontendUrl: 'http://localhost:3000',
  social: {
    googleUrl: 'http://localhost:6060/auth/google',
  },
};

const prodConfig: ConfigInterface = {
  ...baseConfig,
  api: {
    protocol: 'https',
    baseUrl: '',
    port: 443,
  },
  apiUrl: '',
  loginUrl: '',
  registrationUrl: '',
  frontendUrl: '',
  social: {
    googleUrl: '',
  },
};

const config: ConfigInterface = env === 'production' ? prodConfig : baseConfig;
export default config;
