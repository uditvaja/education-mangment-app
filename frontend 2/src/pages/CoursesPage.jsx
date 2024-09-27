import React from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';

const CoursesPage = () => {
  return (
    <div>
      <h1>Courses</h1>
      <CourseList />
      <CourseForm/>
    </div>
  );
};

export default CoursesPage;
