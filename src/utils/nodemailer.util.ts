import { createTransport } from 'nodemailer';
import { IEmailRequest } from '../interfaces/nodemailer/email.interface';
import 'dotenv/config';

const sendEmail = async ({
  subject,
  text,
  to,
  html,
}: IEmailRequest): Promise<any> => {
  //Fazendo a conexão com o nosso servidor de SMPT
  //Para a conexão funcionar, precisamos puxar o usuário e senha do outlook que foram colocados no .env
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'codeliverybr@gmail.com',
      pass: 'wzxfhysffvvfrplo',
    },
  });
  //Com a conexão feita, usamos o método sendMail
  //O método fará o envio do email de acordo com os parâmetros passados
  await transporter
    .sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: html,
    })
    .then(() => {
      console.log('Email send with success');
    })
    .catch((err) => {
      console.log(err);
      throw new Error('Error sending email, try again later');
    });
};

export { sendEmail };
