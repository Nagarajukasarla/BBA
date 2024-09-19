class TokenManager {
    static encode(value) {
        let encodedString = value
        for (let i = 0; i < 2; i++) {
            encodedString = btoa(encodedString);
        }
        console.log("encoded: ", encodedString);
        return encodedString;
    };
    
    static decode(value) {
        let decodedString = value
        for (let i = 0; i < 2; i++) {
            decodedString = atob(decodedString);
        }
        console.log("decoded: ", decodedString);
        return decodedString;
    };

    static getToken() {
        const a = localStorage.getItem("a");
        if (!a) return "";
        
        const b = localStorage.getItem("b");
        const c = localStorage.getItem("c");
        const res = TokenManager.decode(a) + "." + b + "." + TokenManager.decode(c);
        console.log("Original Token: ", res);
        return res;
    };
    
    static setToken(value) {
        console.log("Orignal Token before encoding: ", value);
        const tokenParts = value.split(".")
        localStorage.setItem("a", TokenManager.encode(tokenParts[0]))
        localStorage.setItem("b", tokenParts[1]);
        localStorage.setItem("c", TokenManager.encode(tokenParts[2]));
    };
    
    static removeToken() {
        localStorage.removeItem("a");
        localStorage.removeItem("b");
        localStorage.removeItem("c");
    };
    
    static setShopId(shopId) {
        localStorage.setItem("user", TokenManager.encode(shopId));
    };
    
    static getShopId() {
        const shop = localStorage.getItem("user")
        return TokenManager.decode(shop);
    };
    
    static removeShopId() {
        localStorage.removeItem("user");
    };
    
}

export default TokenManager;