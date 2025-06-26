const BookingSummary = ({ services, durations, therapists, formData, calculateTotalPrice, selectedTime, selectedTherapist }) => {
    console.log('props', services);
    // Format time for display
    const formatTime = (timeStr) => {
        return new Date(`2000-01-01T${timeStr}:00`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    // Format date for display
    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-indigo-50 p-4 lg:p-6 rounded-xl border border-indigo-200">
            <h3 className="text-lg lg:text-xl font-bold text-indigo-700 mb-4">
                Booking Summary
            </h3>
            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-indigo-200">
                    <span className="font-medium text-gray-700">Client:</span>
                    <span className="text-gray-900">{formData.clientName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-indigo-200">
                    <span className="font-medium text-gray-700">Service:</span>
                    <span className="text-gray-900">
                        {services.find(s => s.value === formData.serviceType)?.label}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-indigo-200">
                    <span className="font-medium text-gray-700">Duration:</span>
                    <span className="text-gray-900">
                        {durations.find(d => d.value === formData.sessionDuration)?.label}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-indigo-200">
                    <span className="font-medium text-gray-700">Total Price:</span>
                    <span className="text-gray-900 font-bold">${calculateTotalPrice()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-indigo-200">
                    <span className="font-medium text-gray-700">Therapist:</span>
                    <span className="text-gray-900">
                        {therapists.find(t => t.id === selectedTherapist)?.name}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2">
                    <span className="font-medium text-gray-700">Date & Time:</span>
                    <span className="text-gray-900">
                        {formatDate(formData.appointmentDate)} at {formatTime(selectedTime)}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default BookingSummary