import express from 'express'
import mongoose from 'mongoose'

import { DEFAULTS } from '../constants/defaults'
import { ENUM_SORT_ORDER } from '../constants/enum.sort.order'
import { OPTIONS } from '../constants/options'
import { TYPE_SORT } from '../constants/type.sort'

export interface InterfaceMongooseOptions {
  limit?: number
  skip?: number
  sort?: any
  fields?: string[]
}

export class ExpressRequestMongooseUtil<T extends mongoose.Document> {
  // Class Properties
  _request: express.Request

  constructor(request: express.Request) {
    this._request = request
  }

  requestArgs(ignore: string[] = []): any {
    const args = {
      ...ExpressRequestMongooseUtil.objectToArgs(this._request.query, ignore),
      ...ExpressRequestMongooseUtil.objectToArgs(this._request.params, ignore),
      ...ExpressRequestMongooseUtil.objectToArgs(this._request.body, ignore),
    }

    return args
  }

  static objectToArgs(obj: any, ignore: string[] = []): any {
    return Object.keys(obj).reduce(
      (args: InterfaceMongooseOptions, key: string) => {
        if (OPTIONS[key]) {
          return args
        }

        return {
          ...args,
          [key]: obj[key],
        }
      },
      {}
    )
  }

  requestOptions(ignore: string[] = []): any {
    const options = {
      ...ExpressRequestMongooseUtil.objectToMongooseOptions(
        this._request.query,
        ignore
      ),
      ...ExpressRequestMongooseUtil.objectToMongooseOptions(
        this._request.params,
        ignore
      ),
      ...ExpressRequestMongooseUtil.objectToMongooseOptions(
        this._request.body,
        ignore
      ),
    }

    return options
  }

  static objectToMongooseOptions(obj: any, ignore: string[] = []): any {
    return Object.keys(obj).reduce(
      (options: InterfaceMongooseOptions, key: string) => {
        if (ignore.includes(key)) {
          return options
        }

        if (Object.values(OPTIONS).includes(key)) {
          return {
            ...options,
            ...ExpressRequestMongooseUtil.mapRequestArgToMongoose(obj, key),
          }
        }

        return options
      },
      {}
    )
  }

  static mapRequestArgToMongoose(obj: any, key: string): any {
    switch (key) {
      case OPTIONS.PAGE:
      case OPTIONS.PAGE_SIZE:
        const limit = parseInt(obj[OPTIONS.PAGE_SIZE] || DEFAULTS.PAGE_SIZE)

        return {
          limit,
          skip: parseInt(obj[OPTIONS.PAGE] || DEFAULTS.PAGE) * limit,
        }
      case OPTIONS.SORT_BY:
      case OPTIONS.SORT_ORDER:
        return {
          sort: {
            [obj[OPTIONS.SORT_BY] || DEFAULTS.SORT_BY]:
              obj[OPTIONS.SORT_ORDER]?.toUpperCase() === TYPE_SORT.DESC
                ? ENUM_SORT_ORDER.DESC
                : ENUM_SORT_ORDER.ASC,
          },
        }
      default:
        return { [key]: obj[key] }
    }
  }

  requestFilterQuery(): mongoose.FilterQuery<T> {
    return {
      ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query),
      ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params),
      ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body),
    }
  }

  queryFilterQuery(): mongoose.FilterQuery<T> {
    return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query)
  }
  paramsFilterQuery(): mongoose.FilterQuery<T> {
    return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params)
  }

  bodyFilterQuery(): mongoose.FilterQuery<T> {
    return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body)
  }

  querySort(): Record<string, mongoose.SortValues> {
    return ExpressRequestMongooseUtil.objectToSortQuery(this._request.query)
  }

  static objectToFilterQuery(obj: any) {
    return Object.keys(obj).reduce((query: any, key: string) => {
      const useKey: string = key === 'id' ? '_id' : key

      if (useKey === 'ids') {
        query._id = ExpressRequestMongooseUtil.in(obj[key])
        return query
      }

      if (!Object.values(OPTIONS).includes(key)) {
        query[useKey] = obj[key]
      }

      return query
    }, {})
  }

  static objectToSortQuery(obj: any): Record<string, mongoose.SortValues> {
    const sortBy = (obj.sortBy as string) ?? 'createdAt'
    const sortOrder = obj.sortOrder.toLowerCase() === 'asc' ? -1 : 1

    return {
      [sortBy]: sortOrder,
    }
  }

  queryUpdateQuery(): mongoose.UpdateQuery<T> {
    return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.query)
  }

  bodyUpdateQuery(): mongoose.UpdateQuery<T> {
    return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.body)
  }

  static objectToUpdateQuery(obj: any) {
    return Object.keys(obj).reduce((query: any, key: string) => {
      if (!Object.values(OPTIONS).includes(key)) {
        query[key] = obj[key]
      }

      return query
    }, {})
  }

  static in(ids: string[]) {
    const objectIds: mongoose.Types.ObjectId[] = ids.map(
      (id: string) => new mongoose.Types.ObjectId(id)
    )

    return { $in: objectIds }
  }
}
