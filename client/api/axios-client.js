import axios from 'axios';

const axiosClient = ({ req }) => {
  if(typeof window === 'undefined'){
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/',
      // baseURL: 'http://www.onemandev.xyz/',
      // baseURL: 'http://ticketing.dev',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
}

export default axiosClient;