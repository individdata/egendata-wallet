export type AccessMode = 'Control' | 'Read' | 'Write' | 'Append';

export type acl = {
  label: string;
  agent: string;
  mode: AccessMode[];
}[];

export const turtleACL = (url: string, acl: acl) => {
  const turtle = acl.map((acl) => {
    const mode = acl.mode.map((m) => `acl:${m}`);
    // prettier-ignore
    return `<#${acl.label}> a acl:Authorization ;\n  acl:accessTo <${url}> ;\n  acl:agent <${acl.agent}> ;\n  acl:mode ${mode.join(', ')} .`;
  });
  return `@prefix acl: <http://www.w3.org/ns/auth/acl#> .\n${turtle.join('\n')}`;
};

export const aclURL = (url: URL): URL => {
  if (url.pathname.endsWith('/')) {
    return new URL('.acl', url);
  }

  const id = url.pathname.split('/').pop();
  return new URL(`${id}.acl`, url);
};
