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
  
  if (typeof data !== 'object') {
	throw new Error('Data must be object');
  }
  
  let newData = '';
  const pairs = [];

  for (const [key, value] of Object.entries(data)) {
    pairs.push(`${key}=${value}`);
  }

  newData = pairs.length ? `?${pairs.join('&')}` : '';
      
  return newData;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export default class HTTPTransport {
  static API_URL = "https://ya_praktikum.tech/api/v2";
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  private getURL(path: string): string {
    return this.endpoint + path;
  }

	get: HTTPMethod = (path, options = {}) => {
    const newUrl = path + queryStringify(options.data);
    return this.request(this.getURL(newUrl), {...options, method: Methods.Get}, options.timeout);
	};
  
  put: HTTPMethod = (path: string, options = {}) => {
    return this.request(this.getURL(path), {...options, method: Methods.Put}, options.timeout);
	};
        
  post: HTTPMethod = (path: string, options = {}) => {
          return this.request(this.getURL(path), {...options, method: Methods.Post}, options.timeout);
	};
  
  delete: HTTPMethod = (path: string, options = {}) => {
    return this.request(this.getURL(path), {...options, method: Methods.Delete}, options.timeout);
	};

	request = (url: string, 
             options: Options = {method: Methods.Get, headers: {'Content-Type': 'application/json'}}, 
             timeout: number = 5000): Promise<unknown> => {
              
    let {method, data, headers = {}} = options;
          
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open(method!, url);
            
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
            
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function() {
        resolve(xhr);
      };

      const handleError = (err:any) => {
        reject(err);
      };

      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;
      xhr.timeout = timeout;

      if (method === Methods.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
