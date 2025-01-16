/*--------------------------------------------------------------------------

@sinclair/typebox/type

The MIT License (MIT)

Copyright (c) 2017-2025 Haydn Paterson (sinclair) <haydn.developer@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---------------------------------------------------------------------------*/

import type { TSchema, SchemaOptions } from '../schema/index'
import { Kind } from '../symbols/index'
import { CreateType } from '../create/type'

export interface DateOptions extends SchemaOptions {
  /** The exclusive maximum timestamp value */
  exclusiveMaximumTimestamp?: number
  /** The exclusive minimum timestamp value */
  exclusiveMinimumTimestamp?: number
  /** The maximum timestamp value */
  maximumTimestamp?: number
  /** The minimum timestamp value */
  minimumTimestamp?: number
  /** The multiple of timestamp value */
  multipleOfTimestamp?: number
}
export interface TDate extends TSchema, DateOptions {
  [Kind]: 'Date'
  static: Date
  type: 'date'
}
/** `[JavaScript]` Creates a Date type */
export function Date(options?: DateOptions): TDate {
  return CreateType({ [Kind]: 'Date', type: 'Date' }, options) as never
}
