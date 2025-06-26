// Service pricing (per hour)
export const servicePrices = {
    'deep-tissue': 120,
    'swedish': 100,
    'hot-stone': 140,
    'aromatherapy': 110,
    'couples': 200
};


// Therapist data
export const therapists = [
    { id: 'emma', name: 'Emma Wilson', specialty: 'Deep Tissue Specialist', avatar: '👩‍⚕️' },
    { id: 'james', name: 'James Chen', specialty: 'Swedish & Relaxation', avatar: '👨‍⚕️' },
    { id: 'sophia', name: 'Sophia Martinez', specialty: 'Hot Stone Therapy', avatar: '👩‍⚕️' },
    { id: 'alex', name: 'Alex Thompson', specialty: 'Sports Massage', avatar: '👨‍⚕️' },
    { id: 'maya', name: 'Maya Patel', specialty: 'Aromatherapy Expert', avatar: '👩‍⚕️' }
];

// Time slots
export const timeSlots = [
    { time: '09:00', display: '9:00 AM' },
    { time: '10:00', display: '10:00 AM' },
    { time: '11:00', display: '11:00 AM' },
    { time: '14:00', display: '2:00 PM' },
    { time: '15:00', display: '3:00 PM' },
    { time: '16:00', display: '4:00 PM' },
    { time: '17:00', display: '5:00 PM' },
    { time: '18:00', display: '6:00 PM' }
];

// Service options
export const services = [
    { value: 'deep-tissue', label: 'Deep Tissue Massage' },
    { value: 'swedish', label: 'Swedish Massage' },
    { value: 'hot-stone', label: 'Hot Stone Therapy' },
    { value: 'aromatherapy', label: 'Aromatherapy Massage' },
    { value: 'couples', label: 'Couples Massage' }
];

// Duration options
export const durations = [
    { value: '60', label: '60 minutes (1 hour)', multiplier: 1 },
    { value: '90', label: '90 minutes (1.5 hours)', multiplier: 1.5 },
    { value: '120', label: '120 minutes (2 hours)', multiplier: 2 },
    { value: '150', label: '150 minutes (2.5 hours)', multiplier: 2.5 },
    { value: '180', label: '180 minutes (3 hours)', multiplier: 3 }
];