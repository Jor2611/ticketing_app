import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url:'/api/users/signup',
    method:'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  }) 

  const onSubmit = async(event) => {
    event.preventDefault();
    doRequest()
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      { errors }
      <button className="btn btn-primary" type="submit" >SignUp</button>
    </form>
  )
};

export default SignUp;