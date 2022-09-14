/* eslint-disable no-console */
import {
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
  Thing,
} from '@inrupt/solid-client';
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

export async function fetchContainerContent(containerUrl: string) {
  const ds = await getSolidDataset(containerUrl, { fetch });
  if (ds) {
    const request = getThing(ds, containerUrl) as Thing;
    return getUrlAll(request, 'http://www.w3.org/ns/ldp#contains');
  }
  return [];
}

export async function fetchProfileData(webId: string) {
  const ds = await getSolidDataset(webId);
  const profile = getThing(ds, webId) as Thing;
  const name = getStringNoLocale(profile, 'http://xmlns.com/foaf/0.1/name') ?? '';
  const logo = getUrl(profile, 'http://xmlns.com/foaf/0.1/logo') ?? '';
  const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage') ?? '';
  const seeAlso = getUrl(profile, 'http://www.w3.org/2000/01/rdf-schema#seeAlso') ?? '';
  return {
    name, logo, storage, seeAlso,
  };
}

export async function gendataContainerExists(egendataUrl: string) {
  const ds = await getSolidDataset(egendataUrl);
  const profile = getThing(ds, egendataUrl) as Thing;
  const name = getStringNoLocale(profile, 'http://xmlns.com/foaf/0.1/name') ?? '';
  const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage') ?? '';
  const seeAlso = getUrl(profile, 'http://www.w3.org/2000/01/rdf-schema#seeAlso') ?? '';
  return { name, storage, seeAlso };
}

export async function fetchPrivateData(seeAlso: string) {
  const ds1 = await getSolidDataset(`${seeAlso}`, { fetch });
  const privateMe = getThing(ds1, `${seeAlso}#me`) as Thing;
  const ssn = getStringNoLocale(privateMe, 'https://pod-test.egendata.se/schema/core/v1#dataSubjectIdentifier') ?? '';
  const uuid = getStringNoLocale(privateMe, 'https://pod-test.egendata.se/schema/core/v1#uuid') ?? '';
  const firstname = getStringNoLocale(privateMe, 'http://xmlns.com/foaf/0.1/firstName') ?? '';
  const lastname = getStringNoLocale(privateMe, 'http://xmlns.com/foaf/0.1/lastName') ?? '';
  const fullname = `${firstname}  ${lastname}`;
  return { ssn, fullname, uuid };
}
