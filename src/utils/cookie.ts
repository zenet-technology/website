export function setCookie(name: string, value: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  document.cookie = `${name}=${value}; Path=/; Expires=Thu, 01 Jan 2099 00:00:01 GMT;`;
}

export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const cookie: Record<string, string> = {};

  for (const el of document.cookie.split(';')) {
    const [key, value] = el.trim().split('=');
    cookie[key] = value;
  }

  return cookie[name] || null;
}

export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
