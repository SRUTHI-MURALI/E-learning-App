import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

const generateEmail = (instructorEmail: string, coursename:string, msg:string)=> {
  // Your email and password should be defined here or fetched from a secure configuration.
  const EMAIL = instructorEmail
  const course= coursename
  const msgs=msg

  const config = {
    service: 'gmail',
    auth: {
      user: "muhzinsidhiq333@gmail.com",
      pass: "iiue xtwn lkkf jfps",
    },
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Admin',
      link: 'https://mailgen.js/',
    },
  });

  const response = {
    body: {
      name: 'Tuto E-learning',
      intro: 'Your course is approved ',
      table: {
        data: [
          {
            item: course,
            description: msgs,
            
          },
        ],
      },
      outro: 'Looking for more courses from you',
    },
  };


  

  const mail = MailGenerator.generate(response);

  const message = {
    from: "muhzinsidhiq333@gmail.com",
    to: EMAIL, // Use the passed userEmail parameter here
    subject: 'course confirmation',
    html: mail,
  };
console.log("fdsf");

  transporter
    .sendMail(message)
    .then(() => {
      return {
        status: 201,
        message: 'You should receive an email',
      };
    }
    
    
    )
    .catch(() => {
      return {
        status: 500,
       
      };
    });
};

export default generateEmail;
