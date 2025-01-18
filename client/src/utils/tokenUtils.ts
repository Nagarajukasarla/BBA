export class TokenManager {
    static encode = (token: string) => {
        let encodedString: string = token;
        for (let i = 0; i < 2; i++) encodedString = btoa(encodedString);
        return encodedString;
    };

    static decode = (token: string) => {
        let decodedString: string = token;
        for (let i = 0; i < 2; i++) decodedString = atob(decodedString);
        return decodedString;
    };

    static setToken = (token: string): void => {
        console.log("Token: ", token);
        const parts: string[] = token.split(".");
        localStorage.setItem("a", this.encode(parts[0]));
        localStorage.setItem("b", parts[1]);
        localStorage.setItem("c", this.encode(parts[2]));
    };

    static getToken = (): string | null => {
        const a: string = localStorage.getItem("a") || "";
        if (a === "") return null;
        const b: string = localStorage.getItem("b") || "";
        if (b === "") return null;
        const c: string = localStorage.getItem("c") || "";
        if (c === "") return null;
        return this.decode(a) + "." + b + "." + this.decode(c);
    };

    static removeToken = (): void => {
        localStorage.removeItem("a");
        localStorage.removeItem("b");
        localStorage.removeItem("c");
    };
}

