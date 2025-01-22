const awsConfig = {
  Auth: {
    region: "eu-north-1",
    userPoolId: "eu-north-1_JGjhRBUsH", // Replace with your User Pool ID
    userPoolWebClientId: "raagmk5k89akn3hem7ilshji6", // Replace with your App Client ID
    oauth: {
      domain: "your-cognito-domain.auth.eu-north-1.amazoncognito.com", // Replace with your Cognito domain
      scope: ["email", "openid", "profile"],
      redirectSignIn: "myapp://callback", // Replace with your custom scheme
      redirectSignOut: "myapp://signout", // Replace with your custom scheme
      responseType: "code", // Authorization Code Grant
    },
  },
};

export default awsConfig;
