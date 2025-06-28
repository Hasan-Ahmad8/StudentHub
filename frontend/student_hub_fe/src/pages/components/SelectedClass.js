import { locationImages } from "./LocationToImage";
import { useState, useEffect } from "react";
import ImageNotFound from "../../assets/ImageNotFound.png";

export function SelectedClass({ selectedClass }){
    const [shortLocation, setShortLocation] = useState("");

    useEffect(() => {
        if (selectedClass?.location_display) {
            const shortened = selectedClass.location_display.split(" - ")[0];
            setShortLocation(shortened);
        }
    }, [selectedClass]);

    return(
        <div className="card-body">
            {selectedClass ? (
                <>
                    <h2 className="text-xl font-bold">{selectedClass.class_name_display}</h2>
                    <div className="divider mt-0 mb-2"></div>

                    <p><strong>Class Code:</strong> {selectedClass.class_id}</p>
                    <p><strong>Professor:</strong> {selectedClass.prof_name_display}</p>
                    <p><strong>schedule:</strong> {selectedClass.time_display}</p>
                    <p><strong>Grade:</strong> {selectedClass.grade}</p>
                    <p><strong>Presence:</strong> {selectedClass.presence}</p>
                    <p><strong>Absence:</strong> {selectedClass.absence}</p>
                    <p><strong>Location:</strong> {selectedClass.location_display}</p>

                    <div className="divider mt-0 mb-2"></div>
                    
                    <img
                        src={locationImages[shortLocation] || ImageNotFound}
                        alt={shortLocation}
                        className="w-full h-80 object-cover rounded"
                    />
                </>
            ) : (
                <p className="text-gray-400">Select a class to view details.</p>
            )}
        </div>
    );
}