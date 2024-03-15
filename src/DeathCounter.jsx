import { useState, useEffect, useMemo } from 'react';

const DeathCounter = () => {
  const [deathsByEnemy, setDeathsByEnemy] = useState({});
  const [currentEnemy, setCurrentEnemy] = useState('');
  const [enemyName, setEnemyName] = useState('');

  const getDeathsByEnemyFromStorage = useMemo(() => {
    const storedDeathsByEnemy = localStorage.getItem('deathsByEnemy');
    return storedDeathsByEnemy ? JSON.parse(storedDeathsByEnemy) : {};
  }, []);

    useEffect(() => {
        setDeathsByEnemy(getDeathsByEnemyFromStorage);
    }, [getDeathsByEnemyFromStorage]);

  useEffect(() => {
    localStorage.setItem('deathsByEnemy', JSON.stringify(deathsByEnemy));
  }, [deathsByEnemy]);

  const handleAddDeath = () => {
    if (currentEnemy.trim() !== '') {
      setDeathsByEnemy((prevDeathsByEnemy) => ({
        ...prevDeathsByEnemy,
        [currentEnemy]: (prevDeathsByEnemy[currentEnemy] || 0) + 1,
      }));
    }
  };

  const handleSubtractDeath = () => {
    if (currentEnemy.trim() !== '' && deathsByEnemy[currentEnemy] > 0) {
      setDeathsByEnemy((prevDeathsByEnemy) => ({
        ...prevDeathsByEnemy,
        [currentEnemy]: prevDeathsByEnemy[currentEnemy] - 1,
      }));
    }
  };

  const handleEnemyNameChange = (e) => {
    setEnemyName(e.target.value);
  };

  const handleEnemySubmit = (e) => {
    e.preventDefault();
    const trimmedEnemyName = enemyName.trim();
    if (trimmedEnemyName !== '') {
      setDeathsByEnemy((prevDeathsByEnemy) => ({
        ...prevDeathsByEnemy,
        [trimmedEnemyName]: prevDeathsByEnemy[trimmedEnemyName] || 0,
      }));
      setCurrentEnemy(trimmedEnemyName);
      setEnemyName('');
    }
  };

  const getTotalDeaths = () => {
    return Object.values(deathsByEnemy).reduce((acc, curr) => acc + curr, 0);
  };

  const getDeathsByCurrentEnemy = () => {
    return currentEnemy ? deathsByEnemy[currentEnemy] || 0 : 0;
  };

  const handleDeleteEnemy = (enemyToDelete) => {
    setDeathsByEnemy((prevDeathsByEnemy) => {
      const newDeathsByEnemy = { ...prevDeathsByEnemy };
      delete newDeathsByEnemy[enemyToDelete];
      return newDeathsByEnemy;
    });
    
    if (enemyToDelete === currentEnemy) {
      setCurrentEnemy('');
    }
  };

  return (
    <>
      <h2>Death Counter</h2>
      <p className='totalDeaths'>Total Deaths: <span className='count'>{getTotalDeaths()}</span></p>
      <form onSubmit={handleEnemySubmit}>
        <input
          type="text"
          placeholder="Enemy Name"
          value={enemyName}
          onChange={handleEnemyNameChange}
        />
        <button type="submit">Set Enemy</button>
      </form>
      {currentEnemy && (
        <div className='addSection'>
          <p>Deaths by {currentEnemy}: {getDeathsByCurrentEnemy()}</p>
          <div>
              <button className='addDeath' onClick={handleAddDeath}>Add Death</button>
              <button className='subtractDeath' onClick={handleSubtractDeath}>Subtract Death</button>
          </div>
        </div>
      )}
      <div className='enemyLog'>
        <h3>Enemy History</h3>
        <ul>
        {Object.entries(deathsByEnemy).map(([enemy, deathCount]) => (
          <li key={enemy}>
            <p>Deaths by {enemy}: {deathCount}</p>
            <span>
                <button className='selectEnemy' onClick={() => setCurrentEnemy(enemy)}>Select Enemy</button>
                <button className='deleteEnemy' onClick={() => handleDeleteEnemy(enemy)}>Delete</button>
            </span>
          </li>
        ))}
        </ul>
      </div>
    </>
  );
};

export default DeathCounter;