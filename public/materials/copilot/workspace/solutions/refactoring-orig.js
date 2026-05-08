


// 检查用户是否为成年人
function isAdult(user) {
  // 检查 age 属性是否为数字且大于等于18
  return typeof user.age === 'number' && user.age >= 18;
}

// 检查用户的电子邮件是否有效
function isEmailValid(user) {
  // 检查 email 属性是否为字符串且包含 '@'
  return typeof user.email === 'string' && user.email.includes('@');
}

// 根据订阅类型返回访问消息
function getSubscriptionMessage(user) {
  // 检查 subscription 属性并返回相应的消息
  if (user.subscription === 'premium') {
    return `${user.name} has access to all features.`;
  } else if (user.subscription === 'basic') {
    return `${user.name} has limited access.`;
  } else {
    return `${user.name} has no access.`;
  }
}

// 主函数：处理用户数组
function processUsers(users) {
  // 检查输入是否为数组
  if (!Array.isArray(users)) {
    console.error('Input must be an array of users.');
    return;
  }
  users.forEach((user, idx) => {
    console.log('*******************************');
    // 检查用户对象的基本属性
    if (!user || typeof user !== 'object') {
      console.warn(`User at index ${idx} is invalid.`);
      return;
    }
    const { name, age, email, subscription } = user;
    if (typeof name !== 'string' || typeof age !== 'number' || typeof email !== 'string' || typeof subscription !== 'string') {
      console.warn(`User data is incomplete or invalid for:`, user);
      return;
    }
    // 判断是否为成年人
    if (isAdult(user)) {
      console.log(`${name} is an adult.`);
    } else {
      console.log(`${name} is not an adult.`);
    }
    // 检查电子邮件
    if (isEmailValid(user)) {
      console.log(`${name} email is valid.`);
    } else {
      console.log(`${name} email is invalid.`);
    }
    // 输出订阅信息
    console.log(getSubscriptionMessage(user));
  });
}



// 示例用户数组
const users = [
  { name: 'Alice', age: 25, email: 'alice@example.com', subscription: 'premium' },
  { name: 'Bob', age: 17, email: 'bobexample.com', subscription: 'basic' },
  { name: 'Charlie', age: 30, email: 'charlie@example.com', subscription: 'none' },
];

// 调用主函数处理用户
processUsers(users);
