const axios = require('axios');

const CJ_BASE_URL = 'https://developers.cjdropshipping.com';

async function getAccessToken() {
  const response = await axios.post(
    `${CJ_BASE_URL}/api2.0/v1/authentication/getAccessToken`,
    {
      email: process.env.CJ_PLATFORM_TOKEN,
      password: process.env.CJ_ACCESS_TOKEN
    }
  );

  const data = response.data;
  if (!data.result) {
    throw new Error(`CJ Auth échouée : ${data.message}`);
  }
  return data.data.accessToken;
}

async function getProductInfo(pid) {
  const token = await getAccessToken();

  const response = await axios.get(`${CJ_BASE_URL}/api2.0/v1/product/query`, {
    params: { pid },
    headers: { 'CJ-Access-Token': token }
  });

  const data = response.data;
  if (!data.result) {
    throw new Error(`CJ getProductInfo échouée : ${data.message}`);
  }
  return data.data;
}

async function createOrder(orderData) {
  const token = await getAccessToken();

  const response = await axios.post(
    `${CJ_BASE_URL}/api2.0/v1/shopping/order/createOrder`,
    orderData,
    { headers: { 'CJ-Access-Token': token } }
  );

  const data = response.data;
  if (!data.result) {
    throw new Error(`CJ createOrder échouée : ${data.message}`);
  }
  return data.data;
}

module.exports = { getAccessToken, getProductInfo, createOrder };
