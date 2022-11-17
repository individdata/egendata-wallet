import { turtleACL, aclURL, AccessMode } from './acl';

describe('turtleACL', () => {
  it('should return turtle for simple ACL', () => {
    const acl = [
      {
        label: 'owner',
        agent: 'http://pod.example.com/agent/card#me',
        mode: ['Read'] as AccessMode[],
      },
    ];

    const turtle = turtleACL('http://pod.example.com/testuser/resource', acl);

    expect(turtle).toBe(
      `@prefix acl: <http://www.w3.org/ns/auth/acl#> .
<#owner> a acl:Authorization ;
  acl:accessTo <http://pod.example.com/testuser/resource> ;
  acl:agent <http://pod.example.com/agent/card#me> ;
  acl:mode acl:Read .`,
    );
  });
  it('should return turtle for ACL with multiple agents', () => {
    const acl = [
      {
        label: 'requestor',
        agent: 'http://pod.example.com/requestor/card#me',
        mode: ['Read'] as AccessMode[],
      },
      {
        label: 'owner',
        agent: 'http://pod.example.com/agent/card#me',
        mode: ['Control', 'Write', 'Read', 'Append'] as AccessMode[],
      },
    ];

    const turtle = turtleACL('http://pod.example.com/testuser/resource', acl);

    expect(turtle).toBe(
      `@prefix acl: <http://www.w3.org/ns/auth/acl#> .
<#requestor> a acl:Authorization ;
  acl:accessTo <http://pod.example.com/testuser/resource> ;
  acl:agent <http://pod.example.com/requestor/card#me> ;
  acl:mode acl:Read .
<#owner> a acl:Authorization ;
  acl:accessTo <http://pod.example.com/testuser/resource> ;
  acl:agent <http://pod.example.com/agent/card#me> ;
  acl:mode acl:Control, acl:Write, acl:Read, acl:Append .`,
    );
  });
});

describe('aclURL', () => {
  it('should return correct URL for resource', () => {
    const resource = new URL('http://pod.example.com/testuser/resource');

    const url = aclURL(resource);

    expect(url).toEqual(new URL('http://pod.example.com/testuser/resource.acl'));
  });

  it('should return correct URL for container', () => {
    const resource = new URL('http://pod.example.com/testuser/container/');

    const url = aclURL(resource);

    expect(url).toEqual(new URL('http://pod.example.com/testuser/container.acl'));
  });

  it('should return correct URL for container within container', () => {
    const resource = new URL('http://pod.example.com/testuser/some_container/container/');

    const url = aclURL(resource);

    expect(url).toEqual(new URL('http://pod.example.com/testuser/some_container/container.acl'));
  });
});
