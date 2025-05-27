import axios from "axios";

import {baseConfig} from "../config/index";
// 定义一个通用的请求配置接口
interface ApiConfig {
    baseUrl?: string;
    timeout?: number;
    headers?: object;
  }
  
export class Request {
    constructor(private baseUrl: ApiConfig={}) {
        const defaultConfig: ApiConfig = {
            baseUrl: baseConfig.serverBaseUrl,
        }
    }
}
    