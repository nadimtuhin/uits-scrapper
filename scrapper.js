const Xray = require('x-ray');
const fs = require('fs');

const x = Xray().concurrency(10);

const urls = [
  'https://uits.edu.bd/faculty-members-of-civil/',
  'https://uits.edu.bd/faculty-members-of-eee/',
  'https://uits.edu.bd/faculty-members-of-ece/',
  'https://uits.edu.bd/faculty-members-of-cse/',
  'https://uits.edu.bd/faculty-members-of-it/',
  'https://uits.edu.bd/faculty-members-of-pharmacy/',
  'https://uits.edu.bd/faculty-members-of-social-works/',
  'https://uits.edu.bd/faculty-members-of-english/',
  'https://uits.edu.bd/faculty-members-of-law/',
  'https://uits.edu.bd/faculty-members-of-business-studies/'
];

async function scrap(url) {
  console.log(`scrapping ${url}`);
  const teachers = await x(url, '.single-info-member', [
    {
      name: '.member-info .head h4 a',
      title: '.member-info .head p span',
      email: '.member-info .desc p:nth-child(2) span',
      picture: '.member-thumb img@src',
      link: '.member-info .head h4 a@href',
      phone: x('.member-info .head h4 a@href', '.phone.phone-1 p'),
    }
  ]);
  const department = url.replace('https://uits.edu.bd/faculty-members-of-', '').replace('/', '');
  return teachers.map(teacher => Object.assign({}, teacher, { department }));
}

async function main() {
 const teachersPromises = urls.map(scrap);
 const teachers = await Promise.all(teachersPromises);
 const teachersData = JSON.stringify(teachers.flat(1));
 console.log(teachersData);

 fs.writeFileSync('./teachers.json', teachersData);
}

main();