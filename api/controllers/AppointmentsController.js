/**
 * AppointmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const moment = require('moment')

module.exports = {

    find: async ( req, res ) => {

        let now = moment().format('DD-MM-YYYY');
        const appointments = await Appointments.find({ date_apoiment: req.query.date }).populate('patient');

        appointments.forEach(appointment => {
            const date_apoiment = moment(appointment.date_apoiment, 'YYYY-MM-DD').format('DD-MM-YYYY');
            
            const diff = moment(date_apoiment).diff(moment().format('YYYY-MM-DD'), 'days');
            console.log(diff);

            
        });
    }
  

};

