import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mariadb/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  return (
    <div>
      <h2>Member List</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name} - {member.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
