
import nodemailer from 'nodemailer';
interface MailOptions {
    to: string;
    subject: string;
    from: {
        name: string,
        address: string
    };
    text: string;
}

const sendMail = async (transporter: any, mailOptions: MailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error: any) {
        console.log("Mail Gönderilemedi: " + error.message)
        return false;
    }
}


export const mailSender = async (email: string, subject: string, text: string) => {

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADRESS,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions: MailOptions = {
            from: {
                name: "Rozetle Bence",
                address: process.env.EMAIL_ADRESS
            },
            to: email,
            subject: subject,
            text: text
        };

        const result = await sendMail(transporter, mailOptions)
        return result

    } catch (error) {
        console.log("Create Transport is failed: " + error.message)
        return false
    }
}
