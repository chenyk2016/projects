import axios from "axios";
import qs from 'qs';

const tokenVerify = () =>
axios.post('http://test3-i.session.lianjia.com/token/verify', {
  token: '',
  source: 'econtract',
  signature: 'e913e2e07f9c86f47e0174fe9743ebaa',
}, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})
.then(payload => {
  console.log(payload);
})

function login() {
  const ticket = qs.parse(window.location.href).ticket

  if (!ticket) {
    window.location.href = 'http://test-login.ke.com/login?service=http://top.shbeta.lianjia.com:3000/login?gotoURL=%2F'
    return false;
  }

  axios.get('http://test-login.ke.com/serviceValidate?ticket=&service=').then(ucidCreater => {

    console.log(222, ucidCreater);

    const xml = ucidCreater.data;
    const matched = xml.match(/\<cas\:ucid\>(\d+)\<\/cas\:ucid\>/);
    if (!matched) {
        return false;
    }
    const ucid = matched[1];
  })


  // axios.post('http://test3-i.session.lianjia.com/token/create', {
  //   signature: 'e913e2e07f9c86f47e0174fe9743ebaa',
  //   source: 'econtract',
  //   ucid,
  //   ip: ctx.request.ip,
  //   user_agent: ctx.request.headers['user-agent'],
  //   device_id: '',
  //   extension_info: JSON.stringify({ accountSystemId })
  // })

}

login()