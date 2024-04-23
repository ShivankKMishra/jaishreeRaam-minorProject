import React, { useState } from 'react';

const AcademicCalendar = () => {
  const semesters = [
    {
      semester: 'VII & IX Semester',
      schedule: {
        'Commencement of Session': '03rd July 2023',
        'Mid Semester Exam (I)': '21st to 26th August 2023',
        'Mid Semester Exam (II)': '16th to 21st October 2023',
        'Dussehra Holiday': '22nd to 25th October 2023',
        'Submission of Examination form': {
          'Without late fee': '25th Oct. - 13th Nov. 2023',
          'With late fee ': '13th - 19th November 2023',
        },
        'Submission of Mid Semester & Sessional Marks to University': '13th to 20th November 2023',
        'Last date of Teaching': '10th November 2023',
        'Diwali Vacation': '11th - 15th November 2023',
        'End Semester Examination': {
          'Theory': '20th Nov. - 22nd Dec. 2023',
          'Practical Examination': '20th Nov. - 22nd Dec. 2023',
        },
        'Winter*/Summer Vacation for Teachers': '23rd to 31st December 2023',
        'Declaration of result of final Year': 'In the Month of January 2024',
      },
    },
    {
      semester: 'VIII & X Semester',
      schedule: {
        'Commencement of Semester': '01st January 2024',
        'Mid Semester Exam (I)': '12th - 17th February 2024',
        'Mid Semester Exam (II)': '18th to 23rd March 2024',
        'Submission of Examination form': {
          'Without late fee': '01st - 19th April 2024',
          'With late fee    ': '20th - 26th A ril 2024',
        },
        'Last date of Teaching': '19th April 2024',
        'Submission of Mid Semester & Sessional Marks to University': '20th - 27th April 2024',
        'End Semester Examination': {
          'Theory': '30th April - 31st May 2024',
          'Practical Examination': '30th April - 31st May 2024',
        },
        'Summer Internship (Optional)': '01st - 30th June 2024',
        'Winter*/Summer Vacation for Teachers':'01st - 30th June 2024',
        'Declaration of result of final Year':'In the Month of June 2024',
      },
    },
    {
      "semester": "III & V Semester",
      "schedule": {
        "Commencement of Session": "01 August 2023",
        "Mid Semester Exam (I)": "15th-22nd Sep. 2023",
        "Mid Semester Exam (II)": "26th Oct. - 01st Nov. 2023",
        "Dussehra Holiday": "22nd-25th Oct. 2023",
        "Submission of Examination form": {
          "Without late fee": "01st-17th Nov. 2023",
          "With late fee": "18th-27th Nov. 2023"
        },
        "Diwali Vacation": "11th-15th Nov. 2023",
        "Last date of Teaching": "18th November 2023",
        "End Semester Examination": {
          "Theory": "28th Nov.- 27th Dec. 2023",
          "Practical Examination": "On the date of Practical Examination"
        },
        "Submission of Mid Semester & Sessional Marks to University": "16th-26th Nov. 2023",
        "End Semester Break/Internship": "NA",
        "Winter Vacation for teachers": "23rd-31st December 2023",
        "Declaration of Result": "In the Month of June 2024"
      }
    },
    {
      "semester": "IV & VI Semester",
      "schedule": {
        "Commencement of Session": "05th January 2024",
        "Mid Semester Exam (I)": "22nd-28th February 2024",
        "Mid Semester Exam (II)": "18th-23rd March 2024",
        "Submission of Examination form": {
          "Without late fee": "01st-19th April 2024",
          "With late fee": "20th-24th April 2024"
        },
        "Last date of Teaching": "25th April 2024",
        "Submission of Mid Semester & Sessional Marks to University": "15th-26th April 2024",
        "End Semester Examination": {
          "Theory": "25th April-31st May 2024",
          "Practical Examination": "On the date of Practical Examination"
        },
        "End Semester Break/Internship": "01st-30th June 2024",
        "Winter/summer Vacation for teachers": "30th June 2024",
        "Declaration of Result": "In the Month of June 2024"
      }
    }
  ];

  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  const handleSemesterChange = (semester) => {
    const selected = semesters.find((item) => item.semester === semester);
    setSelectedSemester(selected);
  };

  const renderScheduleItems = (schedule) => {
    return Object.entries(schedule).map(([key, value], index) => (
      <tr key={index}>
        <td className="border px-4 py-2">{key}</td>
        <td className="border px-4 py-2">
          {typeof value === 'string' ? (
            value
          ) : (
            <ul>
              {Object.entries(value).map(([subKey, subValue], index) => (
                <li key={index}>
                  {subKey}: {subValue}
                </li>
              ))}
            </ul>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="academic-calendar p-6 md:p-10">
      <h2 className="text-3xl font-bold mb-6">Rajiv Gandhi Proudyogiki Vishwavidyalaya - Academic Calendar 2023-2024</h2>
      <div className="mb-6">
        <select
          className="p-3 border rounded"
          value={selectedSemester.semester}
          onChange={(e) => handleSemesterChange(e.target.value)}
        >
          {semesters.map((semester, index) => (
            <option key={index} value={semester.semester}>
              {semester.semester}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Particular</th>
              <th className="border px-4 py-2">Schedule</th>
            </tr>
          </thead>
          <tbody>{renderScheduleItems(selectedSemester.schedule)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicCalendar;
