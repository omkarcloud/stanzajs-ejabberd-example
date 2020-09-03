/* eslint-disable @typescript-eslint/camelcase */
import { js_beautify } from 'js-beautify'
export const toJsStr = (data: any) => JSON.stringify(data)
export const beautify = (data: any) => js_beautify(toJsStr(data), { indent_size: 2, space_in_empty_paren: true })
export const logo = (data: any) => console.log(beautify(data))
export const logNested = (data: any) => logo(data)
export const logObject = (data: any) => console.log(toJsStr(data))

export async function logProm(p: Promise<any>) {
    logNested(await p)
}