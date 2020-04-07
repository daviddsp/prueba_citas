/**
 * AppoimentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios')

module.exports = {

    find: async ( req, res ) => {

        const appointments = await Appoiment.find()

        console.log(appointments);
        
        

        const result = appointments.map(async(appointment) => {

            console.log(appointment.id);

            const msj = `Hola ${appointment.paciente}, le recordamos que hoy ${appointment.fecha} a las ${appointment.hora} tienes ${appointment.agenda}`

                // axios.post('https://sms-send-aws.herokuapp.com/api/send-msj/', {
                //     "number": '+56956723430', 
                //     "msj": msj
                // })
            console.log({
                "msj":msj,
                "telefono":appointment.telefono
            });
            
        })

        
        

    }
  

};

