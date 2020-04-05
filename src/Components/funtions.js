import React from 'react'; 
export function API_URL(url){
  return "https://towel.42one.com/api"  + url
} 

// export var ACCESS_TOKEN = "";
// export var REFRESH_TOKEN = "";

// export function saveToken(tokens) {
//   localStorage.setItem(USER_KEY, JSON.stringify(tokens));
// }

// export function saveRefreshToken() {
//   return JSON.parse(localStorage.getItem(USER_KEY));
// }

// export function deleteUser() {
//   localStorage.removeItem(USER_KEY);
// }


function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export async function getToken(url){ 
  let response = await fetch(API_URL(url), {
    method: "GET", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      // "Authorization": "Bearer" + token_data
    },
    redirect: "follow",
    referrer: "no-referrer",  
  })

  return response
}


export async function getRequest(url , token){
  let token_data = parseJwt(token) 
  console.log('Token data ', token_data)
  let response = await fetch(API_URL(url), {
    method: "GET", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Accept": 'application/id+json',
      // 'Content-Type': 'application/id+json',
      "Authorization": "Bearer" + token_data
    },
    redirect: "follow",
    referrer: "no-referrer",  
  })

  return response
}

export async function postFormData(url, form){
  let response = await fetch(API_URL(url), {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
    body: form
  })

  return response
}

export async function putFormData(url, form){
  let response = await fetch(API_URL(url), {
    method: "PUT", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      // "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",  
    body: form
  })

  return response
}

export async function postJSON(url, json){
  console.log(JSON.stringify(json))
  let response = await fetch(API_URL(url), {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Accept": 'application/json',
      'Content-Type': 'application/json'
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(json)
  })

  return response
}

export async function putJSON(url, json){
  let response = await fetch(API_URL(url), {
    method: "PUT", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(json)
  })

  return response
}

export async function deleteJSON(url){
  let response = await fetch(API_URL(url), {
    method: "DELETE", 
    mode: "cors", 
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*",
      "Authorization": localStorage.token
    },
    redirect: "follow",
    referrer: "no-referrer",
  })

  return response
}
