export default function getCanonical(path: string) {
  return `https://zenettechnology.com${path.replace(/(\?|#).*/, '')}`;
}
