import express from 'express';
const router = express.Router();
import { 
    createAppointment, 
    getAppointment, 
    updateAppointment, 
    deleteAppointment,
    getCalendarAppointments,
    getCompletedAppointments,
    getPendingAppointments,
    getMissedAppointments,
    getPractitionerAvailability
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

// Specific routes should come first
router.route('/calendar').get(protect, getCalendarAppointments);
router.route('/completed').get(protect, getCompletedAppointments);
router.route('/pending').get(protect, getPendingAppointments);
router.route('/missed').get(protect, getMissedAppointments);
router.route('/availability').get(protect, getPractitionerAvailability);

// General routes come after specific routes
router.route('/').post(protect, createAppointment);
router.route('/:id').get(protect, getAppointment).put(protect, updateAppointment).delete(protect, deleteAppointment);

export default router;
