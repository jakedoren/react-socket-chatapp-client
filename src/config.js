const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    issuer: 'https://dev-34817705.okta.com/oauth2/default',
    clientId: '0oamrlnyo0YM908Mq5d6',
    redirectUri: window.location.origin + '/login/callback',
  };
  
  const oktaSignInConfig = {
    baseUrl: 'https://dev-34817705.okta.com',
    clientId: '0oamrlnyo0YM908Mq5d6',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
      // If your app is configured to use the Implicit flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line
      // pkce: false
    },
    registration: {
      parseSchema: function(schema, onSuccess, onFailure) {
         // handle parseSchema callback
         onSuccess(schema);
      },
      preSubmit: function (postData, onSuccess, onFailure) {
         // handle preSubmit callback
         onSuccess(postData);
      },
      postSubmit: function (response, onSuccess, onFailure) {
          // handle postsubmit callback
         onSuccess(response);
      }
    },
    features: {
      // Used to enable registration feature on the widget.
      // https://github.com/okta/okta-signin-widget#feature-flags
       registration: true // REQUIRED
    },
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
    logo: '//logo.clearbit.com/okta.com',
  };
  
  export { oktaAuthConfig, oktaSignInConfig };