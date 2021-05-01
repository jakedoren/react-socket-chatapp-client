const oktaAuthConfig = {
    issuer: 'https://dev-34817705.okta.com/oauth2/default',
    clientId: '0oamrlnyo0YM908Mq5d6',
    redirectUri: window.location.origin + '/login/callback',
  };
  
  const oktaSignInConfig = {
    baseUrl: 'https://dev-34817705.okta.com',
    clientId: '0oamrlnyo0YM908Mq5d6',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
      issuer: 'https://dev-34817705.okta.com/oauth2/default',
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile'],
    },
    registration: {
      parseSchema: function(schema, onSuccess, onFailure) {
         onSuccess(schema);
      },
      preSubmit: function (postData, onSuccess, onFailure) {
         onSuccess(postData);
      },
      postSubmit: function (response, onSuccess, onFailure) {
         onSuccess(response);
         
      }
    },
    features: {
       registration: true 
    },
    logo: '//logo.clearbit.com/okta.com',
  };


  
  export { oktaAuthConfig, oktaSignInConfig };