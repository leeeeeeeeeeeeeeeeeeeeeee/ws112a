import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainerList = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/mariadb/trainers')
      .then(response => setTrainers(response.data))
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  return (
    <div>
      <h2>Trainer List</h2>
      <ul>
        {trainers.map(trainer => (
          <li key={trainer.id}>{trainer.name} - {trainer.specialization}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrainerList;
