**1. Setup React App**

First, create a new React app using Create React App:

bash
npx create-react-app mental-health-journal
cd mental-health-journal
```

**2. Install necessary packages**

For state management, we'll use Context API and for styling, Bootstrap.

```bash
npm install @react-bootstrap/bootstrap
```

**3. Create components**

- `JournalForm.js`: Form for daily journal entry.
- `MoodPresentation.js`: Display mood presentations.
- `Recommendations.js`: Display AI recommendations.
- `App.js`: Main application component.

**JournalForm.js**

```jsx
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { JournalContext } from './JournalContext';

const JournalForm = () => {
  const { addEntry, currentMood } = useContext(JournalContext);
  const [mood, setMood] = useState(currentMood);
  const [entry, setEntry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEntry({ mood, entry });
    setMood('');
    setEntry('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formMood">
        <Form.Label>Mood:</Form.Label>
        <Form.Control
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formJournal">
        <Form.Label>Journal Entry:</Form.Label>
        <Form.Control
          type="text"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default JournalForm;
```

**MoodPresentation.js**

```jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MoodPresentation = ({ entries }) => {
  const moodData = entries.reduce((acc, { mood }) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(moodData),
    datasets: [
      {
        data: Object.values(moodData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default MoodPresentation;
```

**Recommendations.js**

```jsx
import React from 'react';

const Recommendations = ({ recommendations }) => {
  return (
    <div>
      <h3>AI Recommendations:</h3>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
```

**App.js**

```jsx
import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JournalForm from './JournalForm';
import MoodPresentation from './MoodPresentation';
import Recommendations from './Recommendations';
import { JournalContext } from './JournalContext';

const App = () => {
  const [entries, setEntries] = useState([]);
  const [currentMood, setCurrentMood] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const addEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  const getRecommendations = () => {
    // Mock AI Granite Model call
    setTimeout(() => {
      setRecommendations([
        'Try practicing mindfulness meditation for 10 minutes daily.',
        'Engage in regular physical activity, even a short walk can help.',
        'Connect with a friend or family member for support.',
      ]);
    }, 1000);
  };

  return (
    <JournalContext.Provider value={{ addEntry, currentMood, setCurrentMood }}>
      <div className="container">
        <h1>Mental Health Journal</h1>
        <JournalForm />
        <button onClick={getRecommendations} className="btn btn-primary mt-3">
          Get Recommendations
        </button>
        <MoodPresentation entries={entries} />
        <Recommendations recommendations={recommendations} />
      </div>
    </JournalContext.Provider>
  );
};

export default App;
```

**JournalContext.js**

```jsx
import React from 'react';

const JournalContext = React.createContext({
  addEntry: () => {},
  currentMood: '',
  setCurrentMood: () => {},
});

export default JournalContext;