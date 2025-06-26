import React, { useState, useEffect } from 'react';
import BookingSummary from '../components/BookingSummary';
import Header from '../components/Header';
import { servicePrices, therapists, timeSlots, services, durations } from '../utils/mockData';
import TherapistCard from '../components/TherapistsCard';
import HeaderNameTitle from '../components/HeaderNameTitle';


const HomePage = () => {

    const [selectedTherapist, setSelectedTherapist] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookings, setBookings] = useState({});
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        serviceType: '',
        sessionDuration: '',
        appointmentDate: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if time slot is available
    const isTimeSlotAvailable = (timeIndex) => {
        if (!selectedTherapist || !formData.appointmentDate || !formData.sessionDuration) return true;

        const duration = parseInt(formData.sessionDuration);
        const slotsNeeded = Math.ceil(duration / 60);
        const bookingKey = `${selectedTherapist}-${formData.appointmentDate}`;
        const bookedTimes = bookings[bookingKey] || [];

        for (let i = 0; i < slotsNeeded; i++) {
            if (timeIndex + i >= timeSlots.length) return false;
            const checkTime = timeSlots[timeIndex + i].time;
            if (bookedTimes.includes(checkTime)) return false;
        }
        return true;
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        if (!formData.serviceType || !formData.sessionDuration) return 0;
        const basePrice = servicePrices[formData.serviceType];
        const multiplier = parseInt(formData.sessionDuration) / 60;
        return Math.round(basePrice * multiplier);
    };

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (field === 'appointmentDate' || field === 'sessionDuration') {
            setSelectedTime(null);
        }
    };

    // Handle therapist selection
    const handleTherapistSelect = (therapistId) => {
        setSelectedTherapist(therapistId);
        setSelectedTime(null);
    };

    // Handle time slot selection
    const handleTimeSelect = (time, timeIndex) => {
        if (!isTimeSlotAvailable(timeIndex)) return;
        setSelectedTime(time);
    };

    // Check if form is complete
    const isFormComplete = () => {
        return formData.clientName &&
            formData.clientPhone &&
            formData.serviceType &&
            formData.sessionDuration &&
            selectedTherapist &&
            formData.appointmentDate &&
            selectedTime;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormComplete()) return;

        const duration = parseInt(formData.sessionDuration);
        const bookingKey = `${selectedTherapist}-${formData.appointmentDate}`;
        const slotsNeeded = Math.ceil(duration / 60);
        const selectedIndex = timeSlots.findIndex(slot => slot.time === selectedTime);

        setBookings(prev => {
            const newBookings = { ...prev };
            if (!newBookings[bookingKey]) {
                newBookings[bookingKey] = [];
            }

            for (let i = 0; i < slotsNeeded; i++) {
                if (selectedIndex + i < timeSlots.length) {
                    const slotTime = timeSlots[selectedIndex + i].time;
                    newBookings[bookingKey].push(slotTime);
                }
            }
            return newBookings;
        });

        setShowSuccess(true);
    };

    // Get today's date for min date
    const today = new Date().toISOString().split('T')[0];




    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                {/* Header */}
                <Header />

                {/* Main Booking Section */}
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-12 shadow-2xl">
                    {!showSuccess ? (
                        <>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8 lg:mb-12">
                                Book Your Therapy Session
                            </h2>

                            <div className="space-y-6 lg:space-y-8">
                                {/* Client Information */}
                                <div className="grid input-form">
                                    <div>
                                        <HeaderNameTitle name="Your Name" />
                                        <input
                                            type="text"
                                            value={formData.clientName}
                                            onChange={(e) => handleInputChange('clientName', e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl text-sm lg:text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div>

                                        <HeaderNameTitle name="Phone Number" />


                                        <input
                                            type="tel"
                                            value={formData.clientPhone}
                                            onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                                            placeholder="Your phone number"
                                            className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl text-sm lg:text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Service and Duration */}
                                <div className="grid input-form">
                                    <div>
                                        <HeaderNameTitle name="Service Type" />
                                        <select
                                            value={formData.serviceType}
                                            onChange={(e) => handleInputChange('serviceType', e.target.value)}
                                            className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl text-sm lg:text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                            required
                                        >
                                            <option value="">Select a service</option>
                                            {services.map(service => (
                                                <option key={service.value} value={service.value}>
                                                    {service.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <HeaderNameTitle name="Session Duration" />


                                        <select
                                            value={formData.sessionDuration}
                                            onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                                            className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl text-sm lg:text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                            required
                                        >
                                            <option value="">Select duration</option>
                                            {durations.map(duration => (
                                                <option key={duration.value} value={duration.value}>
                                                    {duration.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Price Display */}
                                {formData.serviceType && formData.sessionDuration && (
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 lg:p-6 rounded-xl text-center">
                                        <h3 className="text-lg lg:text-xl font-bold">
                                            Total Price: ${calculateTotalPrice()}
                                        </h3>
                                    </div>
                                )}

                                {/* Therapist Selection */}
                                <div>
                                    <HeaderNameTitle name="Choose Your Therapist" />

                                    <div className="custom-grid">
                                        {therapists.map(therapist => (
                                            <TherapistCard therapist={therapist} selectedTherapist={selectedTherapist} handleTherapistSelect={handleTherapistSelect} />
                                        ))}
                                    </div>
                                </div>

                                {/* Date and Time Selection */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                                    <div>
                                        <HeaderNameTitle name="Preferred Date" />

                                        <input
                                            type="date"
                                            value={formData.appointmentDate}
                                            onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                                            min={today}
                                            className="w-full p-3 lg:p-4 border-2 border-gray-200 rounded-xl text-sm lg:text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <HeaderNameTitle name="Available Time Slots" />
                                        <div className="time-grid">
                                            {timeSlots.map((slot, index) => {
                                                const isAvailable = isTimeSlotAvailable(index);
                                                const isSelected = selectedTime === slot.time;

                                                return (
                                                    <button
                                                        key={slot.time}
                                                        type="button"
                                                        onClick={() => handleTimeSelect(slot.time, index)}
                                                        disabled={!isAvailable}
                                                        className={`p-2 lg:p-3 text-xs lg:text-sm rounded-lg transition-all duration-300 font-medium ${isSelected
                                                            ? 'bg-indigo-500 text-white shadow-lg'
                                                            : !isAvailable
                                                                ? 'bg-red-500 text-white opacity-60 cursor-not-allowed'
                                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md'
                                                            }`}
                                                    >
                                                        {slot.display}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Summary */}
                                {isFormComplete() && (
                                    <BookingSummary
                                        services={services}
                                        calculateTotalPrice={calculateTotalPrice}
                                        durations={durations}
                                        therapists={therapists}
                                        formData={formData}
                                        selectedTime={selectedTime}
                                        selectedTherapist={selectedTherapist}
                                    />
                                )}

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isFormComplete()}
                                    className={`w-full p-4 lg:p-5 rounded-xl font-bold text-sm lg:text-lg tracking-wide uppercase transition-all duration-300 ${isFormComplete()
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:transform hover:-translate-y-1 hover:shadow-xl'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Complete Booking
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Success Message */
                        <div className="text-center py-8 lg:py-16">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 lg:p-8 rounded-xl">
                                <h3 className="text-xl lg:text-2xl font-bold mb-3">🎉 Booking Confirmed!</h3>
                                <p className="text-sm lg:text-base">
                                    Your appointment has been successfully booked. We'll send you a confirmation email shortly.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default HomePage