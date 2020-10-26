// 使用events 进行没有嵌套关系间的通信 npm install events --save
import { EventEmitter } from 'events';

export default new EventEmitter();