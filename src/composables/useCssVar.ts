export function useCssVar(varName: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()

  return value
}
