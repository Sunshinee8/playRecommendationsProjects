let config = {
 
    MYSQL_HOST: "",
    MYSQL_PORT: 3306,
    MYSQL_USERNAME: "",
    MYSQL_PASSWORD: "",
    MYSQL_DATABASE: '',
}

// 调用本地，本地开启VPN可任意更换地址
const local = {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: 3306,
    MYSQL_USERNAME: "root",
    MYSQL_PASSWORD: "12345678",
    MYSQL_DATABASE: 'new_schema',
}

config=local

export default config