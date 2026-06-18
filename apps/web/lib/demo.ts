const DEMO_STORAGE_KEY = 'padeal_demo';

export function isDemoModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
}

export function isDemoSessionActive(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(DEMO_STORAGE_KEY) === 'true';
}

export function enableDemoSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(DEMO_STORAGE_KEY, 'true');
}

export function disableDemoSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(DEMO_STORAGE_KEY);
}
