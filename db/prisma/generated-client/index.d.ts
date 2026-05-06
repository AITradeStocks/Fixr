
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Contractor
 * 
 */
export type Contractor = $Result.DefaultSelection<Prisma.$ContractorPayload>
/**
 * Model ContractorEmail
 * 
 */
export type ContractorEmail = $Result.DefaultSelection<Prisma.$ContractorEmailPayload>
/**
 * Model ContractorPhone
 * 
 */
export type ContractorPhone = $Result.DefaultSelection<Prisma.$ContractorPhonePayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model LocationLog
 * 
 */
export type LocationLog = $Result.DefaultSelection<Prisma.$LocationLogPayload>
/**
 * Model PricingEvent
 * 
 */
export type PricingEvent = $Result.DefaultSelection<Prisma.$PricingEventPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model ContractorLead
 * 
 */
export type ContractorLead = $Result.DefaultSelection<Prisma.$ContractorLeadPayload>
/**
 * Model AdminAction
 * 
 */
export type AdminAction = $Result.DefaultSelection<Prisma.$AdminActionPayload>
/**
 * Model VerificationCode
 * 
 */
export type VerificationCode = $Result.DefaultSelection<Prisma.$VerificationCodePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.contractor`: Exposes CRUD operations for the **Contractor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contractors
    * const contractors = await prisma.contractor.findMany()
    * ```
    */
  get contractor(): Prisma.ContractorDelegate<ExtArgs>;

  /**
   * `prisma.contractorEmail`: Exposes CRUD operations for the **ContractorEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractorEmails
    * const contractorEmails = await prisma.contractorEmail.findMany()
    * ```
    */
  get contractorEmail(): Prisma.ContractorEmailDelegate<ExtArgs>;

  /**
   * `prisma.contractorPhone`: Exposes CRUD operations for the **ContractorPhone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractorPhones
    * const contractorPhones = await prisma.contractorPhone.findMany()
    * ```
    */
  get contractorPhone(): Prisma.ContractorPhoneDelegate<ExtArgs>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs>;

  /**
   * `prisma.locationLog`: Exposes CRUD operations for the **LocationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocationLogs
    * const locationLogs = await prisma.locationLog.findMany()
    * ```
    */
  get locationLog(): Prisma.LocationLogDelegate<ExtArgs>;

  /**
   * `prisma.pricingEvent`: Exposes CRUD operations for the **PricingEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingEvents
    * const pricingEvents = await prisma.pricingEvent.findMany()
    * ```
    */
  get pricingEvent(): Prisma.PricingEventDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.contractorLead`: Exposes CRUD operations for the **ContractorLead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ContractorLeads
    * const contractorLeads = await prisma.contractorLead.findMany()
    * ```
    */
  get contractorLead(): Prisma.ContractorLeadDelegate<ExtArgs>;

  /**
   * `prisma.adminAction`: Exposes CRUD operations for the **AdminAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminActions
    * const adminActions = await prisma.adminAction.findMany()
    * ```
    */
  get adminAction(): Prisma.AdminActionDelegate<ExtArgs>;

  /**
   * `prisma.verificationCode`: Exposes CRUD operations for the **VerificationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationCodes
    * const verificationCodes = await prisma.verificationCode.findMany()
    * ```
    */
  get verificationCode(): Prisma.VerificationCodeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Contractor: 'Contractor',
    ContractorEmail: 'ContractorEmail',
    ContractorPhone: 'ContractorPhone',
    Job: 'Job',
    Part: 'Part',
    LocationLog: 'LocationLog',
    PricingEvent: 'PricingEvent',
    Review: 'Review',
    ContractorLead: 'ContractorLead',
    AdminAction: 'AdminAction',
    VerificationCode: 'VerificationCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "contractor" | "contractorEmail" | "contractorPhone" | "job" | "part" | "locationLog" | "pricingEvent" | "review" | "contractorLead" | "adminAction" | "verificationCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Contractor: {
        payload: Prisma.$ContractorPayload<ExtArgs>
        fields: Prisma.ContractorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          findFirst: {
            args: Prisma.ContractorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          findMany: {
            args: Prisma.ContractorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>[]
          }
          create: {
            args: Prisma.ContractorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          createMany: {
            args: Prisma.ContractorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>[]
          }
          delete: {
            args: Prisma.ContractorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          update: {
            args: Prisma.ContractorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          deleteMany: {
            args: Prisma.ContractorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPayload>
          }
          aggregate: {
            args: Prisma.ContractorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractor>
          }
          groupBy: {
            args: Prisma.ContractorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractorCountArgs<ExtArgs>
            result: $Utils.Optional<ContractorCountAggregateOutputType> | number
          }
        }
      }
      ContractorEmail: {
        payload: Prisma.$ContractorEmailPayload<ExtArgs>
        fields: Prisma.ContractorEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractorEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractorEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          findFirst: {
            args: Prisma.ContractorEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractorEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          findMany: {
            args: Prisma.ContractorEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>[]
          }
          create: {
            args: Prisma.ContractorEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          createMany: {
            args: Prisma.ContractorEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractorEmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>[]
          }
          delete: {
            args: Prisma.ContractorEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          update: {
            args: Prisma.ContractorEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          deleteMany: {
            args: Prisma.ContractorEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractorEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractorEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorEmailPayload>
          }
          aggregate: {
            args: Prisma.ContractorEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractorEmail>
          }
          groupBy: {
            args: Prisma.ContractorEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractorEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractorEmailCountArgs<ExtArgs>
            result: $Utils.Optional<ContractorEmailCountAggregateOutputType> | number
          }
        }
      }
      ContractorPhone: {
        payload: Prisma.$ContractorPhonePayload<ExtArgs>
        fields: Prisma.ContractorPhoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractorPhoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractorPhoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          findFirst: {
            args: Prisma.ContractorPhoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractorPhoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          findMany: {
            args: Prisma.ContractorPhoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>[]
          }
          create: {
            args: Prisma.ContractorPhoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          createMany: {
            args: Prisma.ContractorPhoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractorPhoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>[]
          }
          delete: {
            args: Prisma.ContractorPhoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          update: {
            args: Prisma.ContractorPhoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          deleteMany: {
            args: Prisma.ContractorPhoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractorPhoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractorPhoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorPhonePayload>
          }
          aggregate: {
            args: Prisma.ContractorPhoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractorPhone>
          }
          groupBy: {
            args: Prisma.ContractorPhoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractorPhoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractorPhoneCountArgs<ExtArgs>
            result: $Utils.Optional<ContractorPhoneCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      LocationLog: {
        payload: Prisma.$LocationLogPayload<ExtArgs>
        fields: Prisma.LocationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          findFirst: {
            args: Prisma.LocationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          findMany: {
            args: Prisma.LocationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>[]
          }
          create: {
            args: Prisma.LocationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          createMany: {
            args: Prisma.LocationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>[]
          }
          delete: {
            args: Prisma.LocationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          update: {
            args: Prisma.LocationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          deleteMany: {
            args: Prisma.LocationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LocationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationLogPayload>
          }
          aggregate: {
            args: Prisma.LocationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocationLog>
          }
          groupBy: {
            args: Prisma.LocationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationLogCountArgs<ExtArgs>
            result: $Utils.Optional<LocationLogCountAggregateOutputType> | number
          }
        }
      }
      PricingEvent: {
        payload: Prisma.$PricingEventPayload<ExtArgs>
        fields: Prisma.PricingEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          findFirst: {
            args: Prisma.PricingEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          findMany: {
            args: Prisma.PricingEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>[]
          }
          create: {
            args: Prisma.PricingEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          createMany: {
            args: Prisma.PricingEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PricingEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>[]
          }
          delete: {
            args: Prisma.PricingEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          update: {
            args: Prisma.PricingEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          deleteMany: {
            args: Prisma.PricingEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingEventPayload>
          }
          aggregate: {
            args: Prisma.PricingEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingEvent>
          }
          groupBy: {
            args: Prisma.PricingEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingEventCountArgs<ExtArgs>
            result: $Utils.Optional<PricingEventCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      ContractorLead: {
        payload: Prisma.$ContractorLeadPayload<ExtArgs>
        fields: Prisma.ContractorLeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContractorLeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContractorLeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          findFirst: {
            args: Prisma.ContractorLeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContractorLeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          findMany: {
            args: Prisma.ContractorLeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>[]
          }
          create: {
            args: Prisma.ContractorLeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          createMany: {
            args: Prisma.ContractorLeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContractorLeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>[]
          }
          delete: {
            args: Prisma.ContractorLeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          update: {
            args: Prisma.ContractorLeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          deleteMany: {
            args: Prisma.ContractorLeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContractorLeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ContractorLeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContractorLeadPayload>
          }
          aggregate: {
            args: Prisma.ContractorLeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContractorLead>
          }
          groupBy: {
            args: Prisma.ContractorLeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContractorLeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContractorLeadCountArgs<ExtArgs>
            result: $Utils.Optional<ContractorLeadCountAggregateOutputType> | number
          }
        }
      }
      AdminAction: {
        payload: Prisma.$AdminActionPayload<ExtArgs>
        fields: Prisma.AdminActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          findFirst: {
            args: Prisma.AdminActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          findMany: {
            args: Prisma.AdminActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>[]
          }
          create: {
            args: Prisma.AdminActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          createMany: {
            args: Prisma.AdminActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>[]
          }
          delete: {
            args: Prisma.AdminActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          update: {
            args: Prisma.AdminActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          deleteMany: {
            args: Prisma.AdminActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          aggregate: {
            args: Prisma.AdminActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminAction>
          }
          groupBy: {
            args: Prisma.AdminActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminActionCountArgs<ExtArgs>
            result: $Utils.Optional<AdminActionCountAggregateOutputType> | number
          }
        }
      }
      VerificationCode: {
        payload: Prisma.$VerificationCodePayload<ExtArgs>
        fields: Prisma.VerificationCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          findFirst: {
            args: Prisma.VerificationCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          findMany: {
            args: Prisma.VerificationCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>[]
          }
          create: {
            args: Prisma.VerificationCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          createMany: {
            args: Prisma.VerificationCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>[]
          }
          delete: {
            args: Prisma.VerificationCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          update: {
            args: Prisma.VerificationCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          deleteMany: {
            args: Prisma.VerificationCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VerificationCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationCodePayload>
          }
          aggregate: {
            args: Prisma.VerificationCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationCode>
          }
          groupBy: {
            args: Prisma.VerificationCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCodeCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCodeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jobs: number
    reviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | UserCountOutputTypeCountJobsArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type ContractorCountOutputType
   */

  export type ContractorCountOutputType = {
    emails: number
    phones: number
    jobs: number
    reviews: number
  }

  export type ContractorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | ContractorCountOutputTypeCountEmailsArgs
    phones?: boolean | ContractorCountOutputTypeCountPhonesArgs
    jobs?: boolean | ContractorCountOutputTypeCountJobsArgs
    reviews?: boolean | ContractorCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * ContractorCountOutputType without action
   */
  export type ContractorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorCountOutputType
     */
    select?: ContractorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContractorCountOutputType without action
   */
  export type ContractorCountOutputTypeCountEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorEmailWhereInput
  }

  /**
   * ContractorCountOutputType without action
   */
  export type ContractorCountOutputTypeCountPhonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorPhoneWhereInput
  }

  /**
   * ContractorCountOutputType without action
   */
  export type ContractorCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * ContractorCountOutputType without action
   */
  export type ContractorCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    parts: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parts?: boolean | JobCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    jobs?: boolean | User$jobsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | User$jobsArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      jobs: Prisma.$JobPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends User$jobsArgs<ExtArgs> = {}>(args?: Subset<T, User$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.jobs
   */
  export type User$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Contractor
   */

  export type AggregateContractor = {
    _count: ContractorCountAggregateOutputType | null
    _avg: ContractorAvgAggregateOutputType | null
    _sum: ContractorSumAggregateOutputType | null
    _min: ContractorMinAggregateOutputType | null
    _max: ContractorMaxAggregateOutputType | null
  }

  export type ContractorAvgAggregateOutputType = {
    rating: number | null
    reviewCount: number | null
    hiredCount: number | null
    recommendations: number | null
  }

  export type ContractorSumAggregateOutputType = {
    rating: number | null
    reviewCount: number | null
    hiredCount: number | null
    recommendations: number | null
  }

  export type ContractorMinAggregateOutputType = {
    id: string | null
    name: string | null
    passwordHash: string | null
    trade: string | null
    businessType: string | null
    status: string | null
    rating: number | null
    insuranceUploaded: boolean | null
    isLicensed: boolean | null
    isVerified: boolean | null
    headline: string | null
    location: string | null
    website: string | null
    owner: string | null
    abn: string | null
    postcode: string | null
    about: string | null
    logo_url: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isContactVerified: boolean | null
    suburb: string | null
    reviewCount: number | null
    hiredCount: number | null
    recommendations: number | null
    profileUrl: string | null
  }

  export type ContractorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    passwordHash: string | null
    trade: string | null
    businessType: string | null
    status: string | null
    rating: number | null
    insuranceUploaded: boolean | null
    isLicensed: boolean | null
    isVerified: boolean | null
    headline: string | null
    location: string | null
    website: string | null
    owner: string | null
    abn: string | null
    postcode: string | null
    about: string | null
    logo_url: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isContactVerified: boolean | null
    suburb: string | null
    reviewCount: number | null
    hiredCount: number | null
    recommendations: number | null
    profileUrl: string | null
  }

  export type ContractorCountAggregateOutputType = {
    id: number
    name: number
    passwordHash: number
    trade: number
    businessType: number
    zipCodes: number
    status: number
    rating: number
    insuranceUploaded: number
    isLicensed: number
    isVerified: number
    headline: number
    location: number
    website: number
    owner: number
    abn: number
    licenses: number
    postcode: number
    about: number
    logo_url: number
    address: number
    createdAt: number
    updatedAt: number
    isContactVerified: number
    suburb: number
    reviewCount: number
    hiredCount: number
    recommendations: number
    profileUrl: number
    _all: number
  }


  export type ContractorAvgAggregateInputType = {
    rating?: true
    reviewCount?: true
    hiredCount?: true
    recommendations?: true
  }

  export type ContractorSumAggregateInputType = {
    rating?: true
    reviewCount?: true
    hiredCount?: true
    recommendations?: true
  }

  export type ContractorMinAggregateInputType = {
    id?: true
    name?: true
    passwordHash?: true
    trade?: true
    businessType?: true
    status?: true
    rating?: true
    insuranceUploaded?: true
    isLicensed?: true
    isVerified?: true
    headline?: true
    location?: true
    website?: true
    owner?: true
    abn?: true
    postcode?: true
    about?: true
    logo_url?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    isContactVerified?: true
    suburb?: true
    reviewCount?: true
    hiredCount?: true
    recommendations?: true
    profileUrl?: true
  }

  export type ContractorMaxAggregateInputType = {
    id?: true
    name?: true
    passwordHash?: true
    trade?: true
    businessType?: true
    status?: true
    rating?: true
    insuranceUploaded?: true
    isLicensed?: true
    isVerified?: true
    headline?: true
    location?: true
    website?: true
    owner?: true
    abn?: true
    postcode?: true
    about?: true
    logo_url?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    isContactVerified?: true
    suburb?: true
    reviewCount?: true
    hiredCount?: true
    recommendations?: true
    profileUrl?: true
  }

  export type ContractorCountAggregateInputType = {
    id?: true
    name?: true
    passwordHash?: true
    trade?: true
    businessType?: true
    zipCodes?: true
    status?: true
    rating?: true
    insuranceUploaded?: true
    isLicensed?: true
    isVerified?: true
    headline?: true
    location?: true
    website?: true
    owner?: true
    abn?: true
    licenses?: true
    postcode?: true
    about?: true
    logo_url?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    isContactVerified?: true
    suburb?: true
    reviewCount?: true
    hiredCount?: true
    recommendations?: true
    profileUrl?: true
    _all?: true
  }

  export type ContractorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contractor to aggregate.
     */
    where?: ContractorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contractors to fetch.
     */
    orderBy?: ContractorOrderByWithRelationInput | ContractorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contractors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contractors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contractors
    **/
    _count?: true | ContractorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContractorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContractorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractorMaxAggregateInputType
  }

  export type GetContractorAggregateType<T extends ContractorAggregateArgs> = {
        [P in keyof T & keyof AggregateContractor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractor[P]>
      : GetScalarType<T[P], AggregateContractor[P]>
  }




  export type ContractorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorWhereInput
    orderBy?: ContractorOrderByWithAggregationInput | ContractorOrderByWithAggregationInput[]
    by: ContractorScalarFieldEnum[] | ContractorScalarFieldEnum
    having?: ContractorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractorCountAggregateInputType | true
    _avg?: ContractorAvgAggregateInputType
    _sum?: ContractorSumAggregateInputType
    _min?: ContractorMinAggregateInputType
    _max?: ContractorMaxAggregateInputType
  }

  export type ContractorGroupByOutputType = {
    id: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes: string[]
    status: string
    rating: number | null
    insuranceUploaded: boolean
    isLicensed: boolean
    isVerified: boolean
    headline: string | null
    location: string | null
    website: string | null
    owner: string | null
    abn: string | null
    licenses: string[]
    postcode: string | null
    about: string | null
    logo_url: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    isContactVerified: boolean
    suburb: string | null
    reviewCount: number
    hiredCount: number
    recommendations: number
    profileUrl: string | null
    _count: ContractorCountAggregateOutputType | null
    _avg: ContractorAvgAggregateOutputType | null
    _sum: ContractorSumAggregateOutputType | null
    _min: ContractorMinAggregateOutputType | null
    _max: ContractorMaxAggregateOutputType | null
  }

  type GetContractorGroupByPayload<T extends ContractorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractorGroupByOutputType[P]>
            : GetScalarType<T[P], ContractorGroupByOutputType[P]>
        }
      >
    >


  export type ContractorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    passwordHash?: boolean
    trade?: boolean
    businessType?: boolean
    zipCodes?: boolean
    status?: boolean
    rating?: boolean
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: boolean
    location?: boolean
    website?: boolean
    owner?: boolean
    abn?: boolean
    licenses?: boolean
    postcode?: boolean
    about?: boolean
    logo_url?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isContactVerified?: boolean
    suburb?: boolean
    reviewCount?: boolean
    hiredCount?: boolean
    recommendations?: boolean
    profileUrl?: boolean
    emails?: boolean | Contractor$emailsArgs<ExtArgs>
    phones?: boolean | Contractor$phonesArgs<ExtArgs>
    jobs?: boolean | Contractor$jobsArgs<ExtArgs>
    reviews?: boolean | Contractor$reviewsArgs<ExtArgs>
    _count?: boolean | ContractorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractor"]>

  export type ContractorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    passwordHash?: boolean
    trade?: boolean
    businessType?: boolean
    zipCodes?: boolean
    status?: boolean
    rating?: boolean
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: boolean
    location?: boolean
    website?: boolean
    owner?: boolean
    abn?: boolean
    licenses?: boolean
    postcode?: boolean
    about?: boolean
    logo_url?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isContactVerified?: boolean
    suburb?: boolean
    reviewCount?: boolean
    hiredCount?: boolean
    recommendations?: boolean
    profileUrl?: boolean
  }, ExtArgs["result"]["contractor"]>

  export type ContractorSelectScalar = {
    id?: boolean
    name?: boolean
    passwordHash?: boolean
    trade?: boolean
    businessType?: boolean
    zipCodes?: boolean
    status?: boolean
    rating?: boolean
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: boolean
    location?: boolean
    website?: boolean
    owner?: boolean
    abn?: boolean
    licenses?: boolean
    postcode?: boolean
    about?: boolean
    logo_url?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isContactVerified?: boolean
    suburb?: boolean
    reviewCount?: boolean
    hiredCount?: boolean
    recommendations?: boolean
    profileUrl?: boolean
  }

  export type ContractorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    emails?: boolean | Contractor$emailsArgs<ExtArgs>
    phones?: boolean | Contractor$phonesArgs<ExtArgs>
    jobs?: boolean | Contractor$jobsArgs<ExtArgs>
    reviews?: boolean | Contractor$reviewsArgs<ExtArgs>
    _count?: boolean | ContractorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContractorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ContractorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contractor"
    objects: {
      emails: Prisma.$ContractorEmailPayload<ExtArgs>[]
      phones: Prisma.$ContractorPhonePayload<ExtArgs>[]
      jobs: Prisma.$JobPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      passwordHash: string
      trade: string
      businessType: string
      zipCodes: string[]
      status: string
      rating: number | null
      insuranceUploaded: boolean
      isLicensed: boolean
      isVerified: boolean
      headline: string | null
      location: string | null
      website: string | null
      owner: string | null
      abn: string | null
      licenses: string[]
      postcode: string | null
      about: string | null
      logo_url: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
      isContactVerified: boolean
      suburb: string | null
      reviewCount: number
      hiredCount: number
      recommendations: number
      profileUrl: string | null
    }, ExtArgs["result"]["contractor"]>
    composites: {}
  }

  type ContractorGetPayload<S extends boolean | null | undefined | ContractorDefaultArgs> = $Result.GetResult<Prisma.$ContractorPayload, S>

  type ContractorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractorFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractorCountAggregateInputType | true
    }

  export interface ContractorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contractor'], meta: { name: 'Contractor' } }
    /**
     * Find zero or one Contractor that matches the filter.
     * @param {ContractorFindUniqueArgs} args - Arguments to find a Contractor
     * @example
     * // Get one Contractor
     * const contractor = await prisma.contractor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractorFindUniqueArgs>(args: SelectSubset<T, ContractorFindUniqueArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Contractor that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractorFindUniqueOrThrowArgs} args - Arguments to find a Contractor
     * @example
     * // Get one Contractor
     * const contractor = await prisma.contractor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractorFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Contractor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorFindFirstArgs} args - Arguments to find a Contractor
     * @example
     * // Get one Contractor
     * const contractor = await prisma.contractor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractorFindFirstArgs>(args?: SelectSubset<T, ContractorFindFirstArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Contractor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorFindFirstOrThrowArgs} args - Arguments to find a Contractor
     * @example
     * // Get one Contractor
     * const contractor = await prisma.contractor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractorFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Contractors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contractors
     * const contractors = await prisma.contractor.findMany()
     * 
     * // Get first 10 Contractors
     * const contractors = await prisma.contractor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractorWithIdOnly = await prisma.contractor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractorFindManyArgs>(args?: SelectSubset<T, ContractorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Contractor.
     * @param {ContractorCreateArgs} args - Arguments to create a Contractor.
     * @example
     * // Create one Contractor
     * const Contractor = await prisma.contractor.create({
     *   data: {
     *     // ... data to create a Contractor
     *   }
     * })
     * 
     */
    create<T extends ContractorCreateArgs>(args: SelectSubset<T, ContractorCreateArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Contractors.
     * @param {ContractorCreateManyArgs} args - Arguments to create many Contractors.
     * @example
     * // Create many Contractors
     * const contractor = await prisma.contractor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractorCreateManyArgs>(args?: SelectSubset<T, ContractorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contractors and returns the data saved in the database.
     * @param {ContractorCreateManyAndReturnArgs} args - Arguments to create many Contractors.
     * @example
     * // Create many Contractors
     * const contractor = await prisma.contractor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contractors and only return the `id`
     * const contractorWithIdOnly = await prisma.contractor.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractorCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Contractor.
     * @param {ContractorDeleteArgs} args - Arguments to delete one Contractor.
     * @example
     * // Delete one Contractor
     * const Contractor = await prisma.contractor.delete({
     *   where: {
     *     // ... filter to delete one Contractor
     *   }
     * })
     * 
     */
    delete<T extends ContractorDeleteArgs>(args: SelectSubset<T, ContractorDeleteArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Contractor.
     * @param {ContractorUpdateArgs} args - Arguments to update one Contractor.
     * @example
     * // Update one Contractor
     * const contractor = await prisma.contractor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractorUpdateArgs>(args: SelectSubset<T, ContractorUpdateArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Contractors.
     * @param {ContractorDeleteManyArgs} args - Arguments to filter Contractors to delete.
     * @example
     * // Delete a few Contractors
     * const { count } = await prisma.contractor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractorDeleteManyArgs>(args?: SelectSubset<T, ContractorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contractors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contractors
     * const contractor = await prisma.contractor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractorUpdateManyArgs>(args: SelectSubset<T, ContractorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Contractor.
     * @param {ContractorUpsertArgs} args - Arguments to update or create a Contractor.
     * @example
     * // Update or create a Contractor
     * const contractor = await prisma.contractor.upsert({
     *   create: {
     *     // ... data to create a Contractor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contractor we want to update
     *   }
     * })
     */
    upsert<T extends ContractorUpsertArgs>(args: SelectSubset<T, ContractorUpsertArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Contractors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorCountArgs} args - Arguments to filter Contractors to count.
     * @example
     * // Count the number of Contractors
     * const count = await prisma.contractor.count({
     *   where: {
     *     // ... the filter for the Contractors we want to count
     *   }
     * })
    **/
    count<T extends ContractorCountArgs>(
      args?: Subset<T, ContractorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contractor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractorAggregateArgs>(args: Subset<T, ContractorAggregateArgs>): Prisma.PrismaPromise<GetContractorAggregateType<T>>

    /**
     * Group by Contractor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractorGroupByArgs['orderBy'] }
        : { orderBy?: ContractorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contractor model
   */
  readonly fields: ContractorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contractor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    emails<T extends Contractor$emailsArgs<ExtArgs> = {}>(args?: Subset<T, Contractor$emailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findMany"> | Null>
    phones<T extends Contractor$phonesArgs<ExtArgs> = {}>(args?: Subset<T, Contractor$phonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findMany"> | Null>
    jobs<T extends Contractor$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Contractor$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends Contractor$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Contractor$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contractor model
   */ 
  interface ContractorFieldRefs {
    readonly id: FieldRef<"Contractor", 'String'>
    readonly name: FieldRef<"Contractor", 'String'>
    readonly passwordHash: FieldRef<"Contractor", 'String'>
    readonly trade: FieldRef<"Contractor", 'String'>
    readonly businessType: FieldRef<"Contractor", 'String'>
    readonly zipCodes: FieldRef<"Contractor", 'String[]'>
    readonly status: FieldRef<"Contractor", 'String'>
    readonly rating: FieldRef<"Contractor", 'Float'>
    readonly insuranceUploaded: FieldRef<"Contractor", 'Boolean'>
    readonly isLicensed: FieldRef<"Contractor", 'Boolean'>
    readonly isVerified: FieldRef<"Contractor", 'Boolean'>
    readonly headline: FieldRef<"Contractor", 'String'>
    readonly location: FieldRef<"Contractor", 'String'>
    readonly website: FieldRef<"Contractor", 'String'>
    readonly owner: FieldRef<"Contractor", 'String'>
    readonly abn: FieldRef<"Contractor", 'String'>
    readonly licenses: FieldRef<"Contractor", 'String[]'>
    readonly postcode: FieldRef<"Contractor", 'String'>
    readonly about: FieldRef<"Contractor", 'String'>
    readonly logo_url: FieldRef<"Contractor", 'String'>
    readonly address: FieldRef<"Contractor", 'String'>
    readonly createdAt: FieldRef<"Contractor", 'DateTime'>
    readonly updatedAt: FieldRef<"Contractor", 'DateTime'>
    readonly isContactVerified: FieldRef<"Contractor", 'Boolean'>
    readonly suburb: FieldRef<"Contractor", 'String'>
    readonly reviewCount: FieldRef<"Contractor", 'Int'>
    readonly hiredCount: FieldRef<"Contractor", 'Int'>
    readonly recommendations: FieldRef<"Contractor", 'Int'>
    readonly profileUrl: FieldRef<"Contractor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contractor findUnique
   */
  export type ContractorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter, which Contractor to fetch.
     */
    where: ContractorWhereUniqueInput
  }

  /**
   * Contractor findUniqueOrThrow
   */
  export type ContractorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter, which Contractor to fetch.
     */
    where: ContractorWhereUniqueInput
  }

  /**
   * Contractor findFirst
   */
  export type ContractorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter, which Contractor to fetch.
     */
    where?: ContractorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contractors to fetch.
     */
    orderBy?: ContractorOrderByWithRelationInput | ContractorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contractors.
     */
    cursor?: ContractorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contractors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contractors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contractors.
     */
    distinct?: ContractorScalarFieldEnum | ContractorScalarFieldEnum[]
  }

  /**
   * Contractor findFirstOrThrow
   */
  export type ContractorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter, which Contractor to fetch.
     */
    where?: ContractorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contractors to fetch.
     */
    orderBy?: ContractorOrderByWithRelationInput | ContractorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contractors.
     */
    cursor?: ContractorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contractors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contractors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contractors.
     */
    distinct?: ContractorScalarFieldEnum | ContractorScalarFieldEnum[]
  }

  /**
   * Contractor findMany
   */
  export type ContractorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter, which Contractors to fetch.
     */
    where?: ContractorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contractors to fetch.
     */
    orderBy?: ContractorOrderByWithRelationInput | ContractorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contractors.
     */
    cursor?: ContractorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contractors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contractors.
     */
    skip?: number
    distinct?: ContractorScalarFieldEnum | ContractorScalarFieldEnum[]
  }

  /**
   * Contractor create
   */
  export type ContractorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * The data needed to create a Contractor.
     */
    data: XOR<ContractorCreateInput, ContractorUncheckedCreateInput>
  }

  /**
   * Contractor createMany
   */
  export type ContractorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contractors.
     */
    data: ContractorCreateManyInput | ContractorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contractor createManyAndReturn
   */
  export type ContractorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Contractors.
     */
    data: ContractorCreateManyInput | ContractorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contractor update
   */
  export type ContractorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * The data needed to update a Contractor.
     */
    data: XOR<ContractorUpdateInput, ContractorUncheckedUpdateInput>
    /**
     * Choose, which Contractor to update.
     */
    where: ContractorWhereUniqueInput
  }

  /**
   * Contractor updateMany
   */
  export type ContractorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contractors.
     */
    data: XOR<ContractorUpdateManyMutationInput, ContractorUncheckedUpdateManyInput>
    /**
     * Filter which Contractors to update
     */
    where?: ContractorWhereInput
  }

  /**
   * Contractor upsert
   */
  export type ContractorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * The filter to search for the Contractor to update in case it exists.
     */
    where: ContractorWhereUniqueInput
    /**
     * In case the Contractor found by the `where` argument doesn't exist, create a new Contractor with this data.
     */
    create: XOR<ContractorCreateInput, ContractorUncheckedCreateInput>
    /**
     * In case the Contractor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractorUpdateInput, ContractorUncheckedUpdateInput>
  }

  /**
   * Contractor delete
   */
  export type ContractorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    /**
     * Filter which Contractor to delete.
     */
    where: ContractorWhereUniqueInput
  }

  /**
   * Contractor deleteMany
   */
  export type ContractorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contractors to delete
     */
    where?: ContractorWhereInput
  }

  /**
   * Contractor.emails
   */
  export type Contractor$emailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    where?: ContractorEmailWhereInput
    orderBy?: ContractorEmailOrderByWithRelationInput | ContractorEmailOrderByWithRelationInput[]
    cursor?: ContractorEmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractorEmailScalarFieldEnum | ContractorEmailScalarFieldEnum[]
  }

  /**
   * Contractor.phones
   */
  export type Contractor$phonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    where?: ContractorPhoneWhereInput
    orderBy?: ContractorPhoneOrderByWithRelationInput | ContractorPhoneOrderByWithRelationInput[]
    cursor?: ContractorPhoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContractorPhoneScalarFieldEnum | ContractorPhoneScalarFieldEnum[]
  }

  /**
   * Contractor.jobs
   */
  export type Contractor$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Contractor.reviews
   */
  export type Contractor$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Contractor without action
   */
  export type ContractorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
  }


  /**
   * Model ContractorEmail
   */

  export type AggregateContractorEmail = {
    _count: ContractorEmailCountAggregateOutputType | null
    _min: ContractorEmailMinAggregateOutputType | null
    _max: ContractorEmailMaxAggregateOutputType | null
  }

  export type ContractorEmailMinAggregateOutputType = {
    id: string | null
    email: string | null
    type: string | null
    isVerified: boolean | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorEmailMaxAggregateOutputType = {
    id: string | null
    email: string | null
    type: string | null
    isVerified: boolean | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorEmailCountAggregateOutputType = {
    id: number
    email: number
    type: number
    isVerified: number
    contractorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContractorEmailMinAggregateInputType = {
    id?: true
    email?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorEmailMaxAggregateInputType = {
    id?: true
    email?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorEmailCountAggregateInputType = {
    id?: true
    email?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContractorEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorEmail to aggregate.
     */
    where?: ContractorEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorEmails to fetch.
     */
    orderBy?: ContractorEmailOrderByWithRelationInput | ContractorEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractorEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractorEmails
    **/
    _count?: true | ContractorEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractorEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractorEmailMaxAggregateInputType
  }

  export type GetContractorEmailAggregateType<T extends ContractorEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateContractorEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractorEmail[P]>
      : GetScalarType<T[P], AggregateContractorEmail[P]>
  }




  export type ContractorEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorEmailWhereInput
    orderBy?: ContractorEmailOrderByWithAggregationInput | ContractorEmailOrderByWithAggregationInput[]
    by: ContractorEmailScalarFieldEnum[] | ContractorEmailScalarFieldEnum
    having?: ContractorEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractorEmailCountAggregateInputType | true
    _min?: ContractorEmailMinAggregateInputType
    _max?: ContractorEmailMaxAggregateInputType
  }

  export type ContractorEmailGroupByOutputType = {
    id: string
    email: string
    type: string
    isVerified: boolean
    contractorId: string
    createdAt: Date
    updatedAt: Date
    _count: ContractorEmailCountAggregateOutputType | null
    _min: ContractorEmailMinAggregateOutputType | null
    _max: ContractorEmailMaxAggregateOutputType | null
  }

  type GetContractorEmailGroupByPayload<T extends ContractorEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractorEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractorEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractorEmailGroupByOutputType[P]>
            : GetScalarType<T[P], ContractorEmailGroupByOutputType[P]>
        }
      >
    >


  export type ContractorEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractorEmail"]>

  export type ContractorEmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractorEmail"]>

  export type ContractorEmailSelectScalar = {
    id?: boolean
    email?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContractorEmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }
  export type ContractorEmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }

  export type $ContractorEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractorEmail"
    objects: {
      contractor: Prisma.$ContractorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      type: string
      isVerified: boolean
      contractorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contractorEmail"]>
    composites: {}
  }

  type ContractorEmailGetPayload<S extends boolean | null | undefined | ContractorEmailDefaultArgs> = $Result.GetResult<Prisma.$ContractorEmailPayload, S>

  type ContractorEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractorEmailFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractorEmailCountAggregateInputType | true
    }

  export interface ContractorEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractorEmail'], meta: { name: 'ContractorEmail' } }
    /**
     * Find zero or one ContractorEmail that matches the filter.
     * @param {ContractorEmailFindUniqueArgs} args - Arguments to find a ContractorEmail
     * @example
     * // Get one ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractorEmailFindUniqueArgs>(args: SelectSubset<T, ContractorEmailFindUniqueArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContractorEmail that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractorEmailFindUniqueOrThrowArgs} args - Arguments to find a ContractorEmail
     * @example
     * // Get one ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractorEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractorEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContractorEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailFindFirstArgs} args - Arguments to find a ContractorEmail
     * @example
     * // Get one ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractorEmailFindFirstArgs>(args?: SelectSubset<T, ContractorEmailFindFirstArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContractorEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailFindFirstOrThrowArgs} args - Arguments to find a ContractorEmail
     * @example
     * // Get one ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractorEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractorEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContractorEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractorEmails
     * const contractorEmails = await prisma.contractorEmail.findMany()
     * 
     * // Get first 10 ContractorEmails
     * const contractorEmails = await prisma.contractorEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractorEmailWithIdOnly = await prisma.contractorEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractorEmailFindManyArgs>(args?: SelectSubset<T, ContractorEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContractorEmail.
     * @param {ContractorEmailCreateArgs} args - Arguments to create a ContractorEmail.
     * @example
     * // Create one ContractorEmail
     * const ContractorEmail = await prisma.contractorEmail.create({
     *   data: {
     *     // ... data to create a ContractorEmail
     *   }
     * })
     * 
     */
    create<T extends ContractorEmailCreateArgs>(args: SelectSubset<T, ContractorEmailCreateArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContractorEmails.
     * @param {ContractorEmailCreateManyArgs} args - Arguments to create many ContractorEmails.
     * @example
     * // Create many ContractorEmails
     * const contractorEmail = await prisma.contractorEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractorEmailCreateManyArgs>(args?: SelectSubset<T, ContractorEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractorEmails and returns the data saved in the database.
     * @param {ContractorEmailCreateManyAndReturnArgs} args - Arguments to create many ContractorEmails.
     * @example
     * // Create many ContractorEmails
     * const contractorEmail = await prisma.contractorEmail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractorEmails and only return the `id`
     * const contractorEmailWithIdOnly = await prisma.contractorEmail.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractorEmailCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractorEmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContractorEmail.
     * @param {ContractorEmailDeleteArgs} args - Arguments to delete one ContractorEmail.
     * @example
     * // Delete one ContractorEmail
     * const ContractorEmail = await prisma.contractorEmail.delete({
     *   where: {
     *     // ... filter to delete one ContractorEmail
     *   }
     * })
     * 
     */
    delete<T extends ContractorEmailDeleteArgs>(args: SelectSubset<T, ContractorEmailDeleteArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContractorEmail.
     * @param {ContractorEmailUpdateArgs} args - Arguments to update one ContractorEmail.
     * @example
     * // Update one ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractorEmailUpdateArgs>(args: SelectSubset<T, ContractorEmailUpdateArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContractorEmails.
     * @param {ContractorEmailDeleteManyArgs} args - Arguments to filter ContractorEmails to delete.
     * @example
     * // Delete a few ContractorEmails
     * const { count } = await prisma.contractorEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractorEmailDeleteManyArgs>(args?: SelectSubset<T, ContractorEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractorEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractorEmails
     * const contractorEmail = await prisma.contractorEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractorEmailUpdateManyArgs>(args: SelectSubset<T, ContractorEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContractorEmail.
     * @param {ContractorEmailUpsertArgs} args - Arguments to update or create a ContractorEmail.
     * @example
     * // Update or create a ContractorEmail
     * const contractorEmail = await prisma.contractorEmail.upsert({
     *   create: {
     *     // ... data to create a ContractorEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractorEmail we want to update
     *   }
     * })
     */
    upsert<T extends ContractorEmailUpsertArgs>(args: SelectSubset<T, ContractorEmailUpsertArgs<ExtArgs>>): Prisma__ContractorEmailClient<$Result.GetResult<Prisma.$ContractorEmailPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContractorEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailCountArgs} args - Arguments to filter ContractorEmails to count.
     * @example
     * // Count the number of ContractorEmails
     * const count = await prisma.contractorEmail.count({
     *   where: {
     *     // ... the filter for the ContractorEmails we want to count
     *   }
     * })
    **/
    count<T extends ContractorEmailCountArgs>(
      args?: Subset<T, ContractorEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractorEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractorEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractorEmailAggregateArgs>(args: Subset<T, ContractorEmailAggregateArgs>): Prisma.PrismaPromise<GetContractorEmailAggregateType<T>>

    /**
     * Group by ContractorEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorEmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractorEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractorEmailGroupByArgs['orderBy'] }
        : { orderBy?: ContractorEmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractorEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractorEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractorEmail model
   */
  readonly fields: ContractorEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractorEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractorEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contractor<T extends ContractorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractorDefaultArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContractorEmail model
   */ 
  interface ContractorEmailFieldRefs {
    readonly id: FieldRef<"ContractorEmail", 'String'>
    readonly email: FieldRef<"ContractorEmail", 'String'>
    readonly type: FieldRef<"ContractorEmail", 'String'>
    readonly isVerified: FieldRef<"ContractorEmail", 'Boolean'>
    readonly contractorId: FieldRef<"ContractorEmail", 'String'>
    readonly createdAt: FieldRef<"ContractorEmail", 'DateTime'>
    readonly updatedAt: FieldRef<"ContractorEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractorEmail findUnique
   */
  export type ContractorEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter, which ContractorEmail to fetch.
     */
    where: ContractorEmailWhereUniqueInput
  }

  /**
   * ContractorEmail findUniqueOrThrow
   */
  export type ContractorEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter, which ContractorEmail to fetch.
     */
    where: ContractorEmailWhereUniqueInput
  }

  /**
   * ContractorEmail findFirst
   */
  export type ContractorEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter, which ContractorEmail to fetch.
     */
    where?: ContractorEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorEmails to fetch.
     */
    orderBy?: ContractorEmailOrderByWithRelationInput | ContractorEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorEmails.
     */
    cursor?: ContractorEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorEmails.
     */
    distinct?: ContractorEmailScalarFieldEnum | ContractorEmailScalarFieldEnum[]
  }

  /**
   * ContractorEmail findFirstOrThrow
   */
  export type ContractorEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter, which ContractorEmail to fetch.
     */
    where?: ContractorEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorEmails to fetch.
     */
    orderBy?: ContractorEmailOrderByWithRelationInput | ContractorEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorEmails.
     */
    cursor?: ContractorEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorEmails.
     */
    distinct?: ContractorEmailScalarFieldEnum | ContractorEmailScalarFieldEnum[]
  }

  /**
   * ContractorEmail findMany
   */
  export type ContractorEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter, which ContractorEmails to fetch.
     */
    where?: ContractorEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorEmails to fetch.
     */
    orderBy?: ContractorEmailOrderByWithRelationInput | ContractorEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractorEmails.
     */
    cursor?: ContractorEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorEmails.
     */
    skip?: number
    distinct?: ContractorEmailScalarFieldEnum | ContractorEmailScalarFieldEnum[]
  }

  /**
   * ContractorEmail create
   */
  export type ContractorEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * The data needed to create a ContractorEmail.
     */
    data: XOR<ContractorEmailCreateInput, ContractorEmailUncheckedCreateInput>
  }

  /**
   * ContractorEmail createMany
   */
  export type ContractorEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractorEmails.
     */
    data: ContractorEmailCreateManyInput | ContractorEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractorEmail createManyAndReturn
   */
  export type ContractorEmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContractorEmails.
     */
    data: ContractorEmailCreateManyInput | ContractorEmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractorEmail update
   */
  export type ContractorEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * The data needed to update a ContractorEmail.
     */
    data: XOR<ContractorEmailUpdateInput, ContractorEmailUncheckedUpdateInput>
    /**
     * Choose, which ContractorEmail to update.
     */
    where: ContractorEmailWhereUniqueInput
  }

  /**
   * ContractorEmail updateMany
   */
  export type ContractorEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractorEmails.
     */
    data: XOR<ContractorEmailUpdateManyMutationInput, ContractorEmailUncheckedUpdateManyInput>
    /**
     * Filter which ContractorEmails to update
     */
    where?: ContractorEmailWhereInput
  }

  /**
   * ContractorEmail upsert
   */
  export type ContractorEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * The filter to search for the ContractorEmail to update in case it exists.
     */
    where: ContractorEmailWhereUniqueInput
    /**
     * In case the ContractorEmail found by the `where` argument doesn't exist, create a new ContractorEmail with this data.
     */
    create: XOR<ContractorEmailCreateInput, ContractorEmailUncheckedCreateInput>
    /**
     * In case the ContractorEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractorEmailUpdateInput, ContractorEmailUncheckedUpdateInput>
  }

  /**
   * ContractorEmail delete
   */
  export type ContractorEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
    /**
     * Filter which ContractorEmail to delete.
     */
    where: ContractorEmailWhereUniqueInput
  }

  /**
   * ContractorEmail deleteMany
   */
  export type ContractorEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorEmails to delete
     */
    where?: ContractorEmailWhereInput
  }

  /**
   * ContractorEmail without action
   */
  export type ContractorEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorEmail
     */
    select?: ContractorEmailSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorEmailInclude<ExtArgs> | null
  }


  /**
   * Model ContractorPhone
   */

  export type AggregateContractorPhone = {
    _count: ContractorPhoneCountAggregateOutputType | null
    _min: ContractorPhoneMinAggregateOutputType | null
    _max: ContractorPhoneMaxAggregateOutputType | null
  }

  export type ContractorPhoneMinAggregateOutputType = {
    id: string | null
    number: string | null
    type: string | null
    isVerified: boolean | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorPhoneMaxAggregateOutputType = {
    id: string | null
    number: string | null
    type: string | null
    isVerified: boolean | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorPhoneCountAggregateOutputType = {
    id: number
    number: number
    type: number
    isVerified: number
    contractorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContractorPhoneMinAggregateInputType = {
    id?: true
    number?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorPhoneMaxAggregateInputType = {
    id?: true
    number?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorPhoneCountAggregateInputType = {
    id?: true
    number?: true
    type?: true
    isVerified?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContractorPhoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorPhone to aggregate.
     */
    where?: ContractorPhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorPhones to fetch.
     */
    orderBy?: ContractorPhoneOrderByWithRelationInput | ContractorPhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractorPhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorPhones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorPhones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractorPhones
    **/
    _count?: true | ContractorPhoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractorPhoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractorPhoneMaxAggregateInputType
  }

  export type GetContractorPhoneAggregateType<T extends ContractorPhoneAggregateArgs> = {
        [P in keyof T & keyof AggregateContractorPhone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractorPhone[P]>
      : GetScalarType<T[P], AggregateContractorPhone[P]>
  }




  export type ContractorPhoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorPhoneWhereInput
    orderBy?: ContractorPhoneOrderByWithAggregationInput | ContractorPhoneOrderByWithAggregationInput[]
    by: ContractorPhoneScalarFieldEnum[] | ContractorPhoneScalarFieldEnum
    having?: ContractorPhoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractorPhoneCountAggregateInputType | true
    _min?: ContractorPhoneMinAggregateInputType
    _max?: ContractorPhoneMaxAggregateInputType
  }

  export type ContractorPhoneGroupByOutputType = {
    id: string
    number: string
    type: string
    isVerified: boolean
    contractorId: string
    createdAt: Date
    updatedAt: Date
    _count: ContractorPhoneCountAggregateOutputType | null
    _min: ContractorPhoneMinAggregateOutputType | null
    _max: ContractorPhoneMaxAggregateOutputType | null
  }

  type GetContractorPhoneGroupByPayload<T extends ContractorPhoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractorPhoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractorPhoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractorPhoneGroupByOutputType[P]>
            : GetScalarType<T[P], ContractorPhoneGroupByOutputType[P]>
        }
      >
    >


  export type ContractorPhoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractorPhone"]>

  export type ContractorPhoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    number?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contractorPhone"]>

  export type ContractorPhoneSelectScalar = {
    id?: boolean
    number?: boolean
    type?: boolean
    isVerified?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContractorPhoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }
  export type ContractorPhoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
  }

  export type $ContractorPhonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractorPhone"
    objects: {
      contractor: Prisma.$ContractorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      number: string
      type: string
      isVerified: boolean
      contractorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contractorPhone"]>
    composites: {}
  }

  type ContractorPhoneGetPayload<S extends boolean | null | undefined | ContractorPhoneDefaultArgs> = $Result.GetResult<Prisma.$ContractorPhonePayload, S>

  type ContractorPhoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractorPhoneFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractorPhoneCountAggregateInputType | true
    }

  export interface ContractorPhoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractorPhone'], meta: { name: 'ContractorPhone' } }
    /**
     * Find zero or one ContractorPhone that matches the filter.
     * @param {ContractorPhoneFindUniqueArgs} args - Arguments to find a ContractorPhone
     * @example
     * // Get one ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractorPhoneFindUniqueArgs>(args: SelectSubset<T, ContractorPhoneFindUniqueArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContractorPhone that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractorPhoneFindUniqueOrThrowArgs} args - Arguments to find a ContractorPhone
     * @example
     * // Get one ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractorPhoneFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractorPhoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContractorPhone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneFindFirstArgs} args - Arguments to find a ContractorPhone
     * @example
     * // Get one ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractorPhoneFindFirstArgs>(args?: SelectSubset<T, ContractorPhoneFindFirstArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContractorPhone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneFindFirstOrThrowArgs} args - Arguments to find a ContractorPhone
     * @example
     * // Get one ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractorPhoneFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractorPhoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContractorPhones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractorPhones
     * const contractorPhones = await prisma.contractorPhone.findMany()
     * 
     * // Get first 10 ContractorPhones
     * const contractorPhones = await prisma.contractorPhone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractorPhoneWithIdOnly = await prisma.contractorPhone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractorPhoneFindManyArgs>(args?: SelectSubset<T, ContractorPhoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContractorPhone.
     * @param {ContractorPhoneCreateArgs} args - Arguments to create a ContractorPhone.
     * @example
     * // Create one ContractorPhone
     * const ContractorPhone = await prisma.contractorPhone.create({
     *   data: {
     *     // ... data to create a ContractorPhone
     *   }
     * })
     * 
     */
    create<T extends ContractorPhoneCreateArgs>(args: SelectSubset<T, ContractorPhoneCreateArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContractorPhones.
     * @param {ContractorPhoneCreateManyArgs} args - Arguments to create many ContractorPhones.
     * @example
     * // Create many ContractorPhones
     * const contractorPhone = await prisma.contractorPhone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractorPhoneCreateManyArgs>(args?: SelectSubset<T, ContractorPhoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractorPhones and returns the data saved in the database.
     * @param {ContractorPhoneCreateManyAndReturnArgs} args - Arguments to create many ContractorPhones.
     * @example
     * // Create many ContractorPhones
     * const contractorPhone = await prisma.contractorPhone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractorPhones and only return the `id`
     * const contractorPhoneWithIdOnly = await prisma.contractorPhone.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractorPhoneCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractorPhoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContractorPhone.
     * @param {ContractorPhoneDeleteArgs} args - Arguments to delete one ContractorPhone.
     * @example
     * // Delete one ContractorPhone
     * const ContractorPhone = await prisma.contractorPhone.delete({
     *   where: {
     *     // ... filter to delete one ContractorPhone
     *   }
     * })
     * 
     */
    delete<T extends ContractorPhoneDeleteArgs>(args: SelectSubset<T, ContractorPhoneDeleteArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContractorPhone.
     * @param {ContractorPhoneUpdateArgs} args - Arguments to update one ContractorPhone.
     * @example
     * // Update one ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractorPhoneUpdateArgs>(args: SelectSubset<T, ContractorPhoneUpdateArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContractorPhones.
     * @param {ContractorPhoneDeleteManyArgs} args - Arguments to filter ContractorPhones to delete.
     * @example
     * // Delete a few ContractorPhones
     * const { count } = await prisma.contractorPhone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractorPhoneDeleteManyArgs>(args?: SelectSubset<T, ContractorPhoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractorPhones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractorPhones
     * const contractorPhone = await prisma.contractorPhone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractorPhoneUpdateManyArgs>(args: SelectSubset<T, ContractorPhoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContractorPhone.
     * @param {ContractorPhoneUpsertArgs} args - Arguments to update or create a ContractorPhone.
     * @example
     * // Update or create a ContractorPhone
     * const contractorPhone = await prisma.contractorPhone.upsert({
     *   create: {
     *     // ... data to create a ContractorPhone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractorPhone we want to update
     *   }
     * })
     */
    upsert<T extends ContractorPhoneUpsertArgs>(args: SelectSubset<T, ContractorPhoneUpsertArgs<ExtArgs>>): Prisma__ContractorPhoneClient<$Result.GetResult<Prisma.$ContractorPhonePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContractorPhones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneCountArgs} args - Arguments to filter ContractorPhones to count.
     * @example
     * // Count the number of ContractorPhones
     * const count = await prisma.contractorPhone.count({
     *   where: {
     *     // ... the filter for the ContractorPhones we want to count
     *   }
     * })
    **/
    count<T extends ContractorPhoneCountArgs>(
      args?: Subset<T, ContractorPhoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractorPhoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractorPhone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractorPhoneAggregateArgs>(args: Subset<T, ContractorPhoneAggregateArgs>): Prisma.PrismaPromise<GetContractorPhoneAggregateType<T>>

    /**
     * Group by ContractorPhone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorPhoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractorPhoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractorPhoneGroupByArgs['orderBy'] }
        : { orderBy?: ContractorPhoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractorPhoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractorPhoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractorPhone model
   */
  readonly fields: ContractorPhoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractorPhone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractorPhoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contractor<T extends ContractorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractorDefaultArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContractorPhone model
   */ 
  interface ContractorPhoneFieldRefs {
    readonly id: FieldRef<"ContractorPhone", 'String'>
    readonly number: FieldRef<"ContractorPhone", 'String'>
    readonly type: FieldRef<"ContractorPhone", 'String'>
    readonly isVerified: FieldRef<"ContractorPhone", 'Boolean'>
    readonly contractorId: FieldRef<"ContractorPhone", 'String'>
    readonly createdAt: FieldRef<"ContractorPhone", 'DateTime'>
    readonly updatedAt: FieldRef<"ContractorPhone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractorPhone findUnique
   */
  export type ContractorPhoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter, which ContractorPhone to fetch.
     */
    where: ContractorPhoneWhereUniqueInput
  }

  /**
   * ContractorPhone findUniqueOrThrow
   */
  export type ContractorPhoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter, which ContractorPhone to fetch.
     */
    where: ContractorPhoneWhereUniqueInput
  }

  /**
   * ContractorPhone findFirst
   */
  export type ContractorPhoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter, which ContractorPhone to fetch.
     */
    where?: ContractorPhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorPhones to fetch.
     */
    orderBy?: ContractorPhoneOrderByWithRelationInput | ContractorPhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorPhones.
     */
    cursor?: ContractorPhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorPhones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorPhones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorPhones.
     */
    distinct?: ContractorPhoneScalarFieldEnum | ContractorPhoneScalarFieldEnum[]
  }

  /**
   * ContractorPhone findFirstOrThrow
   */
  export type ContractorPhoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter, which ContractorPhone to fetch.
     */
    where?: ContractorPhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorPhones to fetch.
     */
    orderBy?: ContractorPhoneOrderByWithRelationInput | ContractorPhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorPhones.
     */
    cursor?: ContractorPhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorPhones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorPhones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorPhones.
     */
    distinct?: ContractorPhoneScalarFieldEnum | ContractorPhoneScalarFieldEnum[]
  }

  /**
   * ContractorPhone findMany
   */
  export type ContractorPhoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter, which ContractorPhones to fetch.
     */
    where?: ContractorPhoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorPhones to fetch.
     */
    orderBy?: ContractorPhoneOrderByWithRelationInput | ContractorPhoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractorPhones.
     */
    cursor?: ContractorPhoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorPhones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorPhones.
     */
    skip?: number
    distinct?: ContractorPhoneScalarFieldEnum | ContractorPhoneScalarFieldEnum[]
  }

  /**
   * ContractorPhone create
   */
  export type ContractorPhoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * The data needed to create a ContractorPhone.
     */
    data: XOR<ContractorPhoneCreateInput, ContractorPhoneUncheckedCreateInput>
  }

  /**
   * ContractorPhone createMany
   */
  export type ContractorPhoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractorPhones.
     */
    data: ContractorPhoneCreateManyInput | ContractorPhoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractorPhone createManyAndReturn
   */
  export type ContractorPhoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContractorPhones.
     */
    data: ContractorPhoneCreateManyInput | ContractorPhoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ContractorPhone update
   */
  export type ContractorPhoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * The data needed to update a ContractorPhone.
     */
    data: XOR<ContractorPhoneUpdateInput, ContractorPhoneUncheckedUpdateInput>
    /**
     * Choose, which ContractorPhone to update.
     */
    where: ContractorPhoneWhereUniqueInput
  }

  /**
   * ContractorPhone updateMany
   */
  export type ContractorPhoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractorPhones.
     */
    data: XOR<ContractorPhoneUpdateManyMutationInput, ContractorPhoneUncheckedUpdateManyInput>
    /**
     * Filter which ContractorPhones to update
     */
    where?: ContractorPhoneWhereInput
  }

  /**
   * ContractorPhone upsert
   */
  export type ContractorPhoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * The filter to search for the ContractorPhone to update in case it exists.
     */
    where: ContractorPhoneWhereUniqueInput
    /**
     * In case the ContractorPhone found by the `where` argument doesn't exist, create a new ContractorPhone with this data.
     */
    create: XOR<ContractorPhoneCreateInput, ContractorPhoneUncheckedCreateInput>
    /**
     * In case the ContractorPhone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractorPhoneUpdateInput, ContractorPhoneUncheckedUpdateInput>
  }

  /**
   * ContractorPhone delete
   */
  export type ContractorPhoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
    /**
     * Filter which ContractorPhone to delete.
     */
    where: ContractorPhoneWhereUniqueInput
  }

  /**
   * ContractorPhone deleteMany
   */
  export type ContractorPhoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorPhones to delete
     */
    where?: ContractorPhoneWhereInput
  }

  /**
   * ContractorPhone without action
   */
  export type ContractorPhoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorPhone
     */
    select?: ContractorPhoneSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorPhoneInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    estimatedTimeMinutes: number | null
    quotedPrice: number | null
    quotedPriceMin: number | null
    quotedPriceMax: number | null
    serviceCharge: number | null
  }

  export type JobSumAggregateOutputType = {
    estimatedTimeMinutes: number | null
    quotedPrice: number | null
    quotedPriceMin: number | null
    quotedPriceMax: number | null
    serviceCharge: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    description: string | null
    location: string | null
    urgency: string | null
    category: string | null
    problemType: string | null
    severity: string | null
    estimatedTimeMinutes: number | null
    partsRequired: boolean | null
    quotedPrice: number | null
    quotedPriceMin: number | null
    quotedPriceMax: number | null
    confidence: string | null
    status: string | null
    userId: string | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    postcode: string | null
    serviceCharge: number | null
    paymentStatus: string | null
    stripeSessionId: string | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    description: string | null
    location: string | null
    urgency: string | null
    category: string | null
    problemType: string | null
    severity: string | null
    estimatedTimeMinutes: number | null
    partsRequired: boolean | null
    quotedPrice: number | null
    quotedPriceMin: number | null
    quotedPriceMax: number | null
    confidence: string | null
    status: string | null
    userId: string | null
    contractorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    postcode: string | null
    serviceCharge: number | null
    paymentStatus: string | null
    stripeSessionId: string | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    description: number
    location: number
    urgency: number
    category: number
    problemType: number
    severity: number
    estimatedTimeMinutes: number
    partsRequired: number
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: number
    status: number
    userId: number
    contractorId: number
    createdAt: number
    updatedAt: number
    address: number
    postcode: number
    customerLocation: number
    serviceCharge: number
    paymentStatus: number
    stripeSessionId: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    estimatedTimeMinutes?: true
    quotedPrice?: true
    quotedPriceMin?: true
    quotedPriceMax?: true
    serviceCharge?: true
  }

  export type JobSumAggregateInputType = {
    estimatedTimeMinutes?: true
    quotedPrice?: true
    quotedPriceMin?: true
    quotedPriceMax?: true
    serviceCharge?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    description?: true
    location?: true
    urgency?: true
    category?: true
    problemType?: true
    severity?: true
    estimatedTimeMinutes?: true
    partsRequired?: true
    quotedPrice?: true
    quotedPriceMin?: true
    quotedPriceMax?: true
    confidence?: true
    status?: true
    userId?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    postcode?: true
    serviceCharge?: true
    paymentStatus?: true
    stripeSessionId?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    description?: true
    location?: true
    urgency?: true
    category?: true
    problemType?: true
    severity?: true
    estimatedTimeMinutes?: true
    partsRequired?: true
    quotedPrice?: true
    quotedPriceMin?: true
    quotedPriceMax?: true
    confidence?: true
    status?: true
    userId?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    postcode?: true
    serviceCharge?: true
    paymentStatus?: true
    stripeSessionId?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    description?: true
    location?: true
    urgency?: true
    category?: true
    problemType?: true
    severity?: true
    estimatedTimeMinutes?: true
    partsRequired?: true
    quotedPrice?: true
    quotedPriceMin?: true
    quotedPriceMax?: true
    confidence?: true
    status?: true
    userId?: true
    contractorId?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    postcode?: true
    customerLocation?: true
    serviceCharge?: true
    paymentStatus?: true
    stripeSessionId?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId: string | null
    contractorId: string | null
    createdAt: Date
    updatedAt: Date
    address: string | null
    postcode: string | null
    customerLocation: JsonValue | null
    serviceCharge: number | null
    paymentStatus: string
    stripeSessionId: string | null
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    location?: boolean
    urgency?: boolean
    category?: boolean
    problemType?: boolean
    severity?: boolean
    estimatedTimeMinutes?: boolean
    partsRequired?: boolean
    quotedPrice?: boolean
    quotedPriceMin?: boolean
    quotedPriceMax?: boolean
    confidence?: boolean
    status?: boolean
    userId?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    address?: boolean
    postcode?: boolean
    customerLocation?: boolean
    serviceCharge?: boolean
    paymentStatus?: boolean
    stripeSessionId?: boolean
    contractor?: boolean | Job$contractorArgs<ExtArgs>
    user?: boolean | Job$userArgs<ExtArgs>
    parts?: boolean | Job$partsArgs<ExtArgs>
    reviews?: boolean | Job$reviewsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    location?: boolean
    urgency?: boolean
    category?: boolean
    problemType?: boolean
    severity?: boolean
    estimatedTimeMinutes?: boolean
    partsRequired?: boolean
    quotedPrice?: boolean
    quotedPriceMin?: boolean
    quotedPriceMax?: boolean
    confidence?: boolean
    status?: boolean
    userId?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    address?: boolean
    postcode?: boolean
    customerLocation?: boolean
    serviceCharge?: boolean
    paymentStatus?: boolean
    stripeSessionId?: boolean
    contractor?: boolean | Job$contractorArgs<ExtArgs>
    user?: boolean | Job$userArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    description?: boolean
    location?: boolean
    urgency?: boolean
    category?: boolean
    problemType?: boolean
    severity?: boolean
    estimatedTimeMinutes?: boolean
    partsRequired?: boolean
    quotedPrice?: boolean
    quotedPriceMin?: boolean
    quotedPriceMax?: boolean
    confidence?: boolean
    status?: boolean
    userId?: boolean
    contractorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    address?: boolean
    postcode?: boolean
    customerLocation?: boolean
    serviceCharge?: boolean
    paymentStatus?: boolean
    stripeSessionId?: boolean
  }

  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | Job$contractorArgs<ExtArgs>
    user?: boolean | Job$userArgs<ExtArgs>
    parts?: boolean | Job$partsArgs<ExtArgs>
    reviews?: boolean | Job$reviewsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | Job$contractorArgs<ExtArgs>
    user?: boolean | Job$userArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      contractor: Prisma.$ContractorPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
      parts: Prisma.$PartPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      location: string
      urgency: string
      category: string
      problemType: string
      severity: string
      estimatedTimeMinutes: number
      partsRequired: boolean
      quotedPrice: number
      quotedPriceMin: number
      quotedPriceMax: number
      confidence: string
      status: string
      userId: string | null
      contractorId: string | null
      createdAt: Date
      updatedAt: Date
      address: string | null
      postcode: string | null
      customerLocation: Prisma.JsonValue | null
      serviceCharge: number | null
      paymentStatus: string
      stripeSessionId: string | null
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contractor<T extends Job$contractorArgs<ExtArgs> = {}>(args?: Subset<T, Job$contractorArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends Job$userArgs<ExtArgs> = {}>(args?: Subset<T, Job$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    parts<T extends Job$partsArgs<ExtArgs> = {}>(args?: Subset<T, Job$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends Job$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Job$reviewsArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */ 
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly location: FieldRef<"Job", 'String'>
    readonly urgency: FieldRef<"Job", 'String'>
    readonly category: FieldRef<"Job", 'String'>
    readonly problemType: FieldRef<"Job", 'String'>
    readonly severity: FieldRef<"Job", 'String'>
    readonly estimatedTimeMinutes: FieldRef<"Job", 'Int'>
    readonly partsRequired: FieldRef<"Job", 'Boolean'>
    readonly quotedPrice: FieldRef<"Job", 'Float'>
    readonly quotedPriceMin: FieldRef<"Job", 'Float'>
    readonly quotedPriceMax: FieldRef<"Job", 'Float'>
    readonly confidence: FieldRef<"Job", 'String'>
    readonly status: FieldRef<"Job", 'String'>
    readonly userId: FieldRef<"Job", 'String'>
    readonly contractorId: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
    readonly address: FieldRef<"Job", 'String'>
    readonly postcode: FieldRef<"Job", 'String'>
    readonly customerLocation: FieldRef<"Job", 'Json'>
    readonly serviceCharge: FieldRef<"Job", 'Float'>
    readonly paymentStatus: FieldRef<"Job", 'String'>
    readonly stripeSessionId: FieldRef<"Job", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
  }

  /**
   * Job.contractor
   */
  export type Job$contractorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contractor
     */
    select?: ContractorSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContractorInclude<ExtArgs> | null
    where?: ContractorWhereInput
  }

  /**
   * Job.user
   */
  export type Job$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Job.parts
   */
  export type Job$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    where?: PartWhereInput
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    cursor?: PartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Job.reviews
   */
  export type Job$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    price: number | null
  }

  export type PartSumAggregateOutputType = {
    price: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    status: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: number | null
    status: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    name: number
    price: number
    status: number
    jobId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    price?: true
  }

  export type PartSumAggregateInputType = {
    price?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    status?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    status?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    status?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    name: string
    price: number
    status: string
    jobId: string
    createdAt: Date
    updatedAt: Date
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    status?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    status?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    status?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
  }
  export type PartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
  }

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: number
      status: string
      jobId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parts and returns the data saved in the database.
     * @param {PartCreateManyAndReturnArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartCreateManyAndReturnArgs>(args?: SelectSubset<T, PartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Part model
   */ 
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly price: FieldRef<"Part", 'Float'>
    readonly status: FieldRef<"Part", 'String'>
    readonly jobId: FieldRef<"Part", 'String'>
    readonly createdAt: FieldRef<"Part", 'DateTime'>
    readonly updatedAt: FieldRef<"Part", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part createManyAndReturn
   */
  export type PartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model LocationLog
   */

  export type AggregateLocationLog = {
    _count: LocationLogCountAggregateOutputType | null
    _avg: LocationLogAvgAggregateOutputType | null
    _sum: LocationLogSumAggregateOutputType | null
    _min: LocationLogMinAggregateOutputType | null
    _max: LocationLogMaxAggregateOutputType | null
  }

  export type LocationLogAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
    accuracy: number | null
  }

  export type LocationLogSumAggregateOutputType = {
    lat: number | null
    lng: number | null
    accuracy: number | null
  }

  export type LocationLogMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    contractorId: string | null
    lat: number | null
    lng: number | null
    accuracy: number | null
    createdAt: Date | null
  }

  export type LocationLogMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    contractorId: string | null
    lat: number | null
    lng: number | null
    accuracy: number | null
    createdAt: Date | null
  }

  export type LocationLogCountAggregateOutputType = {
    id: number
    jobId: number
    contractorId: number
    lat: number
    lng: number
    accuracy: number
    createdAt: number
    _all: number
  }


  export type LocationLogAvgAggregateInputType = {
    lat?: true
    lng?: true
    accuracy?: true
  }

  export type LocationLogSumAggregateInputType = {
    lat?: true
    lng?: true
    accuracy?: true
  }

  export type LocationLogMinAggregateInputType = {
    id?: true
    jobId?: true
    contractorId?: true
    lat?: true
    lng?: true
    accuracy?: true
    createdAt?: true
  }

  export type LocationLogMaxAggregateInputType = {
    id?: true
    jobId?: true
    contractorId?: true
    lat?: true
    lng?: true
    accuracy?: true
    createdAt?: true
  }

  export type LocationLogCountAggregateInputType = {
    id?: true
    jobId?: true
    contractorId?: true
    lat?: true
    lng?: true
    accuracy?: true
    createdAt?: true
    _all?: true
  }

  export type LocationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationLog to aggregate.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocationLogs
    **/
    _count?: true | LocationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationLogMaxAggregateInputType
  }

  export type GetLocationLogAggregateType<T extends LocationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateLocationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocationLog[P]>
      : GetScalarType<T[P], AggregateLocationLog[P]>
  }




  export type LocationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationLogWhereInput
    orderBy?: LocationLogOrderByWithAggregationInput | LocationLogOrderByWithAggregationInput[]
    by: LocationLogScalarFieldEnum[] | LocationLogScalarFieldEnum
    having?: LocationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationLogCountAggregateInputType | true
    _avg?: LocationLogAvgAggregateInputType
    _sum?: LocationLogSumAggregateInputType
    _min?: LocationLogMinAggregateInputType
    _max?: LocationLogMaxAggregateInputType
  }

  export type LocationLogGroupByOutputType = {
    id: string
    jobId: string
    contractorId: string
    lat: number
    lng: number
    accuracy: number | null
    createdAt: Date
    _count: LocationLogCountAggregateOutputType | null
    _avg: LocationLogAvgAggregateOutputType | null
    _sum: LocationLogSumAggregateOutputType | null
    _min: LocationLogMinAggregateOutputType | null
    _max: LocationLogMaxAggregateOutputType | null
  }

  type GetLocationLogGroupByPayload<T extends LocationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationLogGroupByOutputType[P]>
            : GetScalarType<T[P], LocationLogGroupByOutputType[P]>
        }
      >
    >


  export type LocationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    contractorId?: boolean
    lat?: boolean
    lng?: boolean
    accuracy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["locationLog"]>

  export type LocationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    contractorId?: boolean
    lat?: boolean
    lng?: boolean
    accuracy?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["locationLog"]>

  export type LocationLogSelectScalar = {
    id?: boolean
    jobId?: boolean
    contractorId?: boolean
    lat?: boolean
    lng?: boolean
    accuracy?: boolean
    createdAt?: boolean
  }


  export type $LocationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocationLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      contractorId: string
      lat: number
      lng: number
      accuracy: number | null
      createdAt: Date
    }, ExtArgs["result"]["locationLog"]>
    composites: {}
  }

  type LocationLogGetPayload<S extends boolean | null | undefined | LocationLogDefaultArgs> = $Result.GetResult<Prisma.$LocationLogPayload, S>

  type LocationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LocationLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LocationLogCountAggregateInputType | true
    }

  export interface LocationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocationLog'], meta: { name: 'LocationLog' } }
    /**
     * Find zero or one LocationLog that matches the filter.
     * @param {LocationLogFindUniqueArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationLogFindUniqueArgs>(args: SelectSubset<T, LocationLogFindUniqueArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LocationLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LocationLogFindUniqueOrThrowArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LocationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindFirstArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationLogFindFirstArgs>(args?: SelectSubset<T, LocationLogFindFirstArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LocationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindFirstOrThrowArgs} args - Arguments to find a LocationLog
     * @example
     * // Get one LocationLog
     * const locationLog = await prisma.locationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LocationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocationLogs
     * const locationLogs = await prisma.locationLog.findMany()
     * 
     * // Get first 10 LocationLogs
     * const locationLogs = await prisma.locationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationLogWithIdOnly = await prisma.locationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationLogFindManyArgs>(args?: SelectSubset<T, LocationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LocationLog.
     * @param {LocationLogCreateArgs} args - Arguments to create a LocationLog.
     * @example
     * // Create one LocationLog
     * const LocationLog = await prisma.locationLog.create({
     *   data: {
     *     // ... data to create a LocationLog
     *   }
     * })
     * 
     */
    create<T extends LocationLogCreateArgs>(args: SelectSubset<T, LocationLogCreateArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LocationLogs.
     * @param {LocationLogCreateManyArgs} args - Arguments to create many LocationLogs.
     * @example
     * // Create many LocationLogs
     * const locationLog = await prisma.locationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationLogCreateManyArgs>(args?: SelectSubset<T, LocationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocationLogs and returns the data saved in the database.
     * @param {LocationLogCreateManyAndReturnArgs} args - Arguments to create many LocationLogs.
     * @example
     * // Create many LocationLogs
     * const locationLog = await prisma.locationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocationLogs and only return the `id`
     * const locationLogWithIdOnly = await prisma.locationLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LocationLog.
     * @param {LocationLogDeleteArgs} args - Arguments to delete one LocationLog.
     * @example
     * // Delete one LocationLog
     * const LocationLog = await prisma.locationLog.delete({
     *   where: {
     *     // ... filter to delete one LocationLog
     *   }
     * })
     * 
     */
    delete<T extends LocationLogDeleteArgs>(args: SelectSubset<T, LocationLogDeleteArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LocationLog.
     * @param {LocationLogUpdateArgs} args - Arguments to update one LocationLog.
     * @example
     * // Update one LocationLog
     * const locationLog = await prisma.locationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationLogUpdateArgs>(args: SelectSubset<T, LocationLogUpdateArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LocationLogs.
     * @param {LocationLogDeleteManyArgs} args - Arguments to filter LocationLogs to delete.
     * @example
     * // Delete a few LocationLogs
     * const { count } = await prisma.locationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationLogDeleteManyArgs>(args?: SelectSubset<T, LocationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocationLogs
     * const locationLog = await prisma.locationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationLogUpdateManyArgs>(args: SelectSubset<T, LocationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LocationLog.
     * @param {LocationLogUpsertArgs} args - Arguments to update or create a LocationLog.
     * @example
     * // Update or create a LocationLog
     * const locationLog = await prisma.locationLog.upsert({
     *   create: {
     *     // ... data to create a LocationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocationLog we want to update
     *   }
     * })
     */
    upsert<T extends LocationLogUpsertArgs>(args: SelectSubset<T, LocationLogUpsertArgs<ExtArgs>>): Prisma__LocationLogClient<$Result.GetResult<Prisma.$LocationLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LocationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogCountArgs} args - Arguments to filter LocationLogs to count.
     * @example
     * // Count the number of LocationLogs
     * const count = await prisma.locationLog.count({
     *   where: {
     *     // ... the filter for the LocationLogs we want to count
     *   }
     * })
    **/
    count<T extends LocationLogCountArgs>(
      args?: Subset<T, LocationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationLogAggregateArgs>(args: Subset<T, LocationLogAggregateArgs>): Prisma.PrismaPromise<GetLocationLogAggregateType<T>>

    /**
     * Group by LocationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationLogGroupByArgs['orderBy'] }
        : { orderBy?: LocationLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocationLog model
   */
  readonly fields: LocationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LocationLog model
   */ 
  interface LocationLogFieldRefs {
    readonly id: FieldRef<"LocationLog", 'String'>
    readonly jobId: FieldRef<"LocationLog", 'String'>
    readonly contractorId: FieldRef<"LocationLog", 'String'>
    readonly lat: FieldRef<"LocationLog", 'Float'>
    readonly lng: FieldRef<"LocationLog", 'Float'>
    readonly accuracy: FieldRef<"LocationLog", 'Float'>
    readonly createdAt: FieldRef<"LocationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocationLog findUnique
   */
  export type LocationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog findUniqueOrThrow
   */
  export type LocationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog findFirst
   */
  export type LocationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationLogs.
     */
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog findFirstOrThrow
   */
  export type LocationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter, which LocationLog to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocationLogs.
     */
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog findMany
   */
  export type LocationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter, which LocationLogs to fetch.
     */
    where?: LocationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocationLogs to fetch.
     */
    orderBy?: LocationLogOrderByWithRelationInput | LocationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocationLogs.
     */
    cursor?: LocationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocationLogs.
     */
    skip?: number
    distinct?: LocationLogScalarFieldEnum | LocationLogScalarFieldEnum[]
  }

  /**
   * LocationLog create
   */
  export type LocationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * The data needed to create a LocationLog.
     */
    data: XOR<LocationLogCreateInput, LocationLogUncheckedCreateInput>
  }

  /**
   * LocationLog createMany
   */
  export type LocationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocationLogs.
     */
    data: LocationLogCreateManyInput | LocationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationLog createManyAndReturn
   */
  export type LocationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LocationLogs.
     */
    data: LocationLogCreateManyInput | LocationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocationLog update
   */
  export type LocationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * The data needed to update a LocationLog.
     */
    data: XOR<LocationLogUpdateInput, LocationLogUncheckedUpdateInput>
    /**
     * Choose, which LocationLog to update.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog updateMany
   */
  export type LocationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocationLogs.
     */
    data: XOR<LocationLogUpdateManyMutationInput, LocationLogUncheckedUpdateManyInput>
    /**
     * Filter which LocationLogs to update
     */
    where?: LocationLogWhereInput
  }

  /**
   * LocationLog upsert
   */
  export type LocationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * The filter to search for the LocationLog to update in case it exists.
     */
    where: LocationLogWhereUniqueInput
    /**
     * In case the LocationLog found by the `where` argument doesn't exist, create a new LocationLog with this data.
     */
    create: XOR<LocationLogCreateInput, LocationLogUncheckedCreateInput>
    /**
     * In case the LocationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationLogUpdateInput, LocationLogUncheckedUpdateInput>
  }

  /**
   * LocationLog delete
   */
  export type LocationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
    /**
     * Filter which LocationLog to delete.
     */
    where: LocationLogWhereUniqueInput
  }

  /**
   * LocationLog deleteMany
   */
  export type LocationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocationLogs to delete
     */
    where?: LocationLogWhereInput
  }

  /**
   * LocationLog without action
   */
  export type LocationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationLog
     */
    select?: LocationLogSelect<ExtArgs> | null
  }


  /**
   * Model PricingEvent
   */

  export type AggregatePricingEvent = {
    _count: PricingEventCountAggregateOutputType | null
    _avg: PricingEventAvgAggregateOutputType | null
    _sum: PricingEventSumAggregateOutputType | null
    _min: PricingEventMinAggregateOutputType | null
    _max: PricingEventMaxAggregateOutputType | null
  }

  export type PricingEventAvgAggregateOutputType = {
    predictedPrice: number | null
    predictedMin: number | null
    predictedMax: number | null
  }

  export type PricingEventSumAggregateOutputType = {
    predictedPrice: number | null
    predictedMin: number | null
    predictedMax: number | null
  }

  export type PricingEventMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    userId: string | null
    inputDescription: string | null
    location: string | null
    urgency: string | null
    predictedPrice: number | null
    predictedMin: number | null
    predictedMax: number | null
    confidence: string | null
    modelVersion: string | null
    createdAt: Date | null
  }

  export type PricingEventMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    userId: string | null
    inputDescription: string | null
    location: string | null
    urgency: string | null
    predictedPrice: number | null
    predictedMin: number | null
    predictedMax: number | null
    confidence: string | null
    modelVersion: string | null
    createdAt: Date | null
  }

  export type PricingEventCountAggregateOutputType = {
    id: number
    jobId: number
    userId: number
    inputDescription: number
    location: number
    urgency: number
    predictedPrice: number
    predictedMin: number
    predictedMax: number
    confidence: number
    modelVersion: number
    featuresJson: number
    createdAt: number
    _all: number
  }


  export type PricingEventAvgAggregateInputType = {
    predictedPrice?: true
    predictedMin?: true
    predictedMax?: true
  }

  export type PricingEventSumAggregateInputType = {
    predictedPrice?: true
    predictedMin?: true
    predictedMax?: true
  }

  export type PricingEventMinAggregateInputType = {
    id?: true
    jobId?: true
    userId?: true
    inputDescription?: true
    location?: true
    urgency?: true
    predictedPrice?: true
    predictedMin?: true
    predictedMax?: true
    confidence?: true
    modelVersion?: true
    createdAt?: true
  }

  export type PricingEventMaxAggregateInputType = {
    id?: true
    jobId?: true
    userId?: true
    inputDescription?: true
    location?: true
    urgency?: true
    predictedPrice?: true
    predictedMin?: true
    predictedMax?: true
    confidence?: true
    modelVersion?: true
    createdAt?: true
  }

  export type PricingEventCountAggregateInputType = {
    id?: true
    jobId?: true
    userId?: true
    inputDescription?: true
    location?: true
    urgency?: true
    predictedPrice?: true
    predictedMin?: true
    predictedMax?: true
    confidence?: true
    modelVersion?: true
    featuresJson?: true
    createdAt?: true
    _all?: true
  }

  export type PricingEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingEvent to aggregate.
     */
    where?: PricingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingEvents to fetch.
     */
    orderBy?: PricingEventOrderByWithRelationInput | PricingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingEvents
    **/
    _count?: true | PricingEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingEventMaxAggregateInputType
  }

  export type GetPricingEventAggregateType<T extends PricingEventAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingEvent[P]>
      : GetScalarType<T[P], AggregatePricingEvent[P]>
  }




  export type PricingEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingEventWhereInput
    orderBy?: PricingEventOrderByWithAggregationInput | PricingEventOrderByWithAggregationInput[]
    by: PricingEventScalarFieldEnum[] | PricingEventScalarFieldEnum
    having?: PricingEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingEventCountAggregateInputType | true
    _avg?: PricingEventAvgAggregateInputType
    _sum?: PricingEventSumAggregateInputType
    _min?: PricingEventMinAggregateInputType
    _max?: PricingEventMaxAggregateInputType
  }

  export type PricingEventGroupByOutputType = {
    id: string
    jobId: string | null
    userId: string | null
    inputDescription: string
    location: string
    urgency: string
    predictedPrice: number
    predictedMin: number
    predictedMax: number
    confidence: string
    modelVersion: string
    featuresJson: JsonValue
    createdAt: Date
    _count: PricingEventCountAggregateOutputType | null
    _avg: PricingEventAvgAggregateOutputType | null
    _sum: PricingEventSumAggregateOutputType | null
    _min: PricingEventMinAggregateOutputType | null
    _max: PricingEventMaxAggregateOutputType | null
  }

  type GetPricingEventGroupByPayload<T extends PricingEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingEventGroupByOutputType[P]>
            : GetScalarType<T[P], PricingEventGroupByOutputType[P]>
        }
      >
    >


  export type PricingEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    userId?: boolean
    inputDescription?: boolean
    location?: boolean
    urgency?: boolean
    predictedPrice?: boolean
    predictedMin?: boolean
    predictedMax?: boolean
    confidence?: boolean
    modelVersion?: boolean
    featuresJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pricingEvent"]>

  export type PricingEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    userId?: boolean
    inputDescription?: boolean
    location?: boolean
    urgency?: boolean
    predictedPrice?: boolean
    predictedMin?: boolean
    predictedMax?: boolean
    confidence?: boolean
    modelVersion?: boolean
    featuresJson?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pricingEvent"]>

  export type PricingEventSelectScalar = {
    id?: boolean
    jobId?: boolean
    userId?: boolean
    inputDescription?: boolean
    location?: boolean
    urgency?: boolean
    predictedPrice?: boolean
    predictedMin?: boolean
    predictedMax?: boolean
    confidence?: boolean
    modelVersion?: boolean
    featuresJson?: boolean
    createdAt?: boolean
  }


  export type $PricingEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string | null
      userId: string | null
      inputDescription: string
      location: string
      urgency: string
      predictedPrice: number
      predictedMin: number
      predictedMax: number
      confidence: string
      modelVersion: string
      featuresJson: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["pricingEvent"]>
    composites: {}
  }

  type PricingEventGetPayload<S extends boolean | null | undefined | PricingEventDefaultArgs> = $Result.GetResult<Prisma.$PricingEventPayload, S>

  type PricingEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PricingEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PricingEventCountAggregateInputType | true
    }

  export interface PricingEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingEvent'], meta: { name: 'PricingEvent' } }
    /**
     * Find zero or one PricingEvent that matches the filter.
     * @param {PricingEventFindUniqueArgs} args - Arguments to find a PricingEvent
     * @example
     * // Get one PricingEvent
     * const pricingEvent = await prisma.pricingEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingEventFindUniqueArgs>(args: SelectSubset<T, PricingEventFindUniqueArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PricingEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PricingEventFindUniqueOrThrowArgs} args - Arguments to find a PricingEvent
     * @example
     * // Get one PricingEvent
     * const pricingEvent = await prisma.pricingEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingEventFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PricingEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventFindFirstArgs} args - Arguments to find a PricingEvent
     * @example
     * // Get one PricingEvent
     * const pricingEvent = await prisma.pricingEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingEventFindFirstArgs>(args?: SelectSubset<T, PricingEventFindFirstArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PricingEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventFindFirstOrThrowArgs} args - Arguments to find a PricingEvent
     * @example
     * // Get one PricingEvent
     * const pricingEvent = await prisma.pricingEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingEventFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PricingEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingEvents
     * const pricingEvents = await prisma.pricingEvent.findMany()
     * 
     * // Get first 10 PricingEvents
     * const pricingEvents = await prisma.pricingEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingEventWithIdOnly = await prisma.pricingEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingEventFindManyArgs>(args?: SelectSubset<T, PricingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PricingEvent.
     * @param {PricingEventCreateArgs} args - Arguments to create a PricingEvent.
     * @example
     * // Create one PricingEvent
     * const PricingEvent = await prisma.pricingEvent.create({
     *   data: {
     *     // ... data to create a PricingEvent
     *   }
     * })
     * 
     */
    create<T extends PricingEventCreateArgs>(args: SelectSubset<T, PricingEventCreateArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PricingEvents.
     * @param {PricingEventCreateManyArgs} args - Arguments to create many PricingEvents.
     * @example
     * // Create many PricingEvents
     * const pricingEvent = await prisma.pricingEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingEventCreateManyArgs>(args?: SelectSubset<T, PricingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PricingEvents and returns the data saved in the database.
     * @param {PricingEventCreateManyAndReturnArgs} args - Arguments to create many PricingEvents.
     * @example
     * // Create many PricingEvents
     * const pricingEvent = await prisma.pricingEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PricingEvents and only return the `id`
     * const pricingEventWithIdOnly = await prisma.pricingEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PricingEventCreateManyAndReturnArgs>(args?: SelectSubset<T, PricingEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PricingEvent.
     * @param {PricingEventDeleteArgs} args - Arguments to delete one PricingEvent.
     * @example
     * // Delete one PricingEvent
     * const PricingEvent = await prisma.pricingEvent.delete({
     *   where: {
     *     // ... filter to delete one PricingEvent
     *   }
     * })
     * 
     */
    delete<T extends PricingEventDeleteArgs>(args: SelectSubset<T, PricingEventDeleteArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PricingEvent.
     * @param {PricingEventUpdateArgs} args - Arguments to update one PricingEvent.
     * @example
     * // Update one PricingEvent
     * const pricingEvent = await prisma.pricingEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingEventUpdateArgs>(args: SelectSubset<T, PricingEventUpdateArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PricingEvents.
     * @param {PricingEventDeleteManyArgs} args - Arguments to filter PricingEvents to delete.
     * @example
     * // Delete a few PricingEvents
     * const { count } = await prisma.pricingEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingEventDeleteManyArgs>(args?: SelectSubset<T, PricingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingEvents
     * const pricingEvent = await prisma.pricingEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingEventUpdateManyArgs>(args: SelectSubset<T, PricingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingEvent.
     * @param {PricingEventUpsertArgs} args - Arguments to update or create a PricingEvent.
     * @example
     * // Update or create a PricingEvent
     * const pricingEvent = await prisma.pricingEvent.upsert({
     *   create: {
     *     // ... data to create a PricingEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingEvent we want to update
     *   }
     * })
     */
    upsert<T extends PricingEventUpsertArgs>(args: SelectSubset<T, PricingEventUpsertArgs<ExtArgs>>): Prisma__PricingEventClient<$Result.GetResult<Prisma.$PricingEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PricingEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventCountArgs} args - Arguments to filter PricingEvents to count.
     * @example
     * // Count the number of PricingEvents
     * const count = await prisma.pricingEvent.count({
     *   where: {
     *     // ... the filter for the PricingEvents we want to count
     *   }
     * })
    **/
    count<T extends PricingEventCountArgs>(
      args?: Subset<T, PricingEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingEventAggregateArgs>(args: Subset<T, PricingEventAggregateArgs>): Prisma.PrismaPromise<GetPricingEventAggregateType<T>>

    /**
     * Group by PricingEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingEventGroupByArgs['orderBy'] }
        : { orderBy?: PricingEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingEvent model
   */
  readonly fields: PricingEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingEvent model
   */ 
  interface PricingEventFieldRefs {
    readonly id: FieldRef<"PricingEvent", 'String'>
    readonly jobId: FieldRef<"PricingEvent", 'String'>
    readonly userId: FieldRef<"PricingEvent", 'String'>
    readonly inputDescription: FieldRef<"PricingEvent", 'String'>
    readonly location: FieldRef<"PricingEvent", 'String'>
    readonly urgency: FieldRef<"PricingEvent", 'String'>
    readonly predictedPrice: FieldRef<"PricingEvent", 'Float'>
    readonly predictedMin: FieldRef<"PricingEvent", 'Float'>
    readonly predictedMax: FieldRef<"PricingEvent", 'Float'>
    readonly confidence: FieldRef<"PricingEvent", 'String'>
    readonly modelVersion: FieldRef<"PricingEvent", 'String'>
    readonly featuresJson: FieldRef<"PricingEvent", 'Json'>
    readonly createdAt: FieldRef<"PricingEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingEvent findUnique
   */
  export type PricingEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter, which PricingEvent to fetch.
     */
    where: PricingEventWhereUniqueInput
  }

  /**
   * PricingEvent findUniqueOrThrow
   */
  export type PricingEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter, which PricingEvent to fetch.
     */
    where: PricingEventWhereUniqueInput
  }

  /**
   * PricingEvent findFirst
   */
  export type PricingEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter, which PricingEvent to fetch.
     */
    where?: PricingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingEvents to fetch.
     */
    orderBy?: PricingEventOrderByWithRelationInput | PricingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingEvents.
     */
    cursor?: PricingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingEvents.
     */
    distinct?: PricingEventScalarFieldEnum | PricingEventScalarFieldEnum[]
  }

  /**
   * PricingEvent findFirstOrThrow
   */
  export type PricingEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter, which PricingEvent to fetch.
     */
    where?: PricingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingEvents to fetch.
     */
    orderBy?: PricingEventOrderByWithRelationInput | PricingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingEvents.
     */
    cursor?: PricingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingEvents.
     */
    distinct?: PricingEventScalarFieldEnum | PricingEventScalarFieldEnum[]
  }

  /**
   * PricingEvent findMany
   */
  export type PricingEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter, which PricingEvents to fetch.
     */
    where?: PricingEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingEvents to fetch.
     */
    orderBy?: PricingEventOrderByWithRelationInput | PricingEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingEvents.
     */
    cursor?: PricingEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingEvents.
     */
    skip?: number
    distinct?: PricingEventScalarFieldEnum | PricingEventScalarFieldEnum[]
  }

  /**
   * PricingEvent create
   */
  export type PricingEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * The data needed to create a PricingEvent.
     */
    data: XOR<PricingEventCreateInput, PricingEventUncheckedCreateInput>
  }

  /**
   * PricingEvent createMany
   */
  export type PricingEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingEvents.
     */
    data: PricingEventCreateManyInput | PricingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingEvent createManyAndReturn
   */
  export type PricingEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PricingEvents.
     */
    data: PricingEventCreateManyInput | PricingEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingEvent update
   */
  export type PricingEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * The data needed to update a PricingEvent.
     */
    data: XOR<PricingEventUpdateInput, PricingEventUncheckedUpdateInput>
    /**
     * Choose, which PricingEvent to update.
     */
    where: PricingEventWhereUniqueInput
  }

  /**
   * PricingEvent updateMany
   */
  export type PricingEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingEvents.
     */
    data: XOR<PricingEventUpdateManyMutationInput, PricingEventUncheckedUpdateManyInput>
    /**
     * Filter which PricingEvents to update
     */
    where?: PricingEventWhereInput
  }

  /**
   * PricingEvent upsert
   */
  export type PricingEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * The filter to search for the PricingEvent to update in case it exists.
     */
    where: PricingEventWhereUniqueInput
    /**
     * In case the PricingEvent found by the `where` argument doesn't exist, create a new PricingEvent with this data.
     */
    create: XOR<PricingEventCreateInput, PricingEventUncheckedCreateInput>
    /**
     * In case the PricingEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingEventUpdateInput, PricingEventUncheckedUpdateInput>
  }

  /**
   * PricingEvent delete
   */
  export type PricingEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
    /**
     * Filter which PricingEvent to delete.
     */
    where: PricingEventWhereUniqueInput
  }

  /**
   * PricingEvent deleteMany
   */
  export type PricingEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingEvents to delete
     */
    where?: PricingEventWhereInput
  }

  /**
   * PricingEvent without action
   */
  export type PricingEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingEvent
     */
    select?: PricingEventSelect<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    contractorId: string | null
    customerId: string | null
    updatedAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    contractorId: string | null
    customerId: string | null
    updatedAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    jobId: number
    rating: number
    comment: number
    createdAt: number
    contractorId: number
    customerId: number
    updatedAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    jobId?: true
    rating?: true
    comment?: true
    createdAt?: true
    contractorId?: true
    customerId?: true
    updatedAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    jobId?: true
    rating?: true
    comment?: true
    createdAt?: true
    contractorId?: true
    customerId?: true
    updatedAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    jobId?: true
    rating?: true
    comment?: true
    createdAt?: true
    contractorId?: true
    customerId?: true
    updatedAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    jobId: string
    rating: number
    comment: string | null
    createdAt: Date
    contractorId: string
    customerId: string
    updatedAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    contractorId?: boolean
    customerId?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    contractorId?: boolean
    customerId?: boolean
    updatedAt?: boolean
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    jobId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    contractorId?: boolean
    customerId?: boolean
    updatedAt?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    contractor?: boolean | ContractorDefaultArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      contractor: Prisma.$ContractorPayload<ExtArgs>
      customer: Prisma.$UserPayload<ExtArgs>
      job: Prisma.$JobPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      rating: number
      comment: string | null
      createdAt: Date
      contractorId: string
      customerId: string
      updatedAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    contractor<T extends ContractorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ContractorDefaultArgs<ExtArgs>>): Prisma__ContractorClient<$Result.GetResult<Prisma.$ContractorPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly jobId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly contractorId: FieldRef<"Review", 'String'>
    readonly customerId: FieldRef<"Review", 'String'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model ContractorLead
   */

  export type AggregateContractorLead = {
    _count: ContractorLeadCountAggregateOutputType | null
    _min: ContractorLeadMinAggregateOutputType | null
    _max: ContractorLeadMaxAggregateOutputType | null
  }

  export type ContractorLeadMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    tradeType: string | null
    suburbOrZip: string | null
    source: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorLeadMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    tradeType: string | null
    suburbOrZip: string | null
    source: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContractorLeadCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    tradeType: number
    suburbOrZip: number
    source: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContractorLeadMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    tradeType?: true
    suburbOrZip?: true
    source?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorLeadMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    tradeType?: true
    suburbOrZip?: true
    source?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContractorLeadCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    tradeType?: true
    suburbOrZip?: true
    source?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContractorLeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorLead to aggregate.
     */
    where?: ContractorLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorLeads to fetch.
     */
    orderBy?: ContractorLeadOrderByWithRelationInput | ContractorLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContractorLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ContractorLeads
    **/
    _count?: true | ContractorLeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContractorLeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContractorLeadMaxAggregateInputType
  }

  export type GetContractorLeadAggregateType<T extends ContractorLeadAggregateArgs> = {
        [P in keyof T & keyof AggregateContractorLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContractorLead[P]>
      : GetScalarType<T[P], AggregateContractorLead[P]>
  }




  export type ContractorLeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContractorLeadWhereInput
    orderBy?: ContractorLeadOrderByWithAggregationInput | ContractorLeadOrderByWithAggregationInput[]
    by: ContractorLeadScalarFieldEnum[] | ContractorLeadScalarFieldEnum
    having?: ContractorLeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContractorLeadCountAggregateInputType | true
    _min?: ContractorLeadMinAggregateInputType
    _max?: ContractorLeadMaxAggregateInputType
  }

  export type ContractorLeadGroupByOutputType = {
    id: string
    name: string
    phone: string
    tradeType: string
    suburbOrZip: string
    source: string
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ContractorLeadCountAggregateOutputType | null
    _min: ContractorLeadMinAggregateOutputType | null
    _max: ContractorLeadMaxAggregateOutputType | null
  }

  type GetContractorLeadGroupByPayload<T extends ContractorLeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContractorLeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContractorLeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContractorLeadGroupByOutputType[P]>
            : GetScalarType<T[P], ContractorLeadGroupByOutputType[P]>
        }
      >
    >


  export type ContractorLeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    tradeType?: boolean
    suburbOrZip?: boolean
    source?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contractorLead"]>

  export type ContractorLeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    tradeType?: boolean
    suburbOrZip?: boolean
    source?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["contractorLead"]>

  export type ContractorLeadSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    tradeType?: boolean
    suburbOrZip?: boolean
    source?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ContractorLeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ContractorLead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phone: string
      tradeType: string
      suburbOrZip: string
      source: string
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contractorLead"]>
    composites: {}
  }

  type ContractorLeadGetPayload<S extends boolean | null | undefined | ContractorLeadDefaultArgs> = $Result.GetResult<Prisma.$ContractorLeadPayload, S>

  type ContractorLeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ContractorLeadFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ContractorLeadCountAggregateInputType | true
    }

  export interface ContractorLeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ContractorLead'], meta: { name: 'ContractorLead' } }
    /**
     * Find zero or one ContractorLead that matches the filter.
     * @param {ContractorLeadFindUniqueArgs} args - Arguments to find a ContractorLead
     * @example
     * // Get one ContractorLead
     * const contractorLead = await prisma.contractorLead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContractorLeadFindUniqueArgs>(args: SelectSubset<T, ContractorLeadFindUniqueArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ContractorLead that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ContractorLeadFindUniqueOrThrowArgs} args - Arguments to find a ContractorLead
     * @example
     * // Get one ContractorLead
     * const contractorLead = await prisma.contractorLead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContractorLeadFindUniqueOrThrowArgs>(args: SelectSubset<T, ContractorLeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ContractorLead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadFindFirstArgs} args - Arguments to find a ContractorLead
     * @example
     * // Get one ContractorLead
     * const contractorLead = await prisma.contractorLead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContractorLeadFindFirstArgs>(args?: SelectSubset<T, ContractorLeadFindFirstArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ContractorLead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadFindFirstOrThrowArgs} args - Arguments to find a ContractorLead
     * @example
     * // Get one ContractorLead
     * const contractorLead = await prisma.contractorLead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContractorLeadFindFirstOrThrowArgs>(args?: SelectSubset<T, ContractorLeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ContractorLeads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ContractorLeads
     * const contractorLeads = await prisma.contractorLead.findMany()
     * 
     * // Get first 10 ContractorLeads
     * const contractorLeads = await prisma.contractorLead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contractorLeadWithIdOnly = await prisma.contractorLead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContractorLeadFindManyArgs>(args?: SelectSubset<T, ContractorLeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ContractorLead.
     * @param {ContractorLeadCreateArgs} args - Arguments to create a ContractorLead.
     * @example
     * // Create one ContractorLead
     * const ContractorLead = await prisma.contractorLead.create({
     *   data: {
     *     // ... data to create a ContractorLead
     *   }
     * })
     * 
     */
    create<T extends ContractorLeadCreateArgs>(args: SelectSubset<T, ContractorLeadCreateArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ContractorLeads.
     * @param {ContractorLeadCreateManyArgs} args - Arguments to create many ContractorLeads.
     * @example
     * // Create many ContractorLeads
     * const contractorLead = await prisma.contractorLead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContractorLeadCreateManyArgs>(args?: SelectSubset<T, ContractorLeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ContractorLeads and returns the data saved in the database.
     * @param {ContractorLeadCreateManyAndReturnArgs} args - Arguments to create many ContractorLeads.
     * @example
     * // Create many ContractorLeads
     * const contractorLead = await prisma.contractorLead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ContractorLeads and only return the `id`
     * const contractorLeadWithIdOnly = await prisma.contractorLead.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContractorLeadCreateManyAndReturnArgs>(args?: SelectSubset<T, ContractorLeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ContractorLead.
     * @param {ContractorLeadDeleteArgs} args - Arguments to delete one ContractorLead.
     * @example
     * // Delete one ContractorLead
     * const ContractorLead = await prisma.contractorLead.delete({
     *   where: {
     *     // ... filter to delete one ContractorLead
     *   }
     * })
     * 
     */
    delete<T extends ContractorLeadDeleteArgs>(args: SelectSubset<T, ContractorLeadDeleteArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ContractorLead.
     * @param {ContractorLeadUpdateArgs} args - Arguments to update one ContractorLead.
     * @example
     * // Update one ContractorLead
     * const contractorLead = await prisma.contractorLead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContractorLeadUpdateArgs>(args: SelectSubset<T, ContractorLeadUpdateArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ContractorLeads.
     * @param {ContractorLeadDeleteManyArgs} args - Arguments to filter ContractorLeads to delete.
     * @example
     * // Delete a few ContractorLeads
     * const { count } = await prisma.contractorLead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContractorLeadDeleteManyArgs>(args?: SelectSubset<T, ContractorLeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ContractorLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ContractorLeads
     * const contractorLead = await prisma.contractorLead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContractorLeadUpdateManyArgs>(args: SelectSubset<T, ContractorLeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ContractorLead.
     * @param {ContractorLeadUpsertArgs} args - Arguments to update or create a ContractorLead.
     * @example
     * // Update or create a ContractorLead
     * const contractorLead = await prisma.contractorLead.upsert({
     *   create: {
     *     // ... data to create a ContractorLead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ContractorLead we want to update
     *   }
     * })
     */
    upsert<T extends ContractorLeadUpsertArgs>(args: SelectSubset<T, ContractorLeadUpsertArgs<ExtArgs>>): Prisma__ContractorLeadClient<$Result.GetResult<Prisma.$ContractorLeadPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ContractorLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadCountArgs} args - Arguments to filter ContractorLeads to count.
     * @example
     * // Count the number of ContractorLeads
     * const count = await prisma.contractorLead.count({
     *   where: {
     *     // ... the filter for the ContractorLeads we want to count
     *   }
     * })
    **/
    count<T extends ContractorLeadCountArgs>(
      args?: Subset<T, ContractorLeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContractorLeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ContractorLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContractorLeadAggregateArgs>(args: Subset<T, ContractorLeadAggregateArgs>): Prisma.PrismaPromise<GetContractorLeadAggregateType<T>>

    /**
     * Group by ContractorLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContractorLeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContractorLeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContractorLeadGroupByArgs['orderBy'] }
        : { orderBy?: ContractorLeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContractorLeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContractorLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ContractorLead model
   */
  readonly fields: ContractorLeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ContractorLead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContractorLeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ContractorLead model
   */ 
  interface ContractorLeadFieldRefs {
    readonly id: FieldRef<"ContractorLead", 'String'>
    readonly name: FieldRef<"ContractorLead", 'String'>
    readonly phone: FieldRef<"ContractorLead", 'String'>
    readonly tradeType: FieldRef<"ContractorLead", 'String'>
    readonly suburbOrZip: FieldRef<"ContractorLead", 'String'>
    readonly source: FieldRef<"ContractorLead", 'String'>
    readonly status: FieldRef<"ContractorLead", 'String'>
    readonly notes: FieldRef<"ContractorLead", 'String'>
    readonly createdAt: FieldRef<"ContractorLead", 'DateTime'>
    readonly updatedAt: FieldRef<"ContractorLead", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ContractorLead findUnique
   */
  export type ContractorLeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter, which ContractorLead to fetch.
     */
    where: ContractorLeadWhereUniqueInput
  }

  /**
   * ContractorLead findUniqueOrThrow
   */
  export type ContractorLeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter, which ContractorLead to fetch.
     */
    where: ContractorLeadWhereUniqueInput
  }

  /**
   * ContractorLead findFirst
   */
  export type ContractorLeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter, which ContractorLead to fetch.
     */
    where?: ContractorLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorLeads to fetch.
     */
    orderBy?: ContractorLeadOrderByWithRelationInput | ContractorLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorLeads.
     */
    cursor?: ContractorLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorLeads.
     */
    distinct?: ContractorLeadScalarFieldEnum | ContractorLeadScalarFieldEnum[]
  }

  /**
   * ContractorLead findFirstOrThrow
   */
  export type ContractorLeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter, which ContractorLead to fetch.
     */
    where?: ContractorLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorLeads to fetch.
     */
    orderBy?: ContractorLeadOrderByWithRelationInput | ContractorLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ContractorLeads.
     */
    cursor?: ContractorLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ContractorLeads.
     */
    distinct?: ContractorLeadScalarFieldEnum | ContractorLeadScalarFieldEnum[]
  }

  /**
   * ContractorLead findMany
   */
  export type ContractorLeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter, which ContractorLeads to fetch.
     */
    where?: ContractorLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ContractorLeads to fetch.
     */
    orderBy?: ContractorLeadOrderByWithRelationInput | ContractorLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ContractorLeads.
     */
    cursor?: ContractorLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ContractorLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ContractorLeads.
     */
    skip?: number
    distinct?: ContractorLeadScalarFieldEnum | ContractorLeadScalarFieldEnum[]
  }

  /**
   * ContractorLead create
   */
  export type ContractorLeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * The data needed to create a ContractorLead.
     */
    data: XOR<ContractorLeadCreateInput, ContractorLeadUncheckedCreateInput>
  }

  /**
   * ContractorLead createMany
   */
  export type ContractorLeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ContractorLeads.
     */
    data: ContractorLeadCreateManyInput | ContractorLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractorLead createManyAndReturn
   */
  export type ContractorLeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ContractorLeads.
     */
    data: ContractorLeadCreateManyInput | ContractorLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ContractorLead update
   */
  export type ContractorLeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * The data needed to update a ContractorLead.
     */
    data: XOR<ContractorLeadUpdateInput, ContractorLeadUncheckedUpdateInput>
    /**
     * Choose, which ContractorLead to update.
     */
    where: ContractorLeadWhereUniqueInput
  }

  /**
   * ContractorLead updateMany
   */
  export type ContractorLeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ContractorLeads.
     */
    data: XOR<ContractorLeadUpdateManyMutationInput, ContractorLeadUncheckedUpdateManyInput>
    /**
     * Filter which ContractorLeads to update
     */
    where?: ContractorLeadWhereInput
  }

  /**
   * ContractorLead upsert
   */
  export type ContractorLeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * The filter to search for the ContractorLead to update in case it exists.
     */
    where: ContractorLeadWhereUniqueInput
    /**
     * In case the ContractorLead found by the `where` argument doesn't exist, create a new ContractorLead with this data.
     */
    create: XOR<ContractorLeadCreateInput, ContractorLeadUncheckedCreateInput>
    /**
     * In case the ContractorLead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContractorLeadUpdateInput, ContractorLeadUncheckedUpdateInput>
  }

  /**
   * ContractorLead delete
   */
  export type ContractorLeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
    /**
     * Filter which ContractorLead to delete.
     */
    where: ContractorLeadWhereUniqueInput
  }

  /**
   * ContractorLead deleteMany
   */
  export type ContractorLeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ContractorLeads to delete
     */
    where?: ContractorLeadWhereInput
  }

  /**
   * ContractorLead without action
   */
  export type ContractorLeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContractorLead
     */
    select?: ContractorLeadSelect<ExtArgs> | null
  }


  /**
   * Model AdminAction
   */

  export type AggregateAdminAction = {
    _count: AdminActionCountAggregateOutputType | null
    _min: AdminActionMinAggregateOutputType | null
    _max: AdminActionMaxAggregateOutputType | null
  }

  export type AdminActionMinAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    jobId: string | null
    actionType: string | null
    previousStatus: string | null
    newStatus: string | null
    note: string | null
    createdAt: Date | null
  }

  export type AdminActionMaxAggregateOutputType = {
    id: string | null
    adminUserId: string | null
    jobId: string | null
    actionType: string | null
    previousStatus: string | null
    newStatus: string | null
    note: string | null
    createdAt: Date | null
  }

  export type AdminActionCountAggregateOutputType = {
    id: number
    adminUserId: number
    jobId: number
    actionType: number
    previousStatus: number
    newStatus: number
    note: number
    createdAt: number
    _all: number
  }


  export type AdminActionMinAggregateInputType = {
    id?: true
    adminUserId?: true
    jobId?: true
    actionType?: true
    previousStatus?: true
    newStatus?: true
    note?: true
    createdAt?: true
  }

  export type AdminActionMaxAggregateInputType = {
    id?: true
    adminUserId?: true
    jobId?: true
    actionType?: true
    previousStatus?: true
    newStatus?: true
    note?: true
    createdAt?: true
  }

  export type AdminActionCountAggregateInputType = {
    id?: true
    adminUserId?: true
    jobId?: true
    actionType?: true
    previousStatus?: true
    newStatus?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type AdminActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAction to aggregate.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminActions
    **/
    _count?: true | AdminActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminActionMaxAggregateInputType
  }

  export type GetAdminActionAggregateType<T extends AdminActionAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminAction[P]>
      : GetScalarType<T[P], AggregateAdminAction[P]>
  }




  export type AdminActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminActionWhereInput
    orderBy?: AdminActionOrderByWithAggregationInput | AdminActionOrderByWithAggregationInput[]
    by: AdminActionScalarFieldEnum[] | AdminActionScalarFieldEnum
    having?: AdminActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminActionCountAggregateInputType | true
    _min?: AdminActionMinAggregateInputType
    _max?: AdminActionMaxAggregateInputType
  }

  export type AdminActionGroupByOutputType = {
    id: string
    adminUserId: string | null
    jobId: string
    actionType: string
    previousStatus: string | null
    newStatus: string | null
    note: string | null
    createdAt: Date
    _count: AdminActionCountAggregateOutputType | null
    _min: AdminActionMinAggregateOutputType | null
    _max: AdminActionMaxAggregateOutputType | null
  }

  type GetAdminActionGroupByPayload<T extends AdminActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminActionGroupByOutputType[P]>
            : GetScalarType<T[P], AdminActionGroupByOutputType[P]>
        }
      >
    >


  export type AdminActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    jobId?: boolean
    actionType?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAction"]>

  export type AdminActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminUserId?: boolean
    jobId?: boolean
    actionType?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["adminAction"]>

  export type AdminActionSelectScalar = {
    id?: boolean
    adminUserId?: boolean
    jobId?: boolean
    actionType?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    note?: boolean
    createdAt?: boolean
  }


  export type $AdminActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminAction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      adminUserId: string | null
      jobId: string
      actionType: string
      previousStatus: string | null
      newStatus: string | null
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["adminAction"]>
    composites: {}
  }

  type AdminActionGetPayload<S extends boolean | null | undefined | AdminActionDefaultArgs> = $Result.GetResult<Prisma.$AdminActionPayload, S>

  type AdminActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminActionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminActionCountAggregateInputType | true
    }

  export interface AdminActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminAction'], meta: { name: 'AdminAction' } }
    /**
     * Find zero or one AdminAction that matches the filter.
     * @param {AdminActionFindUniqueArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminActionFindUniqueArgs>(args: SelectSubset<T, AdminActionFindUniqueArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminAction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminActionFindUniqueOrThrowArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminActionFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindFirstArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminActionFindFirstArgs>(args?: SelectSubset<T, AdminActionFindFirstArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindFirstOrThrowArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminActionFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminActions
     * const adminActions = await prisma.adminAction.findMany()
     * 
     * // Get first 10 AdminActions
     * const adminActions = await prisma.adminAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminActionWithIdOnly = await prisma.adminAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminActionFindManyArgs>(args?: SelectSubset<T, AdminActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminAction.
     * @param {AdminActionCreateArgs} args - Arguments to create a AdminAction.
     * @example
     * // Create one AdminAction
     * const AdminAction = await prisma.adminAction.create({
     *   data: {
     *     // ... data to create a AdminAction
     *   }
     * })
     * 
     */
    create<T extends AdminActionCreateArgs>(args: SelectSubset<T, AdminActionCreateArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminActions.
     * @param {AdminActionCreateManyArgs} args - Arguments to create many AdminActions.
     * @example
     * // Create many AdminActions
     * const adminAction = await prisma.adminAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminActionCreateManyArgs>(args?: SelectSubset<T, AdminActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminActions and returns the data saved in the database.
     * @param {AdminActionCreateManyAndReturnArgs} args - Arguments to create many AdminActions.
     * @example
     * // Create many AdminActions
     * const adminAction = await prisma.adminAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminActions and only return the `id`
     * const adminActionWithIdOnly = await prisma.adminAction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminActionCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminAction.
     * @param {AdminActionDeleteArgs} args - Arguments to delete one AdminAction.
     * @example
     * // Delete one AdminAction
     * const AdminAction = await prisma.adminAction.delete({
     *   where: {
     *     // ... filter to delete one AdminAction
     *   }
     * })
     * 
     */
    delete<T extends AdminActionDeleteArgs>(args: SelectSubset<T, AdminActionDeleteArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminAction.
     * @param {AdminActionUpdateArgs} args - Arguments to update one AdminAction.
     * @example
     * // Update one AdminAction
     * const adminAction = await prisma.adminAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminActionUpdateArgs>(args: SelectSubset<T, AdminActionUpdateArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminActions.
     * @param {AdminActionDeleteManyArgs} args - Arguments to filter AdminActions to delete.
     * @example
     * // Delete a few AdminActions
     * const { count } = await prisma.adminAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminActionDeleteManyArgs>(args?: SelectSubset<T, AdminActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminActions
     * const adminAction = await prisma.adminAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminActionUpdateManyArgs>(args: SelectSubset<T, AdminActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminAction.
     * @param {AdminActionUpsertArgs} args - Arguments to update or create a AdminAction.
     * @example
     * // Update or create a AdminAction
     * const adminAction = await prisma.adminAction.upsert({
     *   create: {
     *     // ... data to create a AdminAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminAction we want to update
     *   }
     * })
     */
    upsert<T extends AdminActionUpsertArgs>(args: SelectSubset<T, AdminActionUpsertArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionCountArgs} args - Arguments to filter AdminActions to count.
     * @example
     * // Count the number of AdminActions
     * const count = await prisma.adminAction.count({
     *   where: {
     *     // ... the filter for the AdminActions we want to count
     *   }
     * })
    **/
    count<T extends AdminActionCountArgs>(
      args?: Subset<T, AdminActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminActionAggregateArgs>(args: Subset<T, AdminActionAggregateArgs>): Prisma.PrismaPromise<GetAdminActionAggregateType<T>>

    /**
     * Group by AdminAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminActionGroupByArgs['orderBy'] }
        : { orderBy?: AdminActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminAction model
   */
  readonly fields: AdminActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminAction model
   */ 
  interface AdminActionFieldRefs {
    readonly id: FieldRef<"AdminAction", 'String'>
    readonly adminUserId: FieldRef<"AdminAction", 'String'>
    readonly jobId: FieldRef<"AdminAction", 'String'>
    readonly actionType: FieldRef<"AdminAction", 'String'>
    readonly previousStatus: FieldRef<"AdminAction", 'String'>
    readonly newStatus: FieldRef<"AdminAction", 'String'>
    readonly note: FieldRef<"AdminAction", 'String'>
    readonly createdAt: FieldRef<"AdminAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminAction findUnique
   */
  export type AdminActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction findUniqueOrThrow
   */
  export type AdminActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction findFirst
   */
  export type AdminActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminActions.
     */
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction findFirstOrThrow
   */
  export type AdminActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminActions.
     */
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction findMany
   */
  export type AdminActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter, which AdminActions to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction create
   */
  export type AdminActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * The data needed to create a AdminAction.
     */
    data: XOR<AdminActionCreateInput, AdminActionUncheckedCreateInput>
  }

  /**
   * AdminAction createMany
   */
  export type AdminActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminActions.
     */
    data: AdminActionCreateManyInput | AdminActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAction createManyAndReturn
   */
  export type AdminActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminActions.
     */
    data: AdminActionCreateManyInput | AdminActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAction update
   */
  export type AdminActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * The data needed to update a AdminAction.
     */
    data: XOR<AdminActionUpdateInput, AdminActionUncheckedUpdateInput>
    /**
     * Choose, which AdminAction to update.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction updateMany
   */
  export type AdminActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminActions.
     */
    data: XOR<AdminActionUpdateManyMutationInput, AdminActionUncheckedUpdateManyInput>
    /**
     * Filter which AdminActions to update
     */
    where?: AdminActionWhereInput
  }

  /**
   * AdminAction upsert
   */
  export type AdminActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * The filter to search for the AdminAction to update in case it exists.
     */
    where: AdminActionWhereUniqueInput
    /**
     * In case the AdminAction found by the `where` argument doesn't exist, create a new AdminAction with this data.
     */
    create: XOR<AdminActionCreateInput, AdminActionUncheckedCreateInput>
    /**
     * In case the AdminAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminActionUpdateInput, AdminActionUncheckedUpdateInput>
  }

  /**
   * AdminAction delete
   */
  export type AdminActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Filter which AdminAction to delete.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction deleteMany
   */
  export type AdminActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminActions to delete
     */
    where?: AdminActionWhereInput
  }

  /**
   * AdminAction without action
   */
  export type AdminActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
  }


  /**
   * Model VerificationCode
   */

  export type AggregateVerificationCode = {
    _count: VerificationCodeCountAggregateOutputType | null
    _min: VerificationCodeMinAggregateOutputType | null
    _max: VerificationCodeMaxAggregateOutputType | null
  }

  export type VerificationCodeMinAggregateOutputType = {
    id: string | null
    target: string | null
    code: string | null
    type: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type VerificationCodeMaxAggregateOutputType = {
    id: string | null
    target: string | null
    code: string | null
    type: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type VerificationCodeCountAggregateOutputType = {
    id: number
    target: number
    code: number
    type: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type VerificationCodeMinAggregateInputType = {
    id?: true
    target?: true
    code?: true
    type?: true
    expiresAt?: true
    createdAt?: true
  }

  export type VerificationCodeMaxAggregateInputType = {
    id?: true
    target?: true
    code?: true
    type?: true
    expiresAt?: true
    createdAt?: true
  }

  export type VerificationCodeCountAggregateInputType = {
    id?: true
    target?: true
    code?: true
    type?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type VerificationCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationCode to aggregate.
     */
    where?: VerificationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationCodes to fetch.
     */
    orderBy?: VerificationCodeOrderByWithRelationInput | VerificationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationCodes
    **/
    _count?: true | VerificationCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationCodeMaxAggregateInputType
  }

  export type GetVerificationCodeAggregateType<T extends VerificationCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationCode[P]>
      : GetScalarType<T[P], AggregateVerificationCode[P]>
  }




  export type VerificationCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationCodeWhereInput
    orderBy?: VerificationCodeOrderByWithAggregationInput | VerificationCodeOrderByWithAggregationInput[]
    by: VerificationCodeScalarFieldEnum[] | VerificationCodeScalarFieldEnum
    having?: VerificationCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCodeCountAggregateInputType | true
    _min?: VerificationCodeMinAggregateInputType
    _max?: VerificationCodeMaxAggregateInputType
  }

  export type VerificationCodeGroupByOutputType = {
    id: string
    target: string
    code: string
    type: string
    expiresAt: Date
    createdAt: Date
    _count: VerificationCodeCountAggregateOutputType | null
    _min: VerificationCodeMinAggregateOutputType | null
    _max: VerificationCodeMaxAggregateOutputType | null
  }

  type GetVerificationCodeGroupByPayload<T extends VerificationCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationCodeGroupByOutputType[P]>
        }
      >
    >


  export type VerificationCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationCode"]>

  export type VerificationCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    target?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["verificationCode"]>

  export type VerificationCodeSelectScalar = {
    id?: boolean
    target?: boolean
    code?: boolean
    type?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }


  export type $VerificationCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      target: string
      code: string
      type: string
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["verificationCode"]>
    composites: {}
  }

  type VerificationCodeGetPayload<S extends boolean | null | undefined | VerificationCodeDefaultArgs> = $Result.GetResult<Prisma.$VerificationCodePayload, S>

  type VerificationCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VerificationCodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VerificationCodeCountAggregateInputType | true
    }

  export interface VerificationCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationCode'], meta: { name: 'VerificationCode' } }
    /**
     * Find zero or one VerificationCode that matches the filter.
     * @param {VerificationCodeFindUniqueArgs} args - Arguments to find a VerificationCode
     * @example
     * // Get one VerificationCode
     * const verificationCode = await prisma.verificationCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationCodeFindUniqueArgs>(args: SelectSubset<T, VerificationCodeFindUniqueArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one VerificationCode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VerificationCodeFindUniqueOrThrowArgs} args - Arguments to find a VerificationCode
     * @example
     * // Get one VerificationCode
     * const verificationCode = await prisma.verificationCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first VerificationCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeFindFirstArgs} args - Arguments to find a VerificationCode
     * @example
     * // Get one VerificationCode
     * const verificationCode = await prisma.verificationCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationCodeFindFirstArgs>(args?: SelectSubset<T, VerificationCodeFindFirstArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first VerificationCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeFindFirstOrThrowArgs} args - Arguments to find a VerificationCode
     * @example
     * // Get one VerificationCode
     * const verificationCode = await prisma.verificationCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more VerificationCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationCodes
     * const verificationCodes = await prisma.verificationCode.findMany()
     * 
     * // Get first 10 VerificationCodes
     * const verificationCodes = await prisma.verificationCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationCodeWithIdOnly = await prisma.verificationCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationCodeFindManyArgs>(args?: SelectSubset<T, VerificationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a VerificationCode.
     * @param {VerificationCodeCreateArgs} args - Arguments to create a VerificationCode.
     * @example
     * // Create one VerificationCode
     * const VerificationCode = await prisma.verificationCode.create({
     *   data: {
     *     // ... data to create a VerificationCode
     *   }
     * })
     * 
     */
    create<T extends VerificationCodeCreateArgs>(args: SelectSubset<T, VerificationCodeCreateArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many VerificationCodes.
     * @param {VerificationCodeCreateManyArgs} args - Arguments to create many VerificationCodes.
     * @example
     * // Create many VerificationCodes
     * const verificationCode = await prisma.verificationCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCodeCreateManyArgs>(args?: SelectSubset<T, VerificationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationCodes and returns the data saved in the database.
     * @param {VerificationCodeCreateManyAndReturnArgs} args - Arguments to create many VerificationCodes.
     * @example
     * // Create many VerificationCodes
     * const verificationCode = await prisma.verificationCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationCodes and only return the `id`
     * const verificationCodeWithIdOnly = await prisma.verificationCode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a VerificationCode.
     * @param {VerificationCodeDeleteArgs} args - Arguments to delete one VerificationCode.
     * @example
     * // Delete one VerificationCode
     * const VerificationCode = await prisma.verificationCode.delete({
     *   where: {
     *     // ... filter to delete one VerificationCode
     *   }
     * })
     * 
     */
    delete<T extends VerificationCodeDeleteArgs>(args: SelectSubset<T, VerificationCodeDeleteArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one VerificationCode.
     * @param {VerificationCodeUpdateArgs} args - Arguments to update one VerificationCode.
     * @example
     * // Update one VerificationCode
     * const verificationCode = await prisma.verificationCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationCodeUpdateArgs>(args: SelectSubset<T, VerificationCodeUpdateArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more VerificationCodes.
     * @param {VerificationCodeDeleteManyArgs} args - Arguments to filter VerificationCodes to delete.
     * @example
     * // Delete a few VerificationCodes
     * const { count } = await prisma.verificationCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationCodeDeleteManyArgs>(args?: SelectSubset<T, VerificationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationCodes
     * const verificationCode = await prisma.verificationCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationCodeUpdateManyArgs>(args: SelectSubset<T, VerificationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationCode.
     * @param {VerificationCodeUpsertArgs} args - Arguments to update or create a VerificationCode.
     * @example
     * // Update or create a VerificationCode
     * const verificationCode = await prisma.verificationCode.upsert({
     *   create: {
     *     // ... data to create a VerificationCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationCode we want to update
     *   }
     * })
     */
    upsert<T extends VerificationCodeUpsertArgs>(args: SelectSubset<T, VerificationCodeUpsertArgs<ExtArgs>>): Prisma__VerificationCodeClient<$Result.GetResult<Prisma.$VerificationCodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of VerificationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeCountArgs} args - Arguments to filter VerificationCodes to count.
     * @example
     * // Count the number of VerificationCodes
     * const count = await prisma.verificationCode.count({
     *   where: {
     *     // ... the filter for the VerificationCodes we want to count
     *   }
     * })
    **/
    count<T extends VerificationCodeCountArgs>(
      args?: Subset<T, VerificationCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationCodeAggregateArgs>(args: Subset<T, VerificationCodeAggregateArgs>): Prisma.PrismaPromise<GetVerificationCodeAggregateType<T>>

    /**
     * Group by VerificationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationCodeGroupByArgs['orderBy'] }
        : { orderBy?: VerificationCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationCode model
   */
  readonly fields: VerificationCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationCode model
   */ 
  interface VerificationCodeFieldRefs {
    readonly id: FieldRef<"VerificationCode", 'String'>
    readonly target: FieldRef<"VerificationCode", 'String'>
    readonly code: FieldRef<"VerificationCode", 'String'>
    readonly type: FieldRef<"VerificationCode", 'String'>
    readonly expiresAt: FieldRef<"VerificationCode", 'DateTime'>
    readonly createdAt: FieldRef<"VerificationCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationCode findUnique
   */
  export type VerificationCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter, which VerificationCode to fetch.
     */
    where: VerificationCodeWhereUniqueInput
  }

  /**
   * VerificationCode findUniqueOrThrow
   */
  export type VerificationCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter, which VerificationCode to fetch.
     */
    where: VerificationCodeWhereUniqueInput
  }

  /**
   * VerificationCode findFirst
   */
  export type VerificationCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter, which VerificationCode to fetch.
     */
    where?: VerificationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationCodes to fetch.
     */
    orderBy?: VerificationCodeOrderByWithRelationInput | VerificationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationCodes.
     */
    cursor?: VerificationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationCodes.
     */
    distinct?: VerificationCodeScalarFieldEnum | VerificationCodeScalarFieldEnum[]
  }

  /**
   * VerificationCode findFirstOrThrow
   */
  export type VerificationCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter, which VerificationCode to fetch.
     */
    where?: VerificationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationCodes to fetch.
     */
    orderBy?: VerificationCodeOrderByWithRelationInput | VerificationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationCodes.
     */
    cursor?: VerificationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationCodes.
     */
    distinct?: VerificationCodeScalarFieldEnum | VerificationCodeScalarFieldEnum[]
  }

  /**
   * VerificationCode findMany
   */
  export type VerificationCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter, which VerificationCodes to fetch.
     */
    where?: VerificationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationCodes to fetch.
     */
    orderBy?: VerificationCodeOrderByWithRelationInput | VerificationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationCodes.
     */
    cursor?: VerificationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationCodes.
     */
    skip?: number
    distinct?: VerificationCodeScalarFieldEnum | VerificationCodeScalarFieldEnum[]
  }

  /**
   * VerificationCode create
   */
  export type VerificationCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationCode.
     */
    data: XOR<VerificationCodeCreateInput, VerificationCodeUncheckedCreateInput>
  }

  /**
   * VerificationCode createMany
   */
  export type VerificationCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationCodes.
     */
    data: VerificationCodeCreateManyInput | VerificationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationCode createManyAndReturn
   */
  export type VerificationCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many VerificationCodes.
     */
    data: VerificationCodeCreateManyInput | VerificationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationCode update
   */
  export type VerificationCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationCode.
     */
    data: XOR<VerificationCodeUpdateInput, VerificationCodeUncheckedUpdateInput>
    /**
     * Choose, which VerificationCode to update.
     */
    where: VerificationCodeWhereUniqueInput
  }

  /**
   * VerificationCode updateMany
   */
  export type VerificationCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationCodes.
     */
    data: XOR<VerificationCodeUpdateManyMutationInput, VerificationCodeUncheckedUpdateManyInput>
    /**
     * Filter which VerificationCodes to update
     */
    where?: VerificationCodeWhereInput
  }

  /**
   * VerificationCode upsert
   */
  export type VerificationCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationCode to update in case it exists.
     */
    where: VerificationCodeWhereUniqueInput
    /**
     * In case the VerificationCode found by the `where` argument doesn't exist, create a new VerificationCode with this data.
     */
    create: XOR<VerificationCodeCreateInput, VerificationCodeUncheckedCreateInput>
    /**
     * In case the VerificationCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationCodeUpdateInput, VerificationCodeUncheckedUpdateInput>
  }

  /**
   * VerificationCode delete
   */
  export type VerificationCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
    /**
     * Filter which VerificationCode to delete.
     */
    where: VerificationCodeWhereUniqueInput
  }

  /**
   * VerificationCode deleteMany
   */
  export type VerificationCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationCodes to delete
     */
    where?: VerificationCodeWhereInput
  }

  /**
   * VerificationCode without action
   */
  export type VerificationCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationCode
     */
    select?: VerificationCodeSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ContractorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    passwordHash: 'passwordHash',
    trade: 'trade',
    businessType: 'businessType',
    zipCodes: 'zipCodes',
    status: 'status',
    rating: 'rating',
    insuranceUploaded: 'insuranceUploaded',
    isLicensed: 'isLicensed',
    isVerified: 'isVerified',
    headline: 'headline',
    location: 'location',
    website: 'website',
    owner: 'owner',
    abn: 'abn',
    licenses: 'licenses',
    postcode: 'postcode',
    about: 'about',
    logo_url: 'logo_url',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isContactVerified: 'isContactVerified',
    suburb: 'suburb',
    reviewCount: 'reviewCount',
    hiredCount: 'hiredCount',
    recommendations: 'recommendations',
    profileUrl: 'profileUrl'
  };

  export type ContractorScalarFieldEnum = (typeof ContractorScalarFieldEnum)[keyof typeof ContractorScalarFieldEnum]


  export const ContractorEmailScalarFieldEnum: {
    id: 'id',
    email: 'email',
    type: 'type',
    isVerified: 'isVerified',
    contractorId: 'contractorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContractorEmailScalarFieldEnum = (typeof ContractorEmailScalarFieldEnum)[keyof typeof ContractorEmailScalarFieldEnum]


  export const ContractorPhoneScalarFieldEnum: {
    id: 'id',
    number: 'number',
    type: 'type',
    isVerified: 'isVerified',
    contractorId: 'contractorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContractorPhoneScalarFieldEnum = (typeof ContractorPhoneScalarFieldEnum)[keyof typeof ContractorPhoneScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    description: 'description',
    location: 'location',
    urgency: 'urgency',
    category: 'category',
    problemType: 'problemType',
    severity: 'severity',
    estimatedTimeMinutes: 'estimatedTimeMinutes',
    partsRequired: 'partsRequired',
    quotedPrice: 'quotedPrice',
    quotedPriceMin: 'quotedPriceMin',
    quotedPriceMax: 'quotedPriceMax',
    confidence: 'confidence',
    status: 'status',
    userId: 'userId',
    contractorId: 'contractorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    address: 'address',
    postcode: 'postcode',
    customerLocation: 'customerLocation',
    serviceCharge: 'serviceCharge',
    paymentStatus: 'paymentStatus',
    stripeSessionId: 'stripeSessionId'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    status: 'status',
    jobId: 'jobId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const LocationLogScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    contractorId: 'contractorId',
    lat: 'lat',
    lng: 'lng',
    accuracy: 'accuracy',
    createdAt: 'createdAt'
  };

  export type LocationLogScalarFieldEnum = (typeof LocationLogScalarFieldEnum)[keyof typeof LocationLogScalarFieldEnum]


  export const PricingEventScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    userId: 'userId',
    inputDescription: 'inputDescription',
    location: 'location',
    urgency: 'urgency',
    predictedPrice: 'predictedPrice',
    predictedMin: 'predictedMin',
    predictedMax: 'predictedMax',
    confidence: 'confidence',
    modelVersion: 'modelVersion',
    featuresJson: 'featuresJson',
    createdAt: 'createdAt'
  };

  export type PricingEventScalarFieldEnum = (typeof PricingEventScalarFieldEnum)[keyof typeof PricingEventScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    contractorId: 'contractorId',
    customerId: 'customerId',
    updatedAt: 'updatedAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const ContractorLeadScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    tradeType: 'tradeType',
    suburbOrZip: 'suburbOrZip',
    source: 'source',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContractorLeadScalarFieldEnum = (typeof ContractorLeadScalarFieldEnum)[keyof typeof ContractorLeadScalarFieldEnum]


  export const AdminActionScalarFieldEnum: {
    id: 'id',
    adminUserId: 'adminUserId',
    jobId: 'jobId',
    actionType: 'actionType',
    previousStatus: 'previousStatus',
    newStatus: 'newStatus',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type AdminActionScalarFieldEnum = (typeof AdminActionScalarFieldEnum)[keyof typeof AdminActionScalarFieldEnum]


  export const VerificationCodeScalarFieldEnum: {
    id: 'id',
    target: 'target',
    code: 'code',
    type: 'type',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type VerificationCodeScalarFieldEnum = (typeof VerificationCodeScalarFieldEnum)[keyof typeof VerificationCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    jobs?: JobListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    jobs?: JobOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    jobs?: JobListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ContractorWhereInput = {
    AND?: ContractorWhereInput | ContractorWhereInput[]
    OR?: ContractorWhereInput[]
    NOT?: ContractorWhereInput | ContractorWhereInput[]
    id?: StringFilter<"Contractor"> | string
    name?: StringFilter<"Contractor"> | string
    passwordHash?: StringFilter<"Contractor"> | string
    trade?: StringFilter<"Contractor"> | string
    businessType?: StringFilter<"Contractor"> | string
    zipCodes?: StringNullableListFilter<"Contractor">
    status?: StringFilter<"Contractor"> | string
    rating?: FloatNullableFilter<"Contractor"> | number | null
    insuranceUploaded?: BoolFilter<"Contractor"> | boolean
    isLicensed?: BoolFilter<"Contractor"> | boolean
    isVerified?: BoolFilter<"Contractor"> | boolean
    headline?: StringNullableFilter<"Contractor"> | string | null
    location?: StringNullableFilter<"Contractor"> | string | null
    website?: StringNullableFilter<"Contractor"> | string | null
    owner?: StringNullableFilter<"Contractor"> | string | null
    abn?: StringNullableFilter<"Contractor"> | string | null
    licenses?: StringNullableListFilter<"Contractor">
    postcode?: StringNullableFilter<"Contractor"> | string | null
    about?: StringNullableFilter<"Contractor"> | string | null
    logo_url?: StringNullableFilter<"Contractor"> | string | null
    address?: StringNullableFilter<"Contractor"> | string | null
    createdAt?: DateTimeFilter<"Contractor"> | Date | string
    updatedAt?: DateTimeFilter<"Contractor"> | Date | string
    isContactVerified?: BoolFilter<"Contractor"> | boolean
    suburb?: StringNullableFilter<"Contractor"> | string | null
    reviewCount?: IntFilter<"Contractor"> | number
    hiredCount?: IntFilter<"Contractor"> | number
    recommendations?: IntFilter<"Contractor"> | number
    profileUrl?: StringNullableFilter<"Contractor"> | string | null
    emails?: ContractorEmailListRelationFilter
    phones?: ContractorPhoneListRelationFilter
    jobs?: JobListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type ContractorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    trade?: SortOrder
    businessType?: SortOrder
    zipCodes?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    insuranceUploaded?: SortOrder
    isLicensed?: SortOrder
    isVerified?: SortOrder
    headline?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    abn?: SortOrderInput | SortOrder
    licenses?: SortOrder
    postcode?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isContactVerified?: SortOrder
    suburb?: SortOrderInput | SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
    profileUrl?: SortOrderInput | SortOrder
    emails?: ContractorEmailOrderByRelationAggregateInput
    phones?: ContractorPhoneOrderByRelationAggregateInput
    jobs?: JobOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type ContractorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractorWhereInput | ContractorWhereInput[]
    OR?: ContractorWhereInput[]
    NOT?: ContractorWhereInput | ContractorWhereInput[]
    name?: StringFilter<"Contractor"> | string
    passwordHash?: StringFilter<"Contractor"> | string
    trade?: StringFilter<"Contractor"> | string
    businessType?: StringFilter<"Contractor"> | string
    zipCodes?: StringNullableListFilter<"Contractor">
    status?: StringFilter<"Contractor"> | string
    rating?: FloatNullableFilter<"Contractor"> | number | null
    insuranceUploaded?: BoolFilter<"Contractor"> | boolean
    isLicensed?: BoolFilter<"Contractor"> | boolean
    isVerified?: BoolFilter<"Contractor"> | boolean
    headline?: StringNullableFilter<"Contractor"> | string | null
    location?: StringNullableFilter<"Contractor"> | string | null
    website?: StringNullableFilter<"Contractor"> | string | null
    owner?: StringNullableFilter<"Contractor"> | string | null
    abn?: StringNullableFilter<"Contractor"> | string | null
    licenses?: StringNullableListFilter<"Contractor">
    postcode?: StringNullableFilter<"Contractor"> | string | null
    about?: StringNullableFilter<"Contractor"> | string | null
    logo_url?: StringNullableFilter<"Contractor"> | string | null
    address?: StringNullableFilter<"Contractor"> | string | null
    createdAt?: DateTimeFilter<"Contractor"> | Date | string
    updatedAt?: DateTimeFilter<"Contractor"> | Date | string
    isContactVerified?: BoolFilter<"Contractor"> | boolean
    suburb?: StringNullableFilter<"Contractor"> | string | null
    reviewCount?: IntFilter<"Contractor"> | number
    hiredCount?: IntFilter<"Contractor"> | number
    recommendations?: IntFilter<"Contractor"> | number
    profileUrl?: StringNullableFilter<"Contractor"> | string | null
    emails?: ContractorEmailListRelationFilter
    phones?: ContractorPhoneListRelationFilter
    jobs?: JobListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id">

  export type ContractorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    trade?: SortOrder
    businessType?: SortOrder
    zipCodes?: SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    insuranceUploaded?: SortOrder
    isLicensed?: SortOrder
    isVerified?: SortOrder
    headline?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    owner?: SortOrderInput | SortOrder
    abn?: SortOrderInput | SortOrder
    licenses?: SortOrder
    postcode?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isContactVerified?: SortOrder
    suburb?: SortOrderInput | SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
    profileUrl?: SortOrderInput | SortOrder
    _count?: ContractorCountOrderByAggregateInput
    _avg?: ContractorAvgOrderByAggregateInput
    _max?: ContractorMaxOrderByAggregateInput
    _min?: ContractorMinOrderByAggregateInput
    _sum?: ContractorSumOrderByAggregateInput
  }

  export type ContractorScalarWhereWithAggregatesInput = {
    AND?: ContractorScalarWhereWithAggregatesInput | ContractorScalarWhereWithAggregatesInput[]
    OR?: ContractorScalarWhereWithAggregatesInput[]
    NOT?: ContractorScalarWhereWithAggregatesInput | ContractorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contractor"> | string
    name?: StringWithAggregatesFilter<"Contractor"> | string
    passwordHash?: StringWithAggregatesFilter<"Contractor"> | string
    trade?: StringWithAggregatesFilter<"Contractor"> | string
    businessType?: StringWithAggregatesFilter<"Contractor"> | string
    zipCodes?: StringNullableListFilter<"Contractor">
    status?: StringWithAggregatesFilter<"Contractor"> | string
    rating?: FloatNullableWithAggregatesFilter<"Contractor"> | number | null
    insuranceUploaded?: BoolWithAggregatesFilter<"Contractor"> | boolean
    isLicensed?: BoolWithAggregatesFilter<"Contractor"> | boolean
    isVerified?: BoolWithAggregatesFilter<"Contractor"> | boolean
    headline?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    location?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    website?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    owner?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    abn?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    licenses?: StringNullableListFilter<"Contractor">
    postcode?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    about?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    logo_url?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    address?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contractor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contractor"> | Date | string
    isContactVerified?: BoolWithAggregatesFilter<"Contractor"> | boolean
    suburb?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
    reviewCount?: IntWithAggregatesFilter<"Contractor"> | number
    hiredCount?: IntWithAggregatesFilter<"Contractor"> | number
    recommendations?: IntWithAggregatesFilter<"Contractor"> | number
    profileUrl?: StringNullableWithAggregatesFilter<"Contractor"> | string | null
  }

  export type ContractorEmailWhereInput = {
    AND?: ContractorEmailWhereInput | ContractorEmailWhereInput[]
    OR?: ContractorEmailWhereInput[]
    NOT?: ContractorEmailWhereInput | ContractorEmailWhereInput[]
    id?: StringFilter<"ContractorEmail"> | string
    email?: StringFilter<"ContractorEmail"> | string
    type?: StringFilter<"ContractorEmail"> | string
    isVerified?: BoolFilter<"ContractorEmail"> | boolean
    contractorId?: StringFilter<"ContractorEmail"> | string
    createdAt?: DateTimeFilter<"ContractorEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorEmail"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
  }

  export type ContractorEmailOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractor?: ContractorOrderByWithRelationInput
  }

  export type ContractorEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ContractorEmailWhereInput | ContractorEmailWhereInput[]
    OR?: ContractorEmailWhereInput[]
    NOT?: ContractorEmailWhereInput | ContractorEmailWhereInput[]
    type?: StringFilter<"ContractorEmail"> | string
    isVerified?: BoolFilter<"ContractorEmail"> | boolean
    contractorId?: StringFilter<"ContractorEmail"> | string
    createdAt?: DateTimeFilter<"ContractorEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorEmail"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
  }, "id" | "email">

  export type ContractorEmailOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContractorEmailCountOrderByAggregateInput
    _max?: ContractorEmailMaxOrderByAggregateInput
    _min?: ContractorEmailMinOrderByAggregateInput
  }

  export type ContractorEmailScalarWhereWithAggregatesInput = {
    AND?: ContractorEmailScalarWhereWithAggregatesInput | ContractorEmailScalarWhereWithAggregatesInput[]
    OR?: ContractorEmailScalarWhereWithAggregatesInput[]
    NOT?: ContractorEmailScalarWhereWithAggregatesInput | ContractorEmailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractorEmail"> | string
    email?: StringWithAggregatesFilter<"ContractorEmail"> | string
    type?: StringWithAggregatesFilter<"ContractorEmail"> | string
    isVerified?: BoolWithAggregatesFilter<"ContractorEmail"> | boolean
    contractorId?: StringWithAggregatesFilter<"ContractorEmail"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContractorEmail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContractorEmail"> | Date | string
  }

  export type ContractorPhoneWhereInput = {
    AND?: ContractorPhoneWhereInput | ContractorPhoneWhereInput[]
    OR?: ContractorPhoneWhereInput[]
    NOT?: ContractorPhoneWhereInput | ContractorPhoneWhereInput[]
    id?: StringFilter<"ContractorPhone"> | string
    number?: StringFilter<"ContractorPhone"> | string
    type?: StringFilter<"ContractorPhone"> | string
    isVerified?: BoolFilter<"ContractorPhone"> | boolean
    contractorId?: StringFilter<"ContractorPhone"> | string
    createdAt?: DateTimeFilter<"ContractorPhone"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorPhone"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
  }

  export type ContractorPhoneOrderByWithRelationInput = {
    id?: SortOrder
    number?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    contractor?: ContractorOrderByWithRelationInput
  }

  export type ContractorPhoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractorPhoneWhereInput | ContractorPhoneWhereInput[]
    OR?: ContractorPhoneWhereInput[]
    NOT?: ContractorPhoneWhereInput | ContractorPhoneWhereInput[]
    number?: StringFilter<"ContractorPhone"> | string
    type?: StringFilter<"ContractorPhone"> | string
    isVerified?: BoolFilter<"ContractorPhone"> | boolean
    contractorId?: StringFilter<"ContractorPhone"> | string
    createdAt?: DateTimeFilter<"ContractorPhone"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorPhone"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
  }, "id">

  export type ContractorPhoneOrderByWithAggregationInput = {
    id?: SortOrder
    number?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContractorPhoneCountOrderByAggregateInput
    _max?: ContractorPhoneMaxOrderByAggregateInput
    _min?: ContractorPhoneMinOrderByAggregateInput
  }

  export type ContractorPhoneScalarWhereWithAggregatesInput = {
    AND?: ContractorPhoneScalarWhereWithAggregatesInput | ContractorPhoneScalarWhereWithAggregatesInput[]
    OR?: ContractorPhoneScalarWhereWithAggregatesInput[]
    NOT?: ContractorPhoneScalarWhereWithAggregatesInput | ContractorPhoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractorPhone"> | string
    number?: StringWithAggregatesFilter<"ContractorPhone"> | string
    type?: StringWithAggregatesFilter<"ContractorPhone"> | string
    isVerified?: BoolWithAggregatesFilter<"ContractorPhone"> | boolean
    contractorId?: StringWithAggregatesFilter<"ContractorPhone"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ContractorPhone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContractorPhone"> | Date | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    urgency?: StringFilter<"Job"> | string
    category?: StringFilter<"Job"> | string
    problemType?: StringFilter<"Job"> | string
    severity?: StringFilter<"Job"> | string
    estimatedTimeMinutes?: IntFilter<"Job"> | number
    partsRequired?: BoolFilter<"Job"> | boolean
    quotedPrice?: FloatFilter<"Job"> | number
    quotedPriceMin?: FloatFilter<"Job"> | number
    quotedPriceMax?: FloatFilter<"Job"> | number
    confidence?: StringFilter<"Job"> | string
    status?: StringFilter<"Job"> | string
    userId?: StringNullableFilter<"Job"> | string | null
    contractorId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    address?: StringNullableFilter<"Job"> | string | null
    postcode?: StringNullableFilter<"Job"> | string | null
    customerLocation?: JsonNullableFilter<"Job">
    serviceCharge?: FloatNullableFilter<"Job"> | number | null
    paymentStatus?: StringFilter<"Job"> | string
    stripeSessionId?: StringNullableFilter<"Job"> | string | null
    contractor?: XOR<ContractorNullableRelationFilter, ContractorWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    parts?: PartListRelationFilter
    reviews?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    category?: SortOrder
    problemType?: SortOrder
    severity?: SortOrder
    estimatedTimeMinutes?: SortOrder
    partsRequired?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    userId?: SortOrderInput | SortOrder
    contractorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    customerLocation?: SortOrderInput | SortOrder
    serviceCharge?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    contractor?: ContractorOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    parts?: PartOrderByRelationAggregateInput
    reviews?: ReviewOrderByWithRelationInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    urgency?: StringFilter<"Job"> | string
    category?: StringFilter<"Job"> | string
    problemType?: StringFilter<"Job"> | string
    severity?: StringFilter<"Job"> | string
    estimatedTimeMinutes?: IntFilter<"Job"> | number
    partsRequired?: BoolFilter<"Job"> | boolean
    quotedPrice?: FloatFilter<"Job"> | number
    quotedPriceMin?: FloatFilter<"Job"> | number
    quotedPriceMax?: FloatFilter<"Job"> | number
    confidence?: StringFilter<"Job"> | string
    status?: StringFilter<"Job"> | string
    userId?: StringNullableFilter<"Job"> | string | null
    contractorId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    address?: StringNullableFilter<"Job"> | string | null
    postcode?: StringNullableFilter<"Job"> | string | null
    customerLocation?: JsonNullableFilter<"Job">
    serviceCharge?: FloatNullableFilter<"Job"> | number | null
    paymentStatus?: StringFilter<"Job"> | string
    stripeSessionId?: StringNullableFilter<"Job"> | string | null
    contractor?: XOR<ContractorNullableRelationFilter, ContractorWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    parts?: PartListRelationFilter
    reviews?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    category?: SortOrder
    problemType?: SortOrder
    severity?: SortOrder
    estimatedTimeMinutes?: SortOrder
    partsRequired?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    userId?: SortOrderInput | SortOrder
    contractorId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrderInput | SortOrder
    postcode?: SortOrderInput | SortOrder
    customerLocation?: SortOrderInput | SortOrder
    serviceCharge?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    description?: StringWithAggregatesFilter<"Job"> | string
    location?: StringWithAggregatesFilter<"Job"> | string
    urgency?: StringWithAggregatesFilter<"Job"> | string
    category?: StringWithAggregatesFilter<"Job"> | string
    problemType?: StringWithAggregatesFilter<"Job"> | string
    severity?: StringWithAggregatesFilter<"Job"> | string
    estimatedTimeMinutes?: IntWithAggregatesFilter<"Job"> | number
    partsRequired?: BoolWithAggregatesFilter<"Job"> | boolean
    quotedPrice?: FloatWithAggregatesFilter<"Job"> | number
    quotedPriceMin?: FloatWithAggregatesFilter<"Job"> | number
    quotedPriceMax?: FloatWithAggregatesFilter<"Job"> | number
    confidence?: StringWithAggregatesFilter<"Job"> | string
    status?: StringWithAggregatesFilter<"Job"> | string
    userId?: StringNullableWithAggregatesFilter<"Job"> | string | null
    contractorId?: StringNullableWithAggregatesFilter<"Job"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    address?: StringNullableWithAggregatesFilter<"Job"> | string | null
    postcode?: StringNullableWithAggregatesFilter<"Job"> | string | null
    customerLocation?: JsonNullableWithAggregatesFilter<"Job">
    serviceCharge?: FloatNullableWithAggregatesFilter<"Job"> | number | null
    paymentStatus?: StringWithAggregatesFilter<"Job"> | string
    stripeSessionId?: StringNullableWithAggregatesFilter<"Job"> | string | null
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    price?: FloatFilter<"Part"> | number
    status?: StringFilter<"Part"> | string
    jobId?: StringFilter<"Part"> | string
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    job?: XOR<JobRelationFilter, JobWhereInput>
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    job?: JobOrderByWithRelationInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    name?: StringFilter<"Part"> | string
    price?: FloatFilter<"Part"> | number
    status?: StringFilter<"Part"> | string
    jobId?: StringFilter<"Part"> | string
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
    job?: XOR<JobRelationFilter, JobWhereInput>
  }, "id">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    name?: StringWithAggregatesFilter<"Part"> | string
    price?: FloatWithAggregatesFilter<"Part"> | number
    status?: StringWithAggregatesFilter<"Part"> | string
    jobId?: StringWithAggregatesFilter<"Part"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Part"> | Date | string
  }

  export type LocationLogWhereInput = {
    AND?: LocationLogWhereInput | LocationLogWhereInput[]
    OR?: LocationLogWhereInput[]
    NOT?: LocationLogWhereInput | LocationLogWhereInput[]
    id?: StringFilter<"LocationLog"> | string
    jobId?: StringFilter<"LocationLog"> | string
    contractorId?: StringFilter<"LocationLog"> | string
    lat?: FloatFilter<"LocationLog"> | number
    lng?: FloatFilter<"LocationLog"> | number
    accuracy?: FloatNullableFilter<"LocationLog"> | number | null
    createdAt?: DateTimeFilter<"LocationLog"> | Date | string
  }

  export type LocationLogOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    contractorId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type LocationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationLogWhereInput | LocationLogWhereInput[]
    OR?: LocationLogWhereInput[]
    NOT?: LocationLogWhereInput | LocationLogWhereInput[]
    jobId?: StringFilter<"LocationLog"> | string
    contractorId?: StringFilter<"LocationLog"> | string
    lat?: FloatFilter<"LocationLog"> | number
    lng?: FloatFilter<"LocationLog"> | number
    accuracy?: FloatNullableFilter<"LocationLog"> | number | null
    createdAt?: DateTimeFilter<"LocationLog"> | Date | string
  }, "id">

  export type LocationLogOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    contractorId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LocationLogCountOrderByAggregateInput
    _avg?: LocationLogAvgOrderByAggregateInput
    _max?: LocationLogMaxOrderByAggregateInput
    _min?: LocationLogMinOrderByAggregateInput
    _sum?: LocationLogSumOrderByAggregateInput
  }

  export type LocationLogScalarWhereWithAggregatesInput = {
    AND?: LocationLogScalarWhereWithAggregatesInput | LocationLogScalarWhereWithAggregatesInput[]
    OR?: LocationLogScalarWhereWithAggregatesInput[]
    NOT?: LocationLogScalarWhereWithAggregatesInput | LocationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LocationLog"> | string
    jobId?: StringWithAggregatesFilter<"LocationLog"> | string
    contractorId?: StringWithAggregatesFilter<"LocationLog"> | string
    lat?: FloatWithAggregatesFilter<"LocationLog"> | number
    lng?: FloatWithAggregatesFilter<"LocationLog"> | number
    accuracy?: FloatNullableWithAggregatesFilter<"LocationLog"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"LocationLog"> | Date | string
  }

  export type PricingEventWhereInput = {
    AND?: PricingEventWhereInput | PricingEventWhereInput[]
    OR?: PricingEventWhereInput[]
    NOT?: PricingEventWhereInput | PricingEventWhereInput[]
    id?: StringFilter<"PricingEvent"> | string
    jobId?: StringNullableFilter<"PricingEvent"> | string | null
    userId?: StringNullableFilter<"PricingEvent"> | string | null
    inputDescription?: StringFilter<"PricingEvent"> | string
    location?: StringFilter<"PricingEvent"> | string
    urgency?: StringFilter<"PricingEvent"> | string
    predictedPrice?: FloatFilter<"PricingEvent"> | number
    predictedMin?: FloatFilter<"PricingEvent"> | number
    predictedMax?: FloatFilter<"PricingEvent"> | number
    confidence?: StringFilter<"PricingEvent"> | string
    modelVersion?: StringFilter<"PricingEvent"> | string
    featuresJson?: JsonFilter<"PricingEvent">
    createdAt?: DateTimeFilter<"PricingEvent"> | Date | string
  }

  export type PricingEventOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    inputDescription?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
    confidence?: SortOrder
    modelVersion?: SortOrder
    featuresJson?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PricingEventWhereInput | PricingEventWhereInput[]
    OR?: PricingEventWhereInput[]
    NOT?: PricingEventWhereInput | PricingEventWhereInput[]
    jobId?: StringNullableFilter<"PricingEvent"> | string | null
    userId?: StringNullableFilter<"PricingEvent"> | string | null
    inputDescription?: StringFilter<"PricingEvent"> | string
    location?: StringFilter<"PricingEvent"> | string
    urgency?: StringFilter<"PricingEvent"> | string
    predictedPrice?: FloatFilter<"PricingEvent"> | number
    predictedMin?: FloatFilter<"PricingEvent"> | number
    predictedMax?: FloatFilter<"PricingEvent"> | number
    confidence?: StringFilter<"PricingEvent"> | string
    modelVersion?: StringFilter<"PricingEvent"> | string
    featuresJson?: JsonFilter<"PricingEvent">
    createdAt?: DateTimeFilter<"PricingEvent"> | Date | string
  }, "id">

  export type PricingEventOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    inputDescription?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
    confidence?: SortOrder
    modelVersion?: SortOrder
    featuresJson?: SortOrder
    createdAt?: SortOrder
    _count?: PricingEventCountOrderByAggregateInput
    _avg?: PricingEventAvgOrderByAggregateInput
    _max?: PricingEventMaxOrderByAggregateInput
    _min?: PricingEventMinOrderByAggregateInput
    _sum?: PricingEventSumOrderByAggregateInput
  }

  export type PricingEventScalarWhereWithAggregatesInput = {
    AND?: PricingEventScalarWhereWithAggregatesInput | PricingEventScalarWhereWithAggregatesInput[]
    OR?: PricingEventScalarWhereWithAggregatesInput[]
    NOT?: PricingEventScalarWhereWithAggregatesInput | PricingEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PricingEvent"> | string
    jobId?: StringNullableWithAggregatesFilter<"PricingEvent"> | string | null
    userId?: StringNullableWithAggregatesFilter<"PricingEvent"> | string | null
    inputDescription?: StringWithAggregatesFilter<"PricingEvent"> | string
    location?: StringWithAggregatesFilter<"PricingEvent"> | string
    urgency?: StringWithAggregatesFilter<"PricingEvent"> | string
    predictedPrice?: FloatWithAggregatesFilter<"PricingEvent"> | number
    predictedMin?: FloatWithAggregatesFilter<"PricingEvent"> | number
    predictedMax?: FloatWithAggregatesFilter<"PricingEvent"> | number
    confidence?: StringWithAggregatesFilter<"PricingEvent"> | string
    modelVersion?: StringWithAggregatesFilter<"PricingEvent"> | string
    featuresJson?: JsonWithAggregatesFilter<"PricingEvent">
    createdAt?: DateTimeWithAggregatesFilter<"PricingEvent"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    jobId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    contractorId?: StringFilter<"Review"> | string
    customerId?: StringFilter<"Review"> | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
    customer?: XOR<UserRelationFilter, UserWhereInput>
    job?: XOR<JobRelationFilter, JobWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    contractorId?: SortOrder
    customerId?: SortOrder
    updatedAt?: SortOrder
    contractor?: ContractorOrderByWithRelationInput
    customer?: UserOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    jobId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    contractorId?: StringFilter<"Review"> | string
    customerId?: StringFilter<"Review"> | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    contractor?: XOR<ContractorRelationFilter, ContractorWhereInput>
    customer?: XOR<UserRelationFilter, UserWhereInput>
    job?: XOR<JobRelationFilter, JobWhereInput>
  }, "id" | "jobId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    contractorId?: SortOrder
    customerId?: SortOrder
    updatedAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    jobId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    contractorId?: StringWithAggregatesFilter<"Review"> | string
    customerId?: StringWithAggregatesFilter<"Review"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type ContractorLeadWhereInput = {
    AND?: ContractorLeadWhereInput | ContractorLeadWhereInput[]
    OR?: ContractorLeadWhereInput[]
    NOT?: ContractorLeadWhereInput | ContractorLeadWhereInput[]
    id?: StringFilter<"ContractorLead"> | string
    name?: StringFilter<"ContractorLead"> | string
    phone?: StringFilter<"ContractorLead"> | string
    tradeType?: StringFilter<"ContractorLead"> | string
    suburbOrZip?: StringFilter<"ContractorLead"> | string
    source?: StringFilter<"ContractorLead"> | string
    status?: StringFilter<"ContractorLead"> | string
    notes?: StringNullableFilter<"ContractorLead"> | string | null
    createdAt?: DateTimeFilter<"ContractorLead"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorLead"> | Date | string
  }

  export type ContractorLeadOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    tradeType?: SortOrder
    suburbOrZip?: SortOrder
    source?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorLeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContractorLeadWhereInput | ContractorLeadWhereInput[]
    OR?: ContractorLeadWhereInput[]
    NOT?: ContractorLeadWhereInput | ContractorLeadWhereInput[]
    name?: StringFilter<"ContractorLead"> | string
    phone?: StringFilter<"ContractorLead"> | string
    tradeType?: StringFilter<"ContractorLead"> | string
    suburbOrZip?: StringFilter<"ContractorLead"> | string
    source?: StringFilter<"ContractorLead"> | string
    status?: StringFilter<"ContractorLead"> | string
    notes?: StringNullableFilter<"ContractorLead"> | string | null
    createdAt?: DateTimeFilter<"ContractorLead"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorLead"> | Date | string
  }, "id">

  export type ContractorLeadOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    tradeType?: SortOrder
    suburbOrZip?: SortOrder
    source?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContractorLeadCountOrderByAggregateInput
    _max?: ContractorLeadMaxOrderByAggregateInput
    _min?: ContractorLeadMinOrderByAggregateInput
  }

  export type ContractorLeadScalarWhereWithAggregatesInput = {
    AND?: ContractorLeadScalarWhereWithAggregatesInput | ContractorLeadScalarWhereWithAggregatesInput[]
    OR?: ContractorLeadScalarWhereWithAggregatesInput[]
    NOT?: ContractorLeadScalarWhereWithAggregatesInput | ContractorLeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ContractorLead"> | string
    name?: StringWithAggregatesFilter<"ContractorLead"> | string
    phone?: StringWithAggregatesFilter<"ContractorLead"> | string
    tradeType?: StringWithAggregatesFilter<"ContractorLead"> | string
    suburbOrZip?: StringWithAggregatesFilter<"ContractorLead"> | string
    source?: StringWithAggregatesFilter<"ContractorLead"> | string
    status?: StringWithAggregatesFilter<"ContractorLead"> | string
    notes?: StringNullableWithAggregatesFilter<"ContractorLead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ContractorLead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ContractorLead"> | Date | string
  }

  export type AdminActionWhereInput = {
    AND?: AdminActionWhereInput | AdminActionWhereInput[]
    OR?: AdminActionWhereInput[]
    NOT?: AdminActionWhereInput | AdminActionWhereInput[]
    id?: StringFilter<"AdminAction"> | string
    adminUserId?: StringNullableFilter<"AdminAction"> | string | null
    jobId?: StringFilter<"AdminAction"> | string
    actionType?: StringFilter<"AdminAction"> | string
    previousStatus?: StringNullableFilter<"AdminAction"> | string | null
    newStatus?: StringNullableFilter<"AdminAction"> | string | null
    note?: StringNullableFilter<"AdminAction"> | string | null
    createdAt?: DateTimeFilter<"AdminAction"> | Date | string
  }

  export type AdminActionOrderByWithRelationInput = {
    id?: SortOrder
    adminUserId?: SortOrderInput | SortOrder
    jobId?: SortOrder
    actionType?: SortOrder
    previousStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminActionWhereInput | AdminActionWhereInput[]
    OR?: AdminActionWhereInput[]
    NOT?: AdminActionWhereInput | AdminActionWhereInput[]
    adminUserId?: StringNullableFilter<"AdminAction"> | string | null
    jobId?: StringFilter<"AdminAction"> | string
    actionType?: StringFilter<"AdminAction"> | string
    previousStatus?: StringNullableFilter<"AdminAction"> | string | null
    newStatus?: StringNullableFilter<"AdminAction"> | string | null
    note?: StringNullableFilter<"AdminAction"> | string | null
    createdAt?: DateTimeFilter<"AdminAction"> | Date | string
  }, "id">

  export type AdminActionOrderByWithAggregationInput = {
    id?: SortOrder
    adminUserId?: SortOrderInput | SortOrder
    jobId?: SortOrder
    actionType?: SortOrder
    previousStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdminActionCountOrderByAggregateInput
    _max?: AdminActionMaxOrderByAggregateInput
    _min?: AdminActionMinOrderByAggregateInput
  }

  export type AdminActionScalarWhereWithAggregatesInput = {
    AND?: AdminActionScalarWhereWithAggregatesInput | AdminActionScalarWhereWithAggregatesInput[]
    OR?: AdminActionScalarWhereWithAggregatesInput[]
    NOT?: AdminActionScalarWhereWithAggregatesInput | AdminActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminAction"> | string
    adminUserId?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    jobId?: StringWithAggregatesFilter<"AdminAction"> | string
    actionType?: StringWithAggregatesFilter<"AdminAction"> | string
    previousStatus?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    newStatus?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    note?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminAction"> | Date | string
  }

  export type VerificationCodeWhereInput = {
    AND?: VerificationCodeWhereInput | VerificationCodeWhereInput[]
    OR?: VerificationCodeWhereInput[]
    NOT?: VerificationCodeWhereInput | VerificationCodeWhereInput[]
    id?: StringFilter<"VerificationCode"> | string
    target?: StringFilter<"VerificationCode"> | string
    code?: StringFilter<"VerificationCode"> | string
    type?: StringFilter<"VerificationCode"> | string
    expiresAt?: DateTimeFilter<"VerificationCode"> | Date | string
    createdAt?: DateTimeFilter<"VerificationCode"> | Date | string
  }

  export type VerificationCodeOrderByWithRelationInput = {
    id?: SortOrder
    target?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationCodeWhereInput | VerificationCodeWhereInput[]
    OR?: VerificationCodeWhereInput[]
    NOT?: VerificationCodeWhereInput | VerificationCodeWhereInput[]
    target?: StringFilter<"VerificationCode"> | string
    code?: StringFilter<"VerificationCode"> | string
    type?: StringFilter<"VerificationCode"> | string
    expiresAt?: DateTimeFilter<"VerificationCode"> | Date | string
    createdAt?: DateTimeFilter<"VerificationCode"> | Date | string
  }, "id">

  export type VerificationCodeOrderByWithAggregationInput = {
    id?: SortOrder
    target?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: VerificationCodeCountOrderByAggregateInput
    _max?: VerificationCodeMaxOrderByAggregateInput
    _min?: VerificationCodeMinOrderByAggregateInput
  }

  export type VerificationCodeScalarWhereWithAggregatesInput = {
    AND?: VerificationCodeScalarWhereWithAggregatesInput | VerificationCodeScalarWhereWithAggregatesInput[]
    OR?: VerificationCodeScalarWhereWithAggregatesInput[]
    NOT?: VerificationCodeScalarWhereWithAggregatesInput | VerificationCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VerificationCode"> | string
    target?: StringWithAggregatesFilter<"VerificationCode"> | string
    code?: StringWithAggregatesFilter<"VerificationCode"> | string
    type?: StringWithAggregatesFilter<"VerificationCode"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"VerificationCode"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorCreateInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneCreateNestedManyWithoutContractorInput
    jobs?: JobCreateNestedManyWithoutContractorInput
    reviews?: ReviewCreateNestedManyWithoutContractorInput
  }

  export type ContractorUncheckedCreateInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailUncheckedCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneUncheckedCreateNestedManyWithoutContractorInput
    jobs?: JobUncheckedCreateNestedManyWithoutContractorInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutContractorInput
  }

  export type ContractorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUpdateManyWithoutContractorNestedInput
    jobs?: JobUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUpdateManyWithoutContractorNestedInput
  }

  export type ContractorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUncheckedUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUncheckedUpdateManyWithoutContractorNestedInput
    jobs?: JobUncheckedUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutContractorNestedInput
  }

  export type ContractorCreateManyInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
  }

  export type ContractorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContractorEmailCreateInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contractor: ContractorCreateNestedOneWithoutEmailsInput
  }

  export type ContractorEmailUncheckedCreateInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    contractorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorEmailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractor?: ContractorUpdateOneRequiredWithoutEmailsNestedInput
  }

  export type ContractorEmailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    contractorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorEmailCreateManyInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    contractorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorEmailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorEmailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    contractorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneCreateInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    contractor: ContractorCreateNestedOneWithoutPhonesInput
  }

  export type ContractorPhoneUncheckedCreateInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    contractorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorPhoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractor?: ContractorUpdateOneRequiredWithoutPhonesNestedInput
  }

  export type ContractorPhoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    contractorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneCreateManyInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    contractorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorPhoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    contractorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    contractor?: ContractorCreateNestedOneWithoutJobsInput
    user?: UserCreateNestedOneWithoutJobsInput
    parts?: PartCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedOneWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedOneWithoutJobInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    contractor?: ContractorUpdateOneWithoutJobsNestedInput
    user?: UserUpdateOneWithoutJobsNestedInput
    parts?: PartUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateOneWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PartCreateInput = {
    id?: string
    name: string
    price: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutPartsInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    name: string
    price: number
    status?: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutPartsNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateManyInput = {
    id?: string
    name: string
    price: number
    status?: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogCreateInput = {
    id?: string
    jobId: string
    contractorId: string
    lat: number
    lng: number
    accuracy?: number | null
    createdAt?: Date | string
  }

  export type LocationLogUncheckedCreateInput = {
    id?: string
    jobId: string
    contractorId: string
    lat: number
    lng: number
    accuracy?: number | null
    createdAt?: Date | string
  }

  export type LocationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    contractorId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    contractorId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogCreateManyInput = {
    id?: string
    jobId: string
    contractorId: string
    lat: number
    lng: number
    accuracy?: number | null
    createdAt?: Date | string
  }

  export type LocationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    contractorId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    contractorId?: StringFieldUpdateOperationsInput | string
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    accuracy?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingEventCreateInput = {
    id?: string
    jobId?: string | null
    userId?: string | null
    inputDescription: string
    location: string
    urgency: string
    predictedPrice: number
    predictedMin: number
    predictedMax: number
    confidence: string
    modelVersion: string
    featuresJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PricingEventUncheckedCreateInput = {
    id?: string
    jobId?: string | null
    userId?: string | null
    inputDescription: string
    location: string
    urgency: string
    predictedPrice: number
    predictedMin: number
    predictedMax: number
    confidence: string
    modelVersion: string
    featuresJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PricingEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputDescription?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    predictedMin?: FloatFieldUpdateOperationsInput | number
    predictedMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    featuresJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputDescription?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    predictedMin?: FloatFieldUpdateOperationsInput | number
    predictedMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    featuresJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingEventCreateManyInput = {
    id?: string
    jobId?: string | null
    userId?: string | null
    inputDescription: string
    location: string
    urgency: string
    predictedPrice: number
    predictedMin: number
    predictedMax: number
    confidence: string
    modelVersion: string
    featuresJson: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type PricingEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputDescription?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    predictedMin?: FloatFieldUpdateOperationsInput | number
    predictedMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    featuresJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    inputDescription?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    predictedPrice?: FloatFieldUpdateOperationsInput | number
    predictedMin?: FloatFieldUpdateOperationsInput | number
    predictedMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    modelVersion?: StringFieldUpdateOperationsInput | string
    featuresJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contractor: ContractorCreateNestedOneWithoutReviewsInput
    customer: UserCreateNestedOneWithoutReviewsInput
    job: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    contractorId: string
    customerId: string
    updatedAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractor?: ContractorUpdateOneRequiredWithoutReviewsNestedInput
    customer?: UserUpdateOneRequiredWithoutReviewsNestedInput
    job?: JobUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractorId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    contractorId: string
    customerId: string
    updatedAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractorId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorLeadCreateInput = {
    id?: string
    name: string
    phone: string
    tradeType: string
    suburbOrZip: string
    source: string
    status: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorLeadUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    tradeType: string
    suburbOrZip: string
    source: string
    status: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorLeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    tradeType?: StringFieldUpdateOperationsInput | string
    suburbOrZip?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorLeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    tradeType?: StringFieldUpdateOperationsInput | string
    suburbOrZip?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorLeadCreateManyInput = {
    id?: string
    name: string
    phone: string
    tradeType: string
    suburbOrZip: string
    source: string
    status: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorLeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    tradeType?: StringFieldUpdateOperationsInput | string
    suburbOrZip?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorLeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    tradeType?: StringFieldUpdateOperationsInput | string
    suburbOrZip?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionCreateInput = {
    id?: string
    adminUserId?: string | null
    jobId: string
    actionType: string
    previousStatus?: string | null
    newStatus?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUncheckedCreateInput = {
    id?: string
    adminUserId?: string | null
    jobId: string
    actionType: string
    previousStatus?: string | null
    newStatus?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    previousStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    previousStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionCreateManyInput = {
    id?: string
    adminUserId?: string | null
    jobId: string
    actionType: string
    previousStatus?: string | null
    newStatus?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    previousStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    adminUserId?: NullableStringFieldUpdateOperationsInput | string | null
    jobId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    previousStatus?: NullableStringFieldUpdateOperationsInput | string | null
    newStatus?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCodeCreateInput = {
    id?: string
    target: string
    code: string
    type: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type VerificationCodeUncheckedCreateInput = {
    id?: string
    target: string
    code: string
    type: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type VerificationCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCodeCreateManyInput = {
    id?: string
    target: string
    code: string
    type: string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type VerificationCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    target?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ContractorEmailListRelationFilter = {
    every?: ContractorEmailWhereInput
    some?: ContractorEmailWhereInput
    none?: ContractorEmailWhereInput
  }

  export type ContractorPhoneListRelationFilter = {
    every?: ContractorPhoneWhereInput
    some?: ContractorPhoneWhereInput
    none?: ContractorPhoneWhereInput
  }

  export type ContractorEmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractorPhoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContractorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    trade?: SortOrder
    businessType?: SortOrder
    zipCodes?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    insuranceUploaded?: SortOrder
    isLicensed?: SortOrder
    isVerified?: SortOrder
    headline?: SortOrder
    location?: SortOrder
    website?: SortOrder
    owner?: SortOrder
    abn?: SortOrder
    licenses?: SortOrder
    postcode?: SortOrder
    about?: SortOrder
    logo_url?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isContactVerified?: SortOrder
    suburb?: SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
    profileUrl?: SortOrder
  }

  export type ContractorAvgOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
  }

  export type ContractorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    trade?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    insuranceUploaded?: SortOrder
    isLicensed?: SortOrder
    isVerified?: SortOrder
    headline?: SortOrder
    location?: SortOrder
    website?: SortOrder
    owner?: SortOrder
    abn?: SortOrder
    postcode?: SortOrder
    about?: SortOrder
    logo_url?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isContactVerified?: SortOrder
    suburb?: SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
    profileUrl?: SortOrder
  }

  export type ContractorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    trade?: SortOrder
    businessType?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    insuranceUploaded?: SortOrder
    isLicensed?: SortOrder
    isVerified?: SortOrder
    headline?: SortOrder
    location?: SortOrder
    website?: SortOrder
    owner?: SortOrder
    abn?: SortOrder
    postcode?: SortOrder
    about?: SortOrder
    logo_url?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isContactVerified?: SortOrder
    suburb?: SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
    profileUrl?: SortOrder
  }

  export type ContractorSumOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
    hiredCount?: SortOrder
    recommendations?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ContractorRelationFilter = {
    is?: ContractorWhereInput
    isNot?: ContractorWhereInput
  }

  export type ContractorEmailCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorEmailMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorPhoneCountOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorPhoneMaxOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorPhoneMinOrderByAggregateInput = {
    id?: SortOrder
    number?: SortOrder
    type?: SortOrder
    isVerified?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ContractorNullableRelationFilter = {
    is?: ContractorWhereInput | null
    isNot?: ContractorWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PartListRelationFilter = {
    every?: PartWhereInput
    some?: PartWhereInput
    none?: PartWhereInput
  }

  export type ReviewNullableRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type PartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    category?: SortOrder
    problemType?: SortOrder
    severity?: SortOrder
    estimatedTimeMinutes?: SortOrder
    partsRequired?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    customerLocation?: SortOrder
    serviceCharge?: SortOrder
    paymentStatus?: SortOrder
    stripeSessionId?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    estimatedTimeMinutes?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    serviceCharge?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    category?: SortOrder
    problemType?: SortOrder
    severity?: SortOrder
    estimatedTimeMinutes?: SortOrder
    partsRequired?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    serviceCharge?: SortOrder
    paymentStatus?: SortOrder
    stripeSessionId?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    category?: SortOrder
    problemType?: SortOrder
    severity?: SortOrder
    estimatedTimeMinutes?: SortOrder
    partsRequired?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    contractorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    postcode?: SortOrder
    serviceCharge?: SortOrder
    paymentStatus?: SortOrder
    stripeSessionId?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    estimatedTimeMinutes?: SortOrder
    quotedPrice?: SortOrder
    quotedPriceMin?: SortOrder
    quotedPriceMax?: SortOrder
    serviceCharge?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type JobRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    status?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type LocationLogCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    contractorId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
  }

  export type LocationLogAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrder
  }

  export type LocationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    contractorId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
  }

  export type LocationLogMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    contractorId?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrder
    createdAt?: SortOrder
  }

  export type LocationLogSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
    accuracy?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PricingEventCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    userId?: SortOrder
    inputDescription?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
    confidence?: SortOrder
    modelVersion?: SortOrder
    featuresJson?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingEventAvgOrderByAggregateInput = {
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
  }

  export type PricingEventMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    userId?: SortOrder
    inputDescription?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
    confidence?: SortOrder
    modelVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingEventMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    userId?: SortOrder
    inputDescription?: SortOrder
    location?: SortOrder
    urgency?: SortOrder
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
    confidence?: SortOrder
    modelVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type PricingEventSumOrderByAggregateInput = {
    predictedPrice?: SortOrder
    predictedMin?: SortOrder
    predictedMax?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    contractorId?: SortOrder
    customerId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    contractorId?: SortOrder
    customerId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    contractorId?: SortOrder
    customerId?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ContractorLeadCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    tradeType?: SortOrder
    suburbOrZip?: SortOrder
    source?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorLeadMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    tradeType?: SortOrder
    suburbOrZip?: SortOrder
    source?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContractorLeadMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    tradeType?: SortOrder
    suburbOrZip?: SortOrder
    source?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminActionCountOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    jobId?: SortOrder
    actionType?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionMaxOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    jobId?: SortOrder
    actionType?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionMinOrderByAggregateInput = {
    id?: SortOrder
    adminUserId?: SortOrder
    jobId?: SortOrder
    actionType?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationCodeCountOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type VerificationCodeMinOrderByAggregateInput = {
    id?: SortOrder
    target?: SortOrder
    code?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type JobCreateNestedManyWithoutUserInput = {
    create?: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput> | JobCreateWithoutUserInput[] | JobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobCreateOrConnectWithoutUserInput | JobCreateOrConnectWithoutUserInput[]
    createMany?: JobCreateManyUserInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput> | JobCreateWithoutUserInput[] | JobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobCreateOrConnectWithoutUserInput | JobCreateOrConnectWithoutUserInput[]
    createMany?: JobCreateManyUserInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JobUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput> | JobCreateWithoutUserInput[] | JobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobCreateOrConnectWithoutUserInput | JobCreateOrConnectWithoutUserInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutUserInput | JobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobCreateManyUserInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutUserInput | JobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobUpdateManyWithWhereWithoutUserInput | JobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput> | JobCreateWithoutUserInput[] | JobUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JobCreateOrConnectWithoutUserInput | JobCreateOrConnectWithoutUserInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutUserInput | JobUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JobCreateManyUserInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutUserInput | JobUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JobUpdateManyWithWhereWithoutUserInput | JobUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput> | ReviewCreateWithoutCustomerInput[] | ReviewUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutCustomerInput | ReviewCreateOrConnectWithoutCustomerInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutCustomerInput | ReviewUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ReviewCreateManyCustomerInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutCustomerInput | ReviewUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutCustomerInput | ReviewUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ContractorCreatezipCodesInput = {
    set: string[]
  }

  export type ContractorCreatelicensesInput = {
    set: string[]
  }

  export type ContractorEmailCreateNestedManyWithoutContractorInput = {
    create?: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput> | ContractorEmailCreateWithoutContractorInput[] | ContractorEmailUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorEmailCreateOrConnectWithoutContractorInput | ContractorEmailCreateOrConnectWithoutContractorInput[]
    createMany?: ContractorEmailCreateManyContractorInputEnvelope
    connect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
  }

  export type ContractorPhoneCreateNestedManyWithoutContractorInput = {
    create?: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput> | ContractorPhoneCreateWithoutContractorInput[] | ContractorPhoneUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorPhoneCreateOrConnectWithoutContractorInput | ContractorPhoneCreateOrConnectWithoutContractorInput[]
    createMany?: ContractorPhoneCreateManyContractorInputEnvelope
    connect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutContractorInput = {
    create?: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput> | JobCreateWithoutContractorInput[] | JobUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: JobCreateOrConnectWithoutContractorInput | JobCreateOrConnectWithoutContractorInput[]
    createMany?: JobCreateManyContractorInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutContractorInput = {
    create?: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput> | ReviewCreateWithoutContractorInput[] | ReviewUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutContractorInput | ReviewCreateOrConnectWithoutContractorInput[]
    createMany?: ReviewCreateManyContractorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ContractorEmailUncheckedCreateNestedManyWithoutContractorInput = {
    create?: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput> | ContractorEmailCreateWithoutContractorInput[] | ContractorEmailUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorEmailCreateOrConnectWithoutContractorInput | ContractorEmailCreateOrConnectWithoutContractorInput[]
    createMany?: ContractorEmailCreateManyContractorInputEnvelope
    connect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
  }

  export type ContractorPhoneUncheckedCreateNestedManyWithoutContractorInput = {
    create?: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput> | ContractorPhoneCreateWithoutContractorInput[] | ContractorPhoneUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorPhoneCreateOrConnectWithoutContractorInput | ContractorPhoneCreateOrConnectWithoutContractorInput[]
    createMany?: ContractorPhoneCreateManyContractorInputEnvelope
    connect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutContractorInput = {
    create?: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput> | JobCreateWithoutContractorInput[] | JobUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: JobCreateOrConnectWithoutContractorInput | JobCreateOrConnectWithoutContractorInput[]
    createMany?: JobCreateManyContractorInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutContractorInput = {
    create?: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput> | ReviewCreateWithoutContractorInput[] | ReviewUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutContractorInput | ReviewCreateOrConnectWithoutContractorInput[]
    createMany?: ReviewCreateManyContractorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ContractorUpdatezipCodesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ContractorUpdatelicensesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContractorEmailUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput> | ContractorEmailCreateWithoutContractorInput[] | ContractorEmailUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorEmailCreateOrConnectWithoutContractorInput | ContractorEmailCreateOrConnectWithoutContractorInput[]
    upsert?: ContractorEmailUpsertWithWhereUniqueWithoutContractorInput | ContractorEmailUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ContractorEmailCreateManyContractorInputEnvelope
    set?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    disconnect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    delete?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    connect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    update?: ContractorEmailUpdateWithWhereUniqueWithoutContractorInput | ContractorEmailUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ContractorEmailUpdateManyWithWhereWithoutContractorInput | ContractorEmailUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ContractorEmailScalarWhereInput | ContractorEmailScalarWhereInput[]
  }

  export type ContractorPhoneUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput> | ContractorPhoneCreateWithoutContractorInput[] | ContractorPhoneUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorPhoneCreateOrConnectWithoutContractorInput | ContractorPhoneCreateOrConnectWithoutContractorInput[]
    upsert?: ContractorPhoneUpsertWithWhereUniqueWithoutContractorInput | ContractorPhoneUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ContractorPhoneCreateManyContractorInputEnvelope
    set?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    disconnect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    delete?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    connect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    update?: ContractorPhoneUpdateWithWhereUniqueWithoutContractorInput | ContractorPhoneUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ContractorPhoneUpdateManyWithWhereWithoutContractorInput | ContractorPhoneUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ContractorPhoneScalarWhereInput | ContractorPhoneScalarWhereInput[]
  }

  export type JobUpdateManyWithoutContractorNestedInput = {
    create?: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput> | JobCreateWithoutContractorInput[] | JobUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: JobCreateOrConnectWithoutContractorInput | JobCreateOrConnectWithoutContractorInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutContractorInput | JobUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: JobCreateManyContractorInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutContractorInput | JobUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: JobUpdateManyWithWhereWithoutContractorInput | JobUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput> | ReviewCreateWithoutContractorInput[] | ReviewUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutContractorInput | ReviewCreateOrConnectWithoutContractorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutContractorInput | ReviewUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ReviewCreateManyContractorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutContractorInput | ReviewUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutContractorInput | ReviewUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ContractorEmailUncheckedUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput> | ContractorEmailCreateWithoutContractorInput[] | ContractorEmailUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorEmailCreateOrConnectWithoutContractorInput | ContractorEmailCreateOrConnectWithoutContractorInput[]
    upsert?: ContractorEmailUpsertWithWhereUniqueWithoutContractorInput | ContractorEmailUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ContractorEmailCreateManyContractorInputEnvelope
    set?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    disconnect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    delete?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    connect?: ContractorEmailWhereUniqueInput | ContractorEmailWhereUniqueInput[]
    update?: ContractorEmailUpdateWithWhereUniqueWithoutContractorInput | ContractorEmailUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ContractorEmailUpdateManyWithWhereWithoutContractorInput | ContractorEmailUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ContractorEmailScalarWhereInput | ContractorEmailScalarWhereInput[]
  }

  export type ContractorPhoneUncheckedUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput> | ContractorPhoneCreateWithoutContractorInput[] | ContractorPhoneUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ContractorPhoneCreateOrConnectWithoutContractorInput | ContractorPhoneCreateOrConnectWithoutContractorInput[]
    upsert?: ContractorPhoneUpsertWithWhereUniqueWithoutContractorInput | ContractorPhoneUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ContractorPhoneCreateManyContractorInputEnvelope
    set?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    disconnect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    delete?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    connect?: ContractorPhoneWhereUniqueInput | ContractorPhoneWhereUniqueInput[]
    update?: ContractorPhoneUpdateWithWhereUniqueWithoutContractorInput | ContractorPhoneUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ContractorPhoneUpdateManyWithWhereWithoutContractorInput | ContractorPhoneUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ContractorPhoneScalarWhereInput | ContractorPhoneScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutContractorNestedInput = {
    create?: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput> | JobCreateWithoutContractorInput[] | JobUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: JobCreateOrConnectWithoutContractorInput | JobCreateOrConnectWithoutContractorInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutContractorInput | JobUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: JobCreateManyContractorInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutContractorInput | JobUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: JobUpdateManyWithWhereWithoutContractorInput | JobUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutContractorNestedInput = {
    create?: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput> | ReviewCreateWithoutContractorInput[] | ReviewUncheckedCreateWithoutContractorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutContractorInput | ReviewCreateOrConnectWithoutContractorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutContractorInput | ReviewUpsertWithWhereUniqueWithoutContractorInput[]
    createMany?: ReviewCreateManyContractorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutContractorInput | ReviewUpdateWithWhereUniqueWithoutContractorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutContractorInput | ReviewUpdateManyWithWhereWithoutContractorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ContractorCreateNestedOneWithoutEmailsInput = {
    create?: XOR<ContractorCreateWithoutEmailsInput, ContractorUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutEmailsInput
    connect?: ContractorWhereUniqueInput
  }

  export type ContractorUpdateOneRequiredWithoutEmailsNestedInput = {
    create?: XOR<ContractorCreateWithoutEmailsInput, ContractorUncheckedCreateWithoutEmailsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutEmailsInput
    upsert?: ContractorUpsertWithoutEmailsInput
    connect?: ContractorWhereUniqueInput
    update?: XOR<XOR<ContractorUpdateToOneWithWhereWithoutEmailsInput, ContractorUpdateWithoutEmailsInput>, ContractorUncheckedUpdateWithoutEmailsInput>
  }

  export type ContractorCreateNestedOneWithoutPhonesInput = {
    create?: XOR<ContractorCreateWithoutPhonesInput, ContractorUncheckedCreateWithoutPhonesInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutPhonesInput
    connect?: ContractorWhereUniqueInput
  }

  export type ContractorUpdateOneRequiredWithoutPhonesNestedInput = {
    create?: XOR<ContractorCreateWithoutPhonesInput, ContractorUncheckedCreateWithoutPhonesInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutPhonesInput
    upsert?: ContractorUpsertWithoutPhonesInput
    connect?: ContractorWhereUniqueInput
    update?: XOR<XOR<ContractorUpdateToOneWithWhereWithoutPhonesInput, ContractorUpdateWithoutPhonesInput>, ContractorUncheckedUpdateWithoutPhonesInput>
  }

  export type ContractorCreateNestedOneWithoutJobsInput = {
    create?: XOR<ContractorCreateWithoutJobsInput, ContractorUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutJobsInput
    connect?: ContractorWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutJobsInput = {
    create?: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsInput
    connect?: UserWhereUniqueInput
  }

  export type PartCreateNestedManyWithoutJobInput = {
    create?: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput> | PartCreateWithoutJobInput[] | PartUncheckedCreateWithoutJobInput[]
    connectOrCreate?: PartCreateOrConnectWithoutJobInput | PartCreateOrConnectWithoutJobInput[]
    createMany?: PartCreateManyJobInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type ReviewCreateNestedOneWithoutJobInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput
    connect?: ReviewWhereUniqueInput
  }

  export type PartUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput> | PartCreateWithoutJobInput[] | PartUncheckedCreateWithoutJobInput[]
    connectOrCreate?: PartCreateOrConnectWithoutJobInput | PartCreateOrConnectWithoutJobInput[]
    createMany?: PartCreateManyJobInputEnvelope
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedOneWithoutJobInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput
    connect?: ReviewWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContractorUpdateOneWithoutJobsNestedInput = {
    create?: XOR<ContractorCreateWithoutJobsInput, ContractorUncheckedCreateWithoutJobsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutJobsInput
    upsert?: ContractorUpsertWithoutJobsInput
    disconnect?: ContractorWhereInput | boolean
    delete?: ContractorWhereInput | boolean
    connect?: ContractorWhereUniqueInput
    update?: XOR<XOR<ContractorUpdateToOneWithWhereWithoutJobsInput, ContractorUpdateWithoutJobsInput>, ContractorUncheckedUpdateWithoutJobsInput>
  }

  export type UserUpdateOneWithoutJobsNestedInput = {
    create?: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsInput
    upsert?: UserUpsertWithoutJobsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobsInput, UserUpdateWithoutJobsInput>, UserUncheckedUpdateWithoutJobsInput>
  }

  export type PartUpdateManyWithoutJobNestedInput = {
    create?: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput> | PartCreateWithoutJobInput[] | PartUncheckedCreateWithoutJobInput[]
    connectOrCreate?: PartCreateOrConnectWithoutJobInput | PartCreateOrConnectWithoutJobInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutJobInput | PartUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: PartCreateManyJobInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutJobInput | PartUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: PartUpdateManyWithWhereWithoutJobInput | PartUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type ReviewUpdateOneWithoutJobNestedInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput
    upsert?: ReviewUpsertWithoutJobInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutJobInput, ReviewUpdateWithoutJobInput>, ReviewUncheckedUpdateWithoutJobInput>
  }

  export type PartUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput> | PartCreateWithoutJobInput[] | PartUncheckedCreateWithoutJobInput[]
    connectOrCreate?: PartCreateOrConnectWithoutJobInput | PartCreateOrConnectWithoutJobInput[]
    upsert?: PartUpsertWithWhereUniqueWithoutJobInput | PartUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: PartCreateManyJobInputEnvelope
    set?: PartWhereUniqueInput | PartWhereUniqueInput[]
    disconnect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    delete?: PartWhereUniqueInput | PartWhereUniqueInput[]
    connect?: PartWhereUniqueInput | PartWhereUniqueInput[]
    update?: PartUpdateWithWhereUniqueWithoutJobInput | PartUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: PartUpdateManyWithWhereWithoutJobInput | PartUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: PartScalarWhereInput | PartScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateOneWithoutJobNestedInput = {
    create?: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutJobInput
    upsert?: ReviewUpsertWithoutJobInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutJobInput, ReviewUpdateWithoutJobInput>, ReviewUncheckedUpdateWithoutJobInput>
  }

  export type JobCreateNestedOneWithoutPartsInput = {
    create?: XOR<JobCreateWithoutPartsInput, JobUncheckedCreateWithoutPartsInput>
    connectOrCreate?: JobCreateOrConnectWithoutPartsInput
    connect?: JobWhereUniqueInput
  }

  export type JobUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<JobCreateWithoutPartsInput, JobUncheckedCreateWithoutPartsInput>
    connectOrCreate?: JobCreateOrConnectWithoutPartsInput
    upsert?: JobUpsertWithoutPartsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutPartsInput, JobUpdateWithoutPartsInput>, JobUncheckedUpdateWithoutPartsInput>
  }

  export type ContractorCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ContractorCreateWithoutReviewsInput, ContractorUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutReviewsInput
    connect?: ContractorWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutReviewsInput = {
    create?: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: JobCreateOrConnectWithoutReviewsInput
    connect?: JobWhereUniqueInput
  }

  export type ContractorUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ContractorCreateWithoutReviewsInput, ContractorUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ContractorCreateOrConnectWithoutReviewsInput
    upsert?: ContractorUpsertWithoutReviewsInput
    connect?: ContractorWhereUniqueInput
    update?: XOR<XOR<ContractorUpdateToOneWithWhereWithoutReviewsInput, ContractorUpdateWithoutReviewsInput>, ContractorUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type JobUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: JobCreateOrConnectWithoutReviewsInput
    upsert?: JobUpsertWithoutReviewsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutReviewsInput, JobUpdateWithoutReviewsInput>, JobUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type JobCreateWithoutUserInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    contractor?: ContractorCreateNestedOneWithoutJobsInput
    parts?: PartCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedOneWithoutJobInput
  }

  export type JobUncheckedCreateWithoutUserInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedOneWithoutJobInput
  }

  export type JobCreateOrConnectWithoutUserInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput>
  }

  export type JobCreateManyUserInputEnvelope = {
    data: JobCreateManyUserInput | JobCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutCustomerInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contractor: ContractorCreateNestedOneWithoutReviewsInput
    job: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutCustomerInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    contractorId: string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewCreateManyCustomerInputEnvelope = {
    data: ReviewCreateManyCustomerInput | ReviewCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type JobUpsertWithWhereUniqueWithoutUserInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutUserInput, JobUncheckedUpdateWithoutUserInput>
    create: XOR<JobCreateWithoutUserInput, JobUncheckedCreateWithoutUserInput>
  }

  export type JobUpdateWithWhereUniqueWithoutUserInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutUserInput, JobUncheckedUpdateWithoutUserInput>
  }

  export type JobUpdateManyWithWhereWithoutUserInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutUserInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    urgency?: StringFilter<"Job"> | string
    category?: StringFilter<"Job"> | string
    problemType?: StringFilter<"Job"> | string
    severity?: StringFilter<"Job"> | string
    estimatedTimeMinutes?: IntFilter<"Job"> | number
    partsRequired?: BoolFilter<"Job"> | boolean
    quotedPrice?: FloatFilter<"Job"> | number
    quotedPriceMin?: FloatFilter<"Job"> | number
    quotedPriceMax?: FloatFilter<"Job"> | number
    confidence?: StringFilter<"Job"> | string
    status?: StringFilter<"Job"> | string
    userId?: StringNullableFilter<"Job"> | string | null
    contractorId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    address?: StringNullableFilter<"Job"> | string | null
    postcode?: StringNullableFilter<"Job"> | string | null
    customerLocation?: JsonNullableFilter<"Job">
    serviceCharge?: FloatNullableFilter<"Job"> | number | null
    paymentStatus?: StringFilter<"Job"> | string
    stripeSessionId?: StringNullableFilter<"Job"> | string | null
  }

  export type ReviewUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
    create: XOR<ReviewCreateWithoutCustomerInput, ReviewUncheckedCreateWithoutCustomerInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutCustomerInput, ReviewUncheckedUpdateWithoutCustomerInput>
  }

  export type ReviewUpdateManyWithWhereWithoutCustomerInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    jobId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    contractorId?: StringFilter<"Review"> | string
    customerId?: StringFilter<"Review"> | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type ContractorEmailCreateWithoutContractorInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorEmailUncheckedCreateWithoutContractorInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorEmailCreateOrConnectWithoutContractorInput = {
    where: ContractorEmailWhereUniqueInput
    create: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput>
  }

  export type ContractorEmailCreateManyContractorInputEnvelope = {
    data: ContractorEmailCreateManyContractorInput | ContractorEmailCreateManyContractorInput[]
    skipDuplicates?: boolean
  }

  export type ContractorPhoneCreateWithoutContractorInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorPhoneUncheckedCreateWithoutContractorInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorPhoneCreateOrConnectWithoutContractorInput = {
    where: ContractorPhoneWhereUniqueInput
    create: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput>
  }

  export type ContractorPhoneCreateManyContractorInputEnvelope = {
    data: ContractorPhoneCreateManyContractorInput | ContractorPhoneCreateManyContractorInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutContractorInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    user?: UserCreateNestedOneWithoutJobsInput
    parts?: PartCreateNestedManyWithoutJobInput
    reviews?: ReviewCreateNestedOneWithoutJobInput
  }

  export type JobUncheckedCreateWithoutContractorInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutJobInput
    reviews?: ReviewUncheckedCreateNestedOneWithoutJobInput
  }

  export type JobCreateOrConnectWithoutContractorInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput>
  }

  export type JobCreateManyContractorInputEnvelope = {
    data: JobCreateManyContractorInput | JobCreateManyContractorInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutContractorInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: UserCreateNestedOneWithoutReviewsInput
    job: JobCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutContractorInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    customerId: string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutContractorInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput>
  }

  export type ReviewCreateManyContractorInputEnvelope = {
    data: ReviewCreateManyContractorInput | ReviewCreateManyContractorInput[]
    skipDuplicates?: boolean
  }

  export type ContractorEmailUpsertWithWhereUniqueWithoutContractorInput = {
    where: ContractorEmailWhereUniqueInput
    update: XOR<ContractorEmailUpdateWithoutContractorInput, ContractorEmailUncheckedUpdateWithoutContractorInput>
    create: XOR<ContractorEmailCreateWithoutContractorInput, ContractorEmailUncheckedCreateWithoutContractorInput>
  }

  export type ContractorEmailUpdateWithWhereUniqueWithoutContractorInput = {
    where: ContractorEmailWhereUniqueInput
    data: XOR<ContractorEmailUpdateWithoutContractorInput, ContractorEmailUncheckedUpdateWithoutContractorInput>
  }

  export type ContractorEmailUpdateManyWithWhereWithoutContractorInput = {
    where: ContractorEmailScalarWhereInput
    data: XOR<ContractorEmailUpdateManyMutationInput, ContractorEmailUncheckedUpdateManyWithoutContractorInput>
  }

  export type ContractorEmailScalarWhereInput = {
    AND?: ContractorEmailScalarWhereInput | ContractorEmailScalarWhereInput[]
    OR?: ContractorEmailScalarWhereInput[]
    NOT?: ContractorEmailScalarWhereInput | ContractorEmailScalarWhereInput[]
    id?: StringFilter<"ContractorEmail"> | string
    email?: StringFilter<"ContractorEmail"> | string
    type?: StringFilter<"ContractorEmail"> | string
    isVerified?: BoolFilter<"ContractorEmail"> | boolean
    contractorId?: StringFilter<"ContractorEmail"> | string
    createdAt?: DateTimeFilter<"ContractorEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorEmail"> | Date | string
  }

  export type ContractorPhoneUpsertWithWhereUniqueWithoutContractorInput = {
    where: ContractorPhoneWhereUniqueInput
    update: XOR<ContractorPhoneUpdateWithoutContractorInput, ContractorPhoneUncheckedUpdateWithoutContractorInput>
    create: XOR<ContractorPhoneCreateWithoutContractorInput, ContractorPhoneUncheckedCreateWithoutContractorInput>
  }

  export type ContractorPhoneUpdateWithWhereUniqueWithoutContractorInput = {
    where: ContractorPhoneWhereUniqueInput
    data: XOR<ContractorPhoneUpdateWithoutContractorInput, ContractorPhoneUncheckedUpdateWithoutContractorInput>
  }

  export type ContractorPhoneUpdateManyWithWhereWithoutContractorInput = {
    where: ContractorPhoneScalarWhereInput
    data: XOR<ContractorPhoneUpdateManyMutationInput, ContractorPhoneUncheckedUpdateManyWithoutContractorInput>
  }

  export type ContractorPhoneScalarWhereInput = {
    AND?: ContractorPhoneScalarWhereInput | ContractorPhoneScalarWhereInput[]
    OR?: ContractorPhoneScalarWhereInput[]
    NOT?: ContractorPhoneScalarWhereInput | ContractorPhoneScalarWhereInput[]
    id?: StringFilter<"ContractorPhone"> | string
    number?: StringFilter<"ContractorPhone"> | string
    type?: StringFilter<"ContractorPhone"> | string
    isVerified?: BoolFilter<"ContractorPhone"> | boolean
    contractorId?: StringFilter<"ContractorPhone"> | string
    createdAt?: DateTimeFilter<"ContractorPhone"> | Date | string
    updatedAt?: DateTimeFilter<"ContractorPhone"> | Date | string
  }

  export type JobUpsertWithWhereUniqueWithoutContractorInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutContractorInput, JobUncheckedUpdateWithoutContractorInput>
    create: XOR<JobCreateWithoutContractorInput, JobUncheckedCreateWithoutContractorInput>
  }

  export type JobUpdateWithWhereUniqueWithoutContractorInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutContractorInput, JobUncheckedUpdateWithoutContractorInput>
  }

  export type JobUpdateManyWithWhereWithoutContractorInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutContractorInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutContractorInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutContractorInput, ReviewUncheckedUpdateWithoutContractorInput>
    create: XOR<ReviewCreateWithoutContractorInput, ReviewUncheckedCreateWithoutContractorInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutContractorInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutContractorInput, ReviewUncheckedUpdateWithoutContractorInput>
  }

  export type ReviewUpdateManyWithWhereWithoutContractorInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutContractorInput>
  }

  export type ContractorCreateWithoutEmailsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    phones?: ContractorPhoneCreateNestedManyWithoutContractorInput
    jobs?: JobCreateNestedManyWithoutContractorInput
    reviews?: ReviewCreateNestedManyWithoutContractorInput
  }

  export type ContractorUncheckedCreateWithoutEmailsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    phones?: ContractorPhoneUncheckedCreateNestedManyWithoutContractorInput
    jobs?: JobUncheckedCreateNestedManyWithoutContractorInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutContractorInput
  }

  export type ContractorCreateOrConnectWithoutEmailsInput = {
    where: ContractorWhereUniqueInput
    create: XOR<ContractorCreateWithoutEmailsInput, ContractorUncheckedCreateWithoutEmailsInput>
  }

  export type ContractorUpsertWithoutEmailsInput = {
    update: XOR<ContractorUpdateWithoutEmailsInput, ContractorUncheckedUpdateWithoutEmailsInput>
    create: XOR<ContractorCreateWithoutEmailsInput, ContractorUncheckedCreateWithoutEmailsInput>
    where?: ContractorWhereInput
  }

  export type ContractorUpdateToOneWithWhereWithoutEmailsInput = {
    where?: ContractorWhereInput
    data: XOR<ContractorUpdateWithoutEmailsInput, ContractorUncheckedUpdateWithoutEmailsInput>
  }

  export type ContractorUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phones?: ContractorPhoneUpdateManyWithoutContractorNestedInput
    jobs?: JobUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUpdateManyWithoutContractorNestedInput
  }

  export type ContractorUncheckedUpdateWithoutEmailsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phones?: ContractorPhoneUncheckedUpdateManyWithoutContractorNestedInput
    jobs?: JobUncheckedUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutContractorNestedInput
  }

  export type ContractorCreateWithoutPhonesInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailCreateNestedManyWithoutContractorInput
    jobs?: JobCreateNestedManyWithoutContractorInput
    reviews?: ReviewCreateNestedManyWithoutContractorInput
  }

  export type ContractorUncheckedCreateWithoutPhonesInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailUncheckedCreateNestedManyWithoutContractorInput
    jobs?: JobUncheckedCreateNestedManyWithoutContractorInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutContractorInput
  }

  export type ContractorCreateOrConnectWithoutPhonesInput = {
    where: ContractorWhereUniqueInput
    create: XOR<ContractorCreateWithoutPhonesInput, ContractorUncheckedCreateWithoutPhonesInput>
  }

  export type ContractorUpsertWithoutPhonesInput = {
    update: XOR<ContractorUpdateWithoutPhonesInput, ContractorUncheckedUpdateWithoutPhonesInput>
    create: XOR<ContractorCreateWithoutPhonesInput, ContractorUncheckedCreateWithoutPhonesInput>
    where?: ContractorWhereInput
  }

  export type ContractorUpdateToOneWithWhereWithoutPhonesInput = {
    where?: ContractorWhereInput
    data: XOR<ContractorUpdateWithoutPhonesInput, ContractorUncheckedUpdateWithoutPhonesInput>
  }

  export type ContractorUpdateWithoutPhonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUpdateManyWithoutContractorNestedInput
    jobs?: JobUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUpdateManyWithoutContractorNestedInput
  }

  export type ContractorUncheckedUpdateWithoutPhonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUncheckedUpdateManyWithoutContractorNestedInput
    jobs?: JobUncheckedUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutContractorNestedInput
  }

  export type ContractorCreateWithoutJobsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneCreateNestedManyWithoutContractorInput
    reviews?: ReviewCreateNestedManyWithoutContractorInput
  }

  export type ContractorUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailUncheckedCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneUncheckedCreateNestedManyWithoutContractorInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutContractorInput
  }

  export type ContractorCreateOrConnectWithoutJobsInput = {
    where: ContractorWhereUniqueInput
    create: XOR<ContractorCreateWithoutJobsInput, ContractorUncheckedCreateWithoutJobsInput>
  }

  export type UserCreateWithoutJobsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutCustomerInput
  }

  export type UserUncheckedCreateWithoutJobsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type UserCreateOrConnectWithoutJobsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
  }

  export type PartCreateWithoutJobInput = {
    id?: string
    name: string
    price: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUncheckedCreateWithoutJobInput = {
    id?: string
    name: string
    price: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartCreateOrConnectWithoutJobInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput>
  }

  export type PartCreateManyJobInputEnvelope = {
    data: PartCreateManyJobInput | PartCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutJobInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    contractor: ContractorCreateNestedOneWithoutReviewsInput
    customer: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutJobInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    contractorId: string
    customerId: string
    updatedAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutJobInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
  }

  export type ContractorUpsertWithoutJobsInput = {
    update: XOR<ContractorUpdateWithoutJobsInput, ContractorUncheckedUpdateWithoutJobsInput>
    create: XOR<ContractorCreateWithoutJobsInput, ContractorUncheckedCreateWithoutJobsInput>
    where?: ContractorWhereInput
  }

  export type ContractorUpdateToOneWithWhereWithoutJobsInput = {
    where?: ContractorWhereInput
    data: XOR<ContractorUpdateWithoutJobsInput, ContractorUncheckedUpdateWithoutJobsInput>
  }

  export type ContractorUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUpdateManyWithoutContractorNestedInput
  }

  export type ContractorUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUncheckedUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUncheckedUpdateManyWithoutContractorNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutContractorNestedInput
  }

  export type UserUpsertWithoutJobsInput = {
    update: XOR<UserUpdateWithoutJobsInput, UserUncheckedUpdateWithoutJobsInput>
    create: XOR<UserCreateWithoutJobsInput, UserUncheckedCreateWithoutJobsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobsInput, UserUncheckedUpdateWithoutJobsInput>
  }

  export type UserUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutCustomerNestedInput
  }

  export type UserUncheckedUpdateWithoutJobsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type PartUpsertWithWhereUniqueWithoutJobInput = {
    where: PartWhereUniqueInput
    update: XOR<PartUpdateWithoutJobInput, PartUncheckedUpdateWithoutJobInput>
    create: XOR<PartCreateWithoutJobInput, PartUncheckedCreateWithoutJobInput>
  }

  export type PartUpdateWithWhereUniqueWithoutJobInput = {
    where: PartWhereUniqueInput
    data: XOR<PartUpdateWithoutJobInput, PartUncheckedUpdateWithoutJobInput>
  }

  export type PartUpdateManyWithWhereWithoutJobInput = {
    where: PartScalarWhereInput
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyWithoutJobInput>
  }

  export type PartScalarWhereInput = {
    AND?: PartScalarWhereInput | PartScalarWhereInput[]
    OR?: PartScalarWhereInput[]
    NOT?: PartScalarWhereInput | PartScalarWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    price?: FloatFilter<"Part"> | number
    status?: StringFilter<"Part"> | string
    jobId?: StringFilter<"Part"> | string
    createdAt?: DateTimeFilter<"Part"> | Date | string
    updatedAt?: DateTimeFilter<"Part"> | Date | string
  }

  export type ReviewUpsertWithoutJobInput = {
    update: XOR<ReviewUpdateWithoutJobInput, ReviewUncheckedUpdateWithoutJobInput>
    create: XOR<ReviewCreateWithoutJobInput, ReviewUncheckedCreateWithoutJobInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutJobInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutJobInput, ReviewUncheckedUpdateWithoutJobInput>
  }

  export type ReviewUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractor?: ContractorUpdateOneRequiredWithoutReviewsNestedInput
    customer?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractorId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobCreateWithoutPartsInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    contractor?: ContractorCreateNestedOneWithoutJobsInput
    user?: UserCreateNestedOneWithoutJobsInput
    reviews?: ReviewCreateNestedOneWithoutJobInput
  }

  export type JobUncheckedCreateWithoutPartsInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    reviews?: ReviewUncheckedCreateNestedOneWithoutJobInput
  }

  export type JobCreateOrConnectWithoutPartsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutPartsInput, JobUncheckedCreateWithoutPartsInput>
  }

  export type JobUpsertWithoutPartsInput = {
    update: XOR<JobUpdateWithoutPartsInput, JobUncheckedUpdateWithoutPartsInput>
    create: XOR<JobCreateWithoutPartsInput, JobUncheckedCreateWithoutPartsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutPartsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutPartsInput, JobUncheckedUpdateWithoutPartsInput>
  }

  export type JobUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    contractor?: ContractorUpdateOneWithoutJobsNestedInput
    user?: UserUpdateOneWithoutJobsNestedInput
    reviews?: ReviewUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: ReviewUncheckedUpdateOneWithoutJobNestedInput
  }

  export type ContractorCreateWithoutReviewsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneCreateNestedManyWithoutContractorInput
    jobs?: JobCreateNestedManyWithoutContractorInput
  }

  export type ContractorUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    passwordHash: string
    trade: string
    businessType: string
    zipCodes?: ContractorCreatezipCodesInput | string[]
    status: string
    rating?: number | null
    insuranceUploaded?: boolean
    isLicensed?: boolean
    isVerified?: boolean
    headline?: string | null
    location?: string | null
    website?: string | null
    owner?: string | null
    abn?: string | null
    licenses?: ContractorCreatelicensesInput | string[]
    postcode?: string | null
    about?: string | null
    logo_url?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isContactVerified?: boolean
    suburb?: string | null
    reviewCount?: number
    hiredCount?: number
    recommendations?: number
    profileUrl?: string | null
    emails?: ContractorEmailUncheckedCreateNestedManyWithoutContractorInput
    phones?: ContractorPhoneUncheckedCreateNestedManyWithoutContractorInput
    jobs?: JobUncheckedCreateNestedManyWithoutContractorInput
  }

  export type ContractorCreateOrConnectWithoutReviewsInput = {
    where: ContractorWhereUniqueInput
    create: XOR<ContractorCreateWithoutReviewsInput, ContractorUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jobs?: JobUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type JobCreateWithoutReviewsInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    contractor?: ContractorCreateNestedOneWithoutJobsInput
    user?: UserCreateNestedOneWithoutJobsInput
    parts?: PartCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutReviewsInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
    parts?: PartUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutReviewsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
  }

  export type ContractorUpsertWithoutReviewsInput = {
    update: XOR<ContractorUpdateWithoutReviewsInput, ContractorUncheckedUpdateWithoutReviewsInput>
    create: XOR<ContractorCreateWithoutReviewsInput, ContractorUncheckedCreateWithoutReviewsInput>
    where?: ContractorWhereInput
  }

  export type ContractorUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ContractorWhereInput
    data: XOR<ContractorUpdateWithoutReviewsInput, ContractorUncheckedUpdateWithoutReviewsInput>
  }

  export type ContractorUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUpdateManyWithoutContractorNestedInput
    jobs?: JobUpdateManyWithoutContractorNestedInput
  }

  export type ContractorUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    trade?: StringFieldUpdateOperationsInput | string
    businessType?: StringFieldUpdateOperationsInput | string
    zipCodes?: ContractorUpdatezipCodesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableFloatFieldUpdateOperationsInput | number | null
    insuranceUploaded?: BoolFieldUpdateOperationsInput | boolean
    isLicensed?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    headline?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    abn?: NullableStringFieldUpdateOperationsInput | string | null
    licenses?: ContractorUpdatelicensesInput | string[]
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isContactVerified?: BoolFieldUpdateOperationsInput | boolean
    suburb?: NullableStringFieldUpdateOperationsInput | string | null
    reviewCount?: IntFieldUpdateOperationsInput | number
    hiredCount?: IntFieldUpdateOperationsInput | number
    recommendations?: IntFieldUpdateOperationsInput | number
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    emails?: ContractorEmailUncheckedUpdateManyWithoutContractorNestedInput
    phones?: ContractorPhoneUncheckedUpdateManyWithoutContractorNestedInput
    jobs?: JobUncheckedUpdateManyWithoutContractorNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobs?: JobUncheckedUpdateManyWithoutUserNestedInput
  }

  export type JobUpsertWithoutReviewsInput = {
    update: XOR<JobUpdateWithoutReviewsInput, JobUncheckedUpdateWithoutReviewsInput>
    create: XOR<JobCreateWithoutReviewsInput, JobUncheckedCreateWithoutReviewsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutReviewsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutReviewsInput, JobUncheckedUpdateWithoutReviewsInput>
  }

  export type JobUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    contractor?: ContractorUpdateOneWithoutJobsNestedInput
    user?: UserUpdateOneWithoutJobsNestedInput
    parts?: PartUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyUserInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    contractorId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
  }

  export type ReviewCreateManyCustomerInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    contractorId: string
    updatedAt?: Date | string
  }

  export type JobUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    contractor?: ContractorUpdateOneWithoutJobsNestedInput
    parts?: PartUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    contractorId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractor?: ContractorUpdateOneRequiredWithoutReviewsNestedInput
    job?: JobUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contractorId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorEmailCreateManyContractorInput = {
    id?: string
    email: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContractorPhoneCreateManyContractorInput = {
    id?: string
    number: string
    type?: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobCreateManyContractorInput = {
    id?: string
    description: string
    location: string
    urgency: string
    category: string
    problemType: string
    severity: string
    estimatedTimeMinutes: number
    partsRequired: boolean
    quotedPrice: number
    quotedPriceMin: number
    quotedPriceMax: number
    confidence: string
    status: string
    userId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    address?: string | null
    postcode?: string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: number | null
    paymentStatus?: string
    stripeSessionId?: string | null
  }

  export type ReviewCreateManyContractorInput = {
    id?: string
    jobId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    customerId: string
    updatedAt?: Date | string
  }

  export type ContractorEmailUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorEmailUncheckedUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorEmailUncheckedUpdateManyWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneUncheckedUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContractorPhoneUncheckedUpdateManyWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutJobsNestedInput
    parts?: PartUpdateManyWithoutJobNestedInput
    reviews?: ReviewUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    parts?: PartUncheckedUpdateManyWithoutJobNestedInput
    reviews?: ReviewUncheckedUpdateOneWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    urgency?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    problemType?: StringFieldUpdateOperationsInput | string
    severity?: StringFieldUpdateOperationsInput | string
    estimatedTimeMinutes?: IntFieldUpdateOperationsInput | number
    partsRequired?: BoolFieldUpdateOperationsInput | boolean
    quotedPrice?: FloatFieldUpdateOperationsInput | number
    quotedPriceMin?: FloatFieldUpdateOperationsInput | number
    quotedPriceMax?: FloatFieldUpdateOperationsInput | number
    confidence?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    postcode?: NullableStringFieldUpdateOperationsInput | string | null
    customerLocation?: NullableJsonNullValueInput | InputJsonValue
    serviceCharge?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: UserUpdateOneRequiredWithoutReviewsNestedInput
    job?: JobUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutContractorInput = {
    id?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customerId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartCreateManyJobInput = {
    id?: string
    name: string
    price: number
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractorCountOutputTypeDefaultArgs instead
     */
    export type ContractorCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractorCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobCountOutputTypeDefaultArgs instead
     */
    export type JobCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractorDefaultArgs instead
     */
    export type ContractorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractorDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractorEmailDefaultArgs instead
     */
    export type ContractorEmailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractorEmailDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractorPhoneDefaultArgs instead
     */
    export type ContractorPhoneArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractorPhoneDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JobDefaultArgs instead
     */
    export type JobArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JobDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PartDefaultArgs instead
     */
    export type PartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PartDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LocationLogDefaultArgs instead
     */
    export type LocationLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LocationLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PricingEventDefaultArgs instead
     */
    export type PricingEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PricingEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ContractorLeadDefaultArgs instead
     */
    export type ContractorLeadArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ContractorLeadDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminActionDefaultArgs instead
     */
    export type AdminActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminActionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VerificationCodeDefaultArgs instead
     */
    export type VerificationCodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VerificationCodeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}