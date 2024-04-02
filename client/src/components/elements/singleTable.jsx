import { useState } from "react";

useState
const SoloTable = () => {
    const [attendees, setAttendees] = useState([
        { id: 1, displayName: 'opsine', firstName: 'John', lastName: 'Doe', age: 25 },
        { id: 2, displayName: 'opsine', firstName: 'Jane', lastName: 'Smith', age: 30 },
        { id: 3, displayName: 'opsine', firstName: 'Alice', lastName: 'Johnson', age: 22 },
      ]);

      const addAttendee = () => {
        setAttendees([...attendees, { firstName: 'I am', lastName: 'Added', age: 0 }]);
      };

      const deleteAttendee = (index) => {
        const newAttendees = [...attendees];
        newAttendees.splice(index, 1);
        setAttendees(newAttendees);
      };
    
      const handleInputChange = (e, index, key) => {
        const newAttendees = [...attendees];
        newAttendees[index][key] = e.target.value;
        setAttendees(newAttendees);
      };
    return (  
        <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between mb-4">
          <button onClick={addAttendee} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Attendee
          </button>
          <button onClick={() => deleteAttendee()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {attendees.map((attendee, index) => (
              <tr key={index}>
                <td>{attendee.displayName}</td>
                <td>{attendee.firstName}</td>
                <td>{attendee.lastName}</td>
                <td>{attendee.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}
 
export default SoloTable;