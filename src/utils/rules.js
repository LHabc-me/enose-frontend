const rules = {
  required: value => !!value || '必填项',
  pwdLength: value => value.length >= 6 && value.length <= 20 || '密码长度应在6-20之间',
  userNameLength: value => value.length >= 3 && value.length <= 20 || '用户名长度应在3-20之间',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '无效的电子邮箱'
  },
  samePwd: target => value => value === target || '两次输入的密码不一致',
  integer: value => !isNaN(parseInt(value)) || '请输入整数',
}

export {rules}
