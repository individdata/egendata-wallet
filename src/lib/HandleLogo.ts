export const decodeLogo = (url: string): string => {
  // console.log('decodeLogo', url);

  const data = url.startsWith('data:') ? url.split(',')[1] : '';

  return Buffer.from(data, 'base64').toString();
};
