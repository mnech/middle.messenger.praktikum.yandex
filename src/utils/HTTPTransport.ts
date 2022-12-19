enum Methods {
	Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
};

interface Options {
  method?: Methods,
  headers?: Record<string, string>,
  data?: any,
  timeout?: number,
}

function queryStringify(data: unknown) {
  if (!data) return '';
  
  if (typeof data !== "object") {
	throw new Error("Data must be object");
  }
  
  let newData = '';
  const pairs = [];

  for (const [key, value] of Object.entries(data)) {
    pairs.push(`${key}=${value}`);
  }

  newData = pairs.length ? `?${pairs.join("&")}` : "";
      
  return newData;
}

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  private getURL(path: string): string {
    return this.endpoint + path;
  }

	public get<T>(path: string, options: Options = {}): Promise<T> {
    const newUrl = path + queryStringify(options.data);
    return this.request<T>(this.getURL(newUrl), {...options, method: Methods.Get}, options.timeout);
	};
  
  public put<T>(path: string, options: Options = {}): Promise<T> {
    return this.request<T>(this.getURL(path), {...options, method: Methods.Put}, options.timeout);
	};
        
  public post<T>(path: string, options: Options = {}): Promise<T> {
          return this.request<T>(this.getURL(path), {...options, method: Methods.Post}, options.timeout);
	};
  
  public delete<T>(path: string, options: Options = {}): Promise<T> {
    return this.request<T>(this.getURL(path), {...options, method: Methods.Delete}, options.timeout);
	};

	private request<T>(url: string, 
             options: Options = {method: Methods.Get, headers: {"Content-Type": "application/json"}}, 
             timeout: number = 5000): Promise<T> {
    let {method, data, headers = {}} = options;
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method!, url);
            
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
          
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = "json";
      
      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({reason: 'abort'});
      xhr.onerror = () => reject({reason: 'network error'});
      xhr.ontimeout = () => reject({reason: 'timeout'});

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}
