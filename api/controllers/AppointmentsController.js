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

        console.log(appointments);
        

        for (let i = 0; i < appointments.length; i++) {

            const date_apoiment = moment(appointments[i].date_apoiment, 'YYYY-MM-DD');
            const diff = moment(date_apoiment).diff(moment().format('YYYY-MM-DD'), 'days');

            if (diff > 3){

                
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

                console.log(sendWp);
            }else {
                const msj = `${appointments[i].patient.name} tienes una cita ${appointments[i].prefix} ${appointments[i].name_doc} el ${appointments[i].date_apoiment} a las ${appointments[i].hour_cita} Confirmar en este enlace https://tinyurl.com/sqs7q65`

                const sendWp = await axios.post('https://sms-send-aws.herokuapp.com/api/send-msj/', {
                    "number": appointments[i].patient.phone, 
                    "msj": msj
                })
                

                // console.log(sendWp);
                

                // const sendSMS = await axios({
                //     method: 'post',
                //     url: 'http://localhost:5000/api/send-msj/',
                //     data: {
                //         msj: 'Hector tienes cita con DR David el 16-03-2020 a las 19:00. Confirmar/Cancelar/Reagendar en este enlace https://tinyurl.com/sqs7q65',
                //         number: '+56956723430'
                //     }
                //   });
                //   console.log(sendSMS);
                  

                //   try {
                //       console.log("se envió");
                      
                      
                //   } catch (error) {
                //       console.log(error);
                      
                      
                //   }

                
                
            }
            
            
        }
        return res.send('Enviado!');


        res.json({mensaje: 'enviado'})
        // appointments.forEach(appointment => {
        //     const date_apoiment = moment(appointment.date_apoiment, 'YYYY-MM-DD');
        //     const diff = moment(date_apoiment).diff(moment().format('YYYY-MM-DD'), 'days');


        //     if (diff > 3){

        //         console.log("entro mayor a 3");

        //     }else {

        //         const sendSMS = axios({
        //             method: 'post',
        //             url: 'http://localhost:5000/api/send-msj/',
        //             data: {
        //                 msj: 'Hector tienes cita con DR David el 16-03-2020 a las 19:00. Confirmar/Cancelar/Reagendar en este enlace https://tinyurl.com/sqs7q65',
        //                 number: '956723430'
        //             }
        //           });

                
                
        //     }
            
        // });

        // sendMsjSMS.forEach(element => {


        //     console.log(element.notifications);
            
            
        // });   
    }
};

