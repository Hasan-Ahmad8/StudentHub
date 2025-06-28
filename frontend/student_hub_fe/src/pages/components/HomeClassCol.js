import { Class } from "./Class";

export function ClassCol({ schedule, percentageCompleted, setSelectedClass, daysRemaining}){
    return(
        <div className="card-body">
          <h1 className="text-xl font-bold">My Classes</h1>
          <div className="divider mt-0 mb-2"></div>
          
          <div className="overflow-y-auto pr-2">
            {Array.isArray(schedule) && schedule.map((item, index) => (
                <Class
                    key={index}
                    classCode={item.class_id}
                    className={item.class_name_display}
                    professorName={item.prof_name_display}
                    grade={item.grade}
                    onClick={() => setSelectedClass(item)}
                />
            ))}
          </div>

          <div className="divider mt-2 mb-0"></div>

          {percentageCompleted === 0 ? (
              <p className="text-sm text-gray-500">Semester hasn't started yet</p>
            ) : (
              <p><strong>Semester Progress:</strong> {daysRemaining} days left</p>
          )}
        <progress 
            className="progress progress-info w-full" 
            value={(percentageCompleted)} 
            max="100">
        </progress>
        
        </div>
    );
}