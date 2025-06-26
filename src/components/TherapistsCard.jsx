const TherapistCard = ({therapist,selectedTherapist,handleTherapistSelect}) => {
    return (
        <div
            key={therapist.id}
            onClick={() => handleTherapistSelect(therapist.id)}
            className={`p-4 lg:p-5 rounded-xl cursor-pointer transition-all duration-300 text-center hover:transform hover:-translate-y-1 hover:shadow-lg ${selectedTherapist === therapist.id
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-2 border-transparent'
                : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border-2 border-gray-200'
                }`}
        >
            <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-xl lg:text-2xl ${selectedTherapist === therapist.id
                ? 'bg-white/20'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                }`}>
                {therapist.avatar}
            </div>
            <div className="font-semibold text-sm lg:text-base mb-1">
                {therapist.name}
            </div>
            <div className={`text-xs lg:text-sm ${selectedTherapist === therapist.id ? 'text-white/80' : 'text-gray-600'
                }`}>
                {therapist.specialty}
            </div>
        </div>
    )
}
export default TherapistCard