export const applyProcessMask = (value: string): string => {
  const cleanValue = value.replace(/\D/g, '').slice(0, 20);
  return cleanValue
    .replace(/^(\d{7})(\d)/, '$1-$2')
    .replace(/-(\d{2})(\d)/, '-$1.$2')
    .replace(/\.(\d{4})(\d)/, '.$1.$2')
    .replace(/\.(\d{1})(\d)/, '.$1.$2')
    .replace(/\.(\d{2})(\d)/, '.$1.$2');
};

export const maskValue = (value: string, maskType?: string): string => {
  if (!maskType || !value) return value;
  const handlers: Record<string, (v: string) => string> = {
    process: applyProcessMask,
  };
  return handlers[maskType] ? handlers[maskType](value) : value;
};