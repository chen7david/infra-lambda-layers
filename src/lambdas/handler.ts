import * as math from '/opt/helpers/math'
import { ulid } from 'ulid'

export const handler = async (event: any = {}): Promise<any> => {
    console.log('addition', math.add(5, 5))
    console.log('subtraction', math.sub(5, 5))
    console.log('Unique lex sortable id:', ulid())
}