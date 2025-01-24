const requiredEnvVariables = [
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    'DB_HOST',
    'DB_DIALECT',
    'PORT',
    'JWT_SECRET',
  ];
  
  const checkEnv = () => {
    const missingVars = requiredEnvVariables.filter((varName) => !process.env[varName]);
  
    if (missingVars.length > 0) {
      console.error(
        `The following environment variables are missing: ${missingVars.join(', ')}`
      );
      process.exit(1); // Exit the process with a failure code
    } else {
      console.log('All required environment variables are set.');
    }
  };
  
  // Run the check
  checkEnv();