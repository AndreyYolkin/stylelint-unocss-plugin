export const isString = (val: unknown): val is string => typeof val === 'string'
export const isObject = (val: unknown): val is Record<string, unknown> => typeof val === 'object' && val !== null