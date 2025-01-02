const config = {
  production: {
    url: '',
    apiUrl: 'https://10n8c9f374.execute-api.ap-south-1.amazonaws.com/dev/',
  },
  local: {
    url: 'http://localhost:3030/',
    apiUrl: 'http://localhost:3030/api/',
    bucketName: 'flash-learn-dev',
    region: 'ap-south-1',
  },
};

export const environment = 'local';

const hostConfig = {
  WEB_URL: config[environment].url,
  IMAGE_URL: `https://${config[environment].bucketName}.s3.ap-south-1.amazonaws.com`,
  API_URL: config[environment].apiUrl,
  S3_BUCKET: `${config[environment].bucketName}`,
  REGION: `${config[environment].region}`,
};

export { hostConfig };
