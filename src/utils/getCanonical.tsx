export default function getCanonical(path?: string) {
  if (path) {
    return `https://zenettechnology.com${path.replace(/(\?|#).*/, '')}`;
  }

  return 'https://zenettechnology.com';
}
