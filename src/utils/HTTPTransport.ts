enum Methods {
	Get = "GET",
  Put = "PUT",
  Post = "POST",
  Delete = "DELETE",
};

interface Options {
  method: Methods,
  headers: Record<string, string>,
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

export default class HTTPTransport {
	get = (url: string, options: Options) => {
    const newUrl = url + queryStringify(options.data);
    return this.request(newUrl , {...options, method: Methods.Get}, options.timeout);
	};
  
  put = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.Put}, options.timeout);
	};
        
  post = (url: string, options: Options) => {
          return this.request(url, {...options, method: Methods.Post}, options.timeout);
	};
  
  delete = (url: string, options: Options) => {
    return this.request(url, {...options, method: Methods.Delete}, options.timeout);
	};

	request = (url: string, 
             options: Options = {method: Methods.Get, headers: {'Content-Type': 'application/json'}}, 
             timeout: number = 5000): Promise<XMLHttpRequest> => {
              
    let {method, data, headers = {}} = options;
          
    return new Promise((resolve, reject) => {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open(method, url);
            
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
