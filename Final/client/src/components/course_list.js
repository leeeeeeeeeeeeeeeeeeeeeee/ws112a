import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mariadb/trainers')
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title} - {course.trainer.name} - {course.start_date} to {course.end_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
