
import axios, { type AxiosRequestConfig, type AxiosResponse, type Canceler, type CancelTokenSource } from "axios";


export interface ServerResponse<T>
{
    message: string;
    data: T;
    success: boolean;
    last_page: number;
    total_data: number;
}

interface PendingRequest {
	request: Promise<any>;
	cancel: Canceler;
}

export const url = {
    backend: import.meta.env.VITE_ENVIRONMENT === 'development' ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL_PROD 
}

const request = axios.create({
    baseURL: url.backend,
    withCredentials: true
});

class HttpRequest
{
    private pending_requests: PendingRequest[] = [];
    private async add_pending_request(request: Promise<any>, cancelTokenSource: CancelTokenSource)
    {
        this.pending_requests.push({ request, cancel: cancelTokenSource.cancel });

        return await request;
    }

    async cancel_all_pending_request()
    {
        this.pending_requests.forEach(pending => pending.cancel('All requests canceled'));
        this.pending_requests = [];
    }
    
    async get(route: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
    {
        const cancel: CancelTokenSource = axios.CancelToken.source();
        const result = await this.add_pending_request(request.get(route, { ...config, cancelToken: cancel.token }), cancel);

        if (result.status == 401)
        {
            localStorage.clear();
            window.location.replace('/login');
        }

        return result;
    }

    async post(route: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
    {
        const cancel: CancelTokenSource = axios.CancelToken.source();
        const result = await this.add_pending_request(request.post(route, data, { ...config, cancelToken: cancel.token }), cancel);

        if (result.status == 401)
        {
            localStorage.clear();
            window.location.replace('/login');
        }

        return result;
    }

    async patch(route: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> 
    {
        const cancel: CancelTokenSource = axios.CancelToken.source();
        const result = await this.add_pending_request(request.patch(route, data, { ...config, cancelToken: cancel.token }), cancel);

        if (result.status == 401)
        {
            localStorage.clear();
            window.location.replace('/login');
        }

        return result;
    }

    async put(route: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> 
    {
        const cancel: CancelTokenSource = axios.CancelToken.source();
        const result = await this.add_pending_request(request.put(route, data, { ...config, cancelToken: cancel.token }), cancel);

        if (result.status == 401)
        {
            localStorage.clear();
            window.location.replace('/login');
        }

        return result;
    }

    async delete(route: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>>
    {
        const cancel: CancelTokenSource = axios.CancelToken.source();
        const result = await this.add_pending_request(request.delete(route, { ...config, cancelToken: cancel.token }), cancel);

        if (result.status == 401)
        {
            localStorage.clear();
            window.location.replace('/login');
        }

        return result;
    }
}

export const http = new HttpRequest();