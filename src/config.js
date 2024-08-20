const ENV = process.env.REACT_APP_ENV || "production";

const config = {
  development: {
    API_URL: "https://seulah.com",
    FEATURE_FLAG: true,
  },
  production: {
    API_URL: "https://seulah.sa",
    FEATURE_FLAG: false,
  },
  localhost: {
    API_URL: "http://localhost:3000",
    FEATURE_FLAG: true,
  },
};

export default config[ENV];
