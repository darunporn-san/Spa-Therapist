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
        <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div>
                <div className="summary-row">
                    <span className="summary-label">Client:</span>
                    <span className="summary-value">{formData.clientName}</span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Service:</span>
                    <span className="summary-value">
                        {services.find(s => s.value === formData.serviceType)?.label}
                    </span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Duration:</span>
                    <span className="summary-value">
                        {durations.find(d => d.value === formData.sessionDuration)?.label}
                    </span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Total Price:</span>
                    <span className="summary-value bold">${calculateTotalPrice()}</span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Therapist:</span>
                    <span className="summary-value">
                        {therapists.find(t => t.id === selectedTherapist)?.name}
                    </span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Date & Time:</span>
                    <span className="summary-value">
                        {formatDate(formData.appointmentDate)} at {formatTime(selectedTime)}
                    </span>
                </div>
            </div>
        </div>
    )
}
export default BookingSummary