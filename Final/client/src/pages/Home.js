import React from 'react';
import TrainerList from '../components/trainer_list';
import MemberList from '../components/member_list';
import CourseList from '../components/course_list';

const Home = () => {
  return (
    <div>
      <h1>Fitness Website</h1>
      <TrainerList />
      <MemberList />
      <CourseList />
    </div>
  );
};

export default Home;