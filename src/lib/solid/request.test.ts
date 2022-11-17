import { requestFromContainerDS } from './request';
import { responseToSolidDataset } from '@inrupt/solid-client';

const createSolidDatasetFromText = async (url: URL, data: string) => {
  const response = new Response(data, {
    headers: { 'Content-Type': 'text/turtle' },
  });
  (response.url as any) = url.toString();
  return await responseToSolidDataset(response);
};

describe('requestFromContainerListing', () => {
  it('handles request in `received` state', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>.
<subject> posix:mtime 1668441466;
    posix:size 664.`,
    );

    const requestInfo = await requestFromContainerDS(ds);

    expect(requestInfo.id).toBe('1cf68ff4-06a4-47dd-a8be-ad365f6c07f5');
    expect(requestInfo.url).toStrictEqual(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
    );
    expect(requestInfo.state).toBe('received');
  });

  it('handles request in `fetching` state', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<fetch> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<data> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>, <fetch>, <data>.
<subject> posix:mtime 1668441466;
    posix:size 664.
<fetch> posix:mtime 1668441466;
    posix:size 664.
<data> posix:mtime 1668441466;
    posix:size 0.`,
    );

    const requestInfo = requestFromContainerDS(ds);

    expect(requestInfo.id).toBe('1cf68ff4-06a4-47dd-a8be-ad365f6c07f5');
    expect(requestInfo.url).toStrictEqual(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
    );
    expect(requestInfo.state).toBe('fetching');
  });

  it('handles request in `available` state', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<fetch> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<data> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>, <fetch>, <data>.
<subject> posix:mtime 1668441466;
    posix:size 664.
<fetch> posix:mtime 1668441466;
    posix:size 664.
<data> posix:mtime 1668441466;
    posix:size 1234.`,
    );

    const requestInfo = requestFromContainerDS(ds);

    expect(requestInfo.id).toBe('1cf68ff4-06a4-47dd-a8be-ad365f6c07f5');
    expect(requestInfo.url).toStrictEqual(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
    );
    expect(requestInfo.state).toBe('available');
  });

  it('handles request in `shared` state', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<fetch> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<data> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<consent> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>, <fetch>, <data>, <consent>.
<subject> posix:mtime 1668441466;
    posix:size 664.
<fetch> posix:mtime 1668441466;
    posix:size 664.
<data> posix:mtime 1668441466;
    posix:size 1234.
<consent> posix:mtime 1668441466;
    posix:size 532.`,
    );

    const requestInfo = requestFromContainerDS(ds);

    expect(requestInfo.id).toBe('1cf68ff4-06a4-47dd-a8be-ad365f6c07f5');
    expect(requestInfo.url).toStrictEqual(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
    );
    expect(requestInfo.state).toBe('shared');
  });

  it('should throw if request id can not be found', async () => {
    const ds = await createSolidDatasetFromText(
      new URL('http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/'),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>.
<subject> posix:mtime 1668441466;
    posix:size 664.`,
    );

    await expect(() => requestFromContainerDS(ds)).toThrowError(Error('Expected URL to contain id.'));
  });

  it('should throw if subject resource is missing', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.`,
    );

    await expect(() => requestFromContainerDS(ds)).toThrow();
  });

  it('should throw if fetch resource exists and data resource is missing', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<fetch> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>, <fetch>.
<subject> posix:mtime 1668441466;
    posix:size 664.
<fetch> posix:mtime 1668441466;
    posix:size 664.`,
    );

    await expect(() => requestFromContainerDS(ds)).toThrow();
  });

  it('should throw if fetch resource is missing and data resource exists', async () => {
    const ds = await createSolidDatasetFromText(
      new URL(
        'http://pod.example.com/0c5039c7-e03c-44ad-ad16-b43485dad8ef/egendata/requests/1cf68ff4-06a4-47dd-a8be-ad365f6c07f5/',
      ),
      `@prefix dc: <http://purl.org/dc/terms/>.
@prefix ldp: <http://www.w3.org/ns/ldp#>.
@prefix posix: <http://www.w3.org/ns/posix/stat#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

<> a ldp:Container, ldp:BasicContainer, ldp:Resource;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<subject> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<data> a ldp:Resource, <http://www.w3.org/ns/iana/media-types/text/turtle#Resource>;
    dc:modified "2022-11-14T15:57:46.000Z"^^xsd:dateTime.
<> posix:mtime 1668441466;
    ldp:contains <subject>, <data>.
<subject> posix:mtime 1668441466;
    posix:size 664.
<data> posix:mtime 1668441466;
    posix:size 0.`,
    );

    await expect(() => requestFromContainerDS(ds)).toThrow();
  });
});
