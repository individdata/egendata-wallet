/* eslint-disable no-console */
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';

function isOk(response: Response): boolean {
  return (response.status >= 200 && response.status <= 299);
}

export async function postFile(url: RequestInfo, data: RequestInit, contentType = 'text/plain') {
  // console.log("url: ", url);
  const writeResponse = await fetch(url, {
    method: 'POST',
    body: data.body,
    headers: { 'Content-type': contentType },
  });
  if (!isOk(writeResponse)) {
    console.log(writeResponse.url, writeResponse.status, writeResponse.statusText);
    throw new Error(`Failed to POST: ${writeResponse.statusText}`);
  } else {
    console.log(`POST: ${writeResponse.url}`);
  }
  const body = await writeResponse.text();
  return { data: body, contentType: writeResponse.headers.get('Content-Type') };
}

export async function putFile(url: RequestInfo, data: RequestInit, contentType = 'text/plain') {
  // console.log("url: ", url);
  const writeResponse = await fetch(url, {
    method: 'PUT',
    body: data.body,
    headers: { 'Content-type': contentType },
  });
  if (!isOk(writeResponse)) {
    console.log(writeResponse.url, writeResponse.status, writeResponse.statusText);
    throw new Error(`Failed to PUT: ${writeResponse.statusText}`);
  } else {
    console.log(`PUT: ${writeResponse.url}`);
  }
}

export async function patchFile(url: RequestInfo, data: RequestInit, contentType = 'text/plain') {
  // console.log("url: ", url);
  const writeResponse = await fetch(url, {
    method: 'PATCH',
    body: data.body,
    headers: { 'Content-type': contentType },
  });
  if (!isOk(writeResponse)) {
    console.log(writeResponse.url, writeResponse.status, writeResponse.statusText);
    throw new Error(`Failed to PATCH: ${writeResponse.statusText}`);
  } else {
    console.log(`PATCH: ${writeResponse.url}`);
  }
}

export async function deleteFile(url: RequestInfo) {
  // console.log("url: ", url);
  const deleteResponse = await fetch(url, {
    method: 'DELETE',
  });
  if (!isOk(deleteResponse)) {
    console.log(deleteResponse.url, deleteResponse.status, deleteResponse.statusText);
    throw new Error(`Failed to DELETE: ${deleteResponse.statusText}`);
  } else {
    console.log(`DELETE: ${deleteResponse.url}`);
  }
}
