const esc = encodeURIComponent;

export const encodeGET = params => 
    Object.keys(params)
          .map(k => esc(k) + '=' + esc(params[k]))
          .join('&');