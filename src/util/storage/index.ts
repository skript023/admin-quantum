import CryptoJS from 'crypto-js';

export default class storage
{
    private key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRPYPT_KEY); // 16 bytes key for AES-128
    private iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_INITIALIZATION_VECTOR); // Initialization vector

    getData(key: string): string | null
    {
        const enc = this.encrypt(key);
        const value = localStorage.getItem(enc) as string;
        return this.decrypt(value) ?? null;
    }

    setData(key: string, value: string) 
    {
        const enc = this.encrypt(key);
        const val = this.encrypt(value);
        localStorage.setItem(enc, val);
    }

    removeData(key: string) 
    {
        const enc = this.decrypt(key);
        localStorage.removeItem(enc);
    }

    clearData() 
    {
        localStorage.clear();
    }

    isDataExist(key: string): boolean
    {
        return this.getData(key) ? true : false;
    }

    private encrypt(text: string): string 
    {
        try 
        {
            const encrypted = CryptoJS.AES.encrypt(text, this.key, {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            
            return encrypted.toString();
        } 
        catch (error) 
        {
            console.error("Encryption error:", error);
            throw error;
        }
    }

    private decrypt(cipherText: string): string 
    {
        try 
        {
            if (cipherText)
            {
                const decrypted = CryptoJS.AES.decrypt(cipherText, this.key, {
                    iv: this.iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
    
                return decrypted.toString(CryptoJS.enc.Utf8);
            }

            return '';
        } 
        catch (error) 
        {
            console.error("Decryption error:", error);
            throw error;
        }
    }
}