/**
 * AppointmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment')
const axios = require('axios')

module.exports = {

    find: async ( req, res ) => {
        const appointments = await Appointments.find().populate('patient');

        for (let i = 0; i < appointments.length; i++) {

            const date_apoiment = moment(appointments[i].date_apoiment, 'YYYY-MM-DD');
            const diff = moment(date_apoiment).diff(moment().format('YYYY-MM-DD'), 'days');

            if (diff >= 3){

                const sendWp = await axios.post('https://mails-as.herokuapp.com/api/send-mail', 
                {
                    "template" : "FALP",
                    "email" : appointments[i].patient.email,
                    "name" : appointments[i].patient.name,
                    "fecha" : appointments[i].date_apoiment,
                    "hora" : appointments[i].hour_cita,
                    "especialidad" : appointments[i].specialty,
                    "doctor" : appointments[i].name_doc,
                    "lugar" : appointments[i].address,
                })
            }else {

                const msj = `${appointments[i].patient.name} tienes una cita ${appointments[i].prefix} ${appointments[i].name_doc} el ${appointments[i].date_apoiment} a las ${appointments[i].hour_cita} Confirmar en este enlace https://api.whatsapp.com/send?phone=+14155238886&text=Hola`

                const sendWp = await axios.post('https://sms-send-aws.herokuapp.com/api/send-msj/', {
                    "number":`+56${appointments[i].patient.phone}`, 
                    "msj": msj
                })
            }
        }
        return res.send('Enviado!');
    }
};

