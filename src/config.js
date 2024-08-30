const ENV = process.env.REACT_APP_ENV || "dev";

const config = {
  development: {
    API_URL: "https://seulah.com",
    FEATURE_FLAG: true,
  },
  production: {
    API_URL: "https://seulah.sa",
    FEATURE_FLAG: false,
  },
  dev: {
    API_URL: "https://seulah.dev",
    FEATURE_FLAG: true,
  },
};

export default config[ENV];
