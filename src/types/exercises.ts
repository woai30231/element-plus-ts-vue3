// TypeScript 练习项目 - 类型定义文件
// 这个文件涵盖了 TypeScript 的所有基础数据类型和高级特性

// ========== 1. 基础数据类型 ==========

// 布尔类型
export type BooleanType = boolean;

// 数字类型 (包括整数、浮点数、二进制、八进制、十六进制)
export type NumberType = number;

// 字符串类型
export type StringType = string;

// 大整数类型 (ES2020)
export type BigIntType = bigint;

// Symbol 类型
export type SymbolType = symbol;

// undefined 和 null 类型
export type UndefinedType = undefined;
export type NullType = null;

// ========== 2. 数组类型 ==========

// 数组的两种写法
export type NumberArray = number[];
export type StringArray = Array<string>;

// 只读数组
export type ReadonlyNumberArray = readonly number[];

// 元组类型
export type PersonTuple = [string, number, boolean]; // [姓名, 年龄, 是否已婚]

// 可选元组元素
export type OptionalTuple = [string, number?];

// 剩余元组元素
export type RestTuple = [string, ...number[]];

// 命名元组
export type NamedTuple = [name: string, age: number, isMarried: boolean];

// ========== 3. 对象类型和接口 ==========

// 基础接口
export interface Person {
  readonly id: number; // 只读属性
  name: string;
  age: number;
  email?: string; // 可选属性
  [key: string]: any; // 索引签名
}

// 扩展接口
export interface Student extends Person {
  studentId: string;
  grade: number;
  subjects: string[];
}

// 泛型接口
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: Date;
}

// 函数接口
export interface Calculator {
  (a: number, b: number): number;
}

// 构造函数接口
export interface PersonConstructor {
  new (name: string, age: number): Person;
}

// ========== 4. 联合类型和交叉类型 ==========

// 联合类型
export type StringOrNumber = string | number;
export type Gender = 'male' | 'female' | 'other';
export type Theme = 'light' | 'dark' | 'auto';

// 交叉类型
export type PersonWithContact = Person & {
  phone: string;
  address: string;
};

// 判别联合类型
export interface Circle {
  kind: 'circle';
  radius: number;
}

export interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

export interface Triangle {
  kind: 'triangle';
  base: number;
  height: number;
}

export type Shape = Circle | Rectangle | Triangle;

// ========== 5. 枚举类型 ==========

// 数字枚举
export enum UserRole {
  GUEST,
  USER,
  ADMIN,
  SUPER_ADMIN
}

// 字符串枚举
export enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow'
}

// 异构枚举 (不推荐使用)
export enum Mixed {
  No = 0,
  Yes = 'YES'
}

// const 断言枚举
export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

// ========== 6. 函数类型 ==========

// 函数类型定义
export type AddFunction = (a: number, b: number) => number;

// 带可选参数的函数
export type GreetFunction = (name: string, greeting?: string) => string;

// 带剩余参数的函数
export type SumFunction = (...numbers: number[]) => number;

// 函数重载
export interface Converter {
  (value: string): number;
  (value: number): string;
  (value: boolean): string;
}

// 泛型函数
export type GenericFunction<T> = (item: T) => T;

// ========== 7. 泛型类型 ==========

// 基础泛型
export type Container<T> = {
  value: T;
  getValue(): T;
  setValue(value: T): void;
};

// 多泛型参数
export type Pair<T, U> = {
  first: T;
  second: U;
};

// 泛型约束
export type Lengthwise = {
  length: number;
};

export type ConstrainedGeneric<T extends Lengthwise> = {
  item: T;
  getLength(): number;
};

// 条件类型
export type NonNullable<T> = T extends null | undefined ? never : T;

// 映射类型
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// ========== 8. 工具类型 ==========

// Record 类型
export type UserRoles = Record<string, UserRole>;

// Pick 类型
export type PersonSummary = Pick<Person, 'name' | 'age'>;

// Omit 类型
export type PersonWithoutId = Omit<Person, 'id'>;

// Exclude 和 Extract
export type StringOrNumberOrBoolean = string | number | boolean;
export type OnlyStringOrNumber = Exclude<StringOrNumberOrBoolean, boolean>;
export type OnlyString = Extract<StringOrNumberOrBoolean, string>;

// Parameters 和 ReturnType
export type AddParams = Parameters<AddFunction>;
export type AddReturn = ReturnType<AddFunction>;

// ========== 9. 字面量类型 ==========

// 字符串字面量类型
export type Direction = 'up' | 'down' | 'left' | 'right';

// 数字字面量类型
export type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// 布尔字面量类型
export type True = true;
export type False = false;

// ========== 10. 模板字面量类型 ==========

// 模板字面量类型
export type EventName<T extends string> = `on${Capitalize<T>}`;
export type ButtonEvent = EventName<'click'>;

// 复杂模板字面量
export type APIEndpoint<T extends string, U extends string> = `/api/${T}/${U}`;
export type UserEndpoint = APIEndpoint<'users', 'profile'>;

// ========== 11. 类类型 ==========

// 抽象类接口
export interface Drawable {
  draw(): void;
}

// 类的类型定义
export interface PersonClass {
  name: string;
  age: number;
  greet(): string;
}

// 静态成员接口
export interface PersonStatic {
  new (name: string, age: number): PersonClass;
  species: string;
}

// ========== 12. 装饰器类型 ==========

// 装饰器类型定义
export type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
export type PropertyDecorator = (target: any, propertyKey: string | symbol) => void;
export type MethodDecorator = <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
export type ParameterDecorator = (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => void;

// ========== 13. Vue 3 相关类型 ==========

// Vue 组件 Props
export interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags?: string[];
}

// Vue 组件 Emits
export interface TodoItemEmits {
  (e: 'update:completed', completed: boolean): void;
  (e: 'delete', id: number): void;
  (e: 'edit', id: number, newTitle: string): void;
}

// Composition API 返回类型
export interface UseTodoReturn {
  todos: Ref<TodoItem[]>;
  addTodo: (todo: Omit<TodoItem, 'id'>) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updates: Partial<TodoItem>) => void;
  toggleTodo: (id: number) => void;
  filterTodos: (filter: TodoFilter) => TodoItem[];
}

// ========== 14. 练习用数据类型 ==========

// Todo 应用的完整类型定义
export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  assignee?: Person;
  subtasks?: SubTask[];
}

export interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';

// 用户管理类型
export interface User extends Person {
  role: UserRole;
  permissions: Permission[];
  profile: UserProfile;
  preferences: UserPreferences;
}

export interface Permission {
  id: string;
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
}

export interface UserProfile {
  avatar?: string;
  bio?: string;
  website?: string;
  location?: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

// API 相关类型
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// 表单验证类型
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: any) => boolean | string;
}

export type FormRules<T> = {
  [K in keyof T]?: ValidationRule[];
};

// 路由类型
export interface RouteConfig {
  path: string;
  name: string;
  component: any;
  meta?: RouteMeta;
  children?: RouteConfig[];
}

export interface RouteMeta {
  title: string;
  requiresAuth?: boolean;
  roles?: UserRole[];
  keepAlive?: boolean;
}

// 状态管理类型
export interface AppState {
  user: User | null;
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  theme: Theme;
}

// 事件类型
export type EventHandler<T = Event> = (event: T) => void;
export type MouseEventHandler = EventHandler<MouseEvent>;
export type KeyboardEventHandler = EventHandler<KeyboardEvent>;

// 异步操作类型
export type AsyncFunction<T = void> = () => Promise<T>;
export type AsyncResult<T> = Promise<ApiResponse<T>>;