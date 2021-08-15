const { NODE_ENV, FRONT_URL } = require('../config');
const { EMAIL_TYPES } = require('../constants');

const genFrontURL = (path, queryParams) => {
  let host = NODE_ENV === 'production' ? FRONT_URL : 'http://localhost:4200';
  let queryStringArr = Object.entries(queryParams).map(
    ([key, value]) => `${key}=${value}`
  );

  const url = `${host}/${path}${
    queryStringArr.length ? '?' + queryStringArr.join('&') : ''
  }`;

  return url;
};
const genResetPasswordTemplate = (data) => {
  const url = genFrontURL('reset-password', {
    token: data.token,
  });

  const compiled = `
  <html>
  <head>
   <style>
      .section {
        text-align: center;
      }
      .bg {
        background-color: #673ab7;
      }
      .data {
        width: fit-content;
        margin: 0px auto;
        border: 1px solid #673ab7;
        padding: 20px;
      }
      .text-left {
        text-align: left;
      }

      .links {
        padding: 10px 0;
        max-width: 60%;
        margin: 0 auto;
        overflow: hidden;
      }
      a {
        display: inline-block;
        margin-bottom: 0.5rem;
      }
      .btn {
        padding: 10px 15px;
        border-radius: 10px;
        color: white;
      }
      .btn:hover {
        border: 2px solid #ffd740;
      }
    </style>
    </head>
   <body>
    <div class="section">
      <h1>Dear you,</h1>
      <h2>
        Follow this link or click in the button to reset your password in My
        Portfolio Provider App
      </h2>
      <h3>You have 1 hour to change your password until the token will expire</h3>

      <h4>Your account:</h4>
      <div class="data text-left">
        <div>Nickname: <strong>${data.nickname}</strong></div>
        <div>Email: <strong>${data.email}</strong></div>
      </div>

      <p class="links">
        <a href="${url}">
          ${url}
        </a>
        <a href="${url}">
          <button type="button" class="btn bg">Reset Password</button>
        </a>
      </p>

      <small>Please, dont reply to this email</small>
    </div>
  </body>
  </html>
  `;
  return compiled;
};

const renderTemplate = (template, data) => {
  switch (template) {
    case EMAIL_TYPES.FORGOT_PASSWORD.template:
      return genResetPasswordTemplate(data);
  }
};

module.exports = {
  renderTemplate,
};
