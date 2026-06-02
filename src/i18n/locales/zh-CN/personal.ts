const personal = {
  sider: {
    profile: '基本信息',
    security: '安全设置',
  },
  profile: {
    title: '基本信息',
    id: '用户ID',
    username: '用户名',
    createdAt: '注册时间',
  },
  security: {
    title: '安全设置',
    oldPassword: '旧密码',
    newPassword: '新密码',
    confirmPassword: '确认密码',
    oldPasswordRequired: '请输入旧密码',
    newPasswordRequired: '请输入新密码',
    confirmPasswordRequired: '请确认新密码',
    passwordMismatch: '两次新密码输入不一致，请确认',
    submit: '确认',
    success: '密码修改成功，请重新登录',
    oldPasswordError: '旧密码错误',
  },
} as const
export default personal
